import {
  hasAccessToken,
  getAccessToken,
  requestAccessToken,
  removeAccessToken,
  removeAuth
} from "./auth";

/**
 * Token is added to the headers. If no token is present, the token is requested before do it.
 * @param httpClient Axios wrapper http instance reference defined in http.js file.
 */
const requestInterceptor = httpClient => {
  const { client } = httpClient;

  client.interceptors.request.use(
    async config => {
      if (config.noAuth) {
        return config;
      }
      if (!hasAccessToken()) {
        await requestAccessToken();
      }
      //config.headers.Authorization = `Bearer ${getAccessToken()}`;
      config.headers["x-auth-token"] = getAccessToken();
      return config;
    },
    error => Promise.reject(error)
  );
};

/**
 * This interceptor handles auth authorization errors.
 * @param httpClient Axios wrapper http instance reference defined in http.js file.
 */
const responseInterceptor = httpClient => {
  const { client } = httpClient;

  client.interceptors.response.use(
    response => response,
    async error => {
      const httpCode = error?.response?.status || undefined;
      const originalRequest = error.config;

      /**
       * If you receive a 401 error and it's not a retry from the original, a new token is
       * requested. Then, every queued request will be thrown again.
       *
       * If a retry request comes, that means that the requested token is not valid instead of
       * the token has expired.
       *
       * It's not necessary to handle queued requests because the app don't have chained requests.
       */

      if (httpCode === 401 && !originalRequest._retry) {
        removeAccessToken();
        removeAuth();
        if (originalRequest.url !== "/auth/login") {
          window.location.assign("/auth/signin");
          originalRequest._retry = true;
          await requestAccessToken();
        }

        if (hasAccessToken()) {
          originalRequest.headers[
            "x-access-token"
          ] = `Bearer ${getAccessToken()}`;
          client(originalRequest);
          return;
        }
      }

      return Promise.reject(error);
    }
  );
};

export { requestInterceptor, responseInterceptor };
