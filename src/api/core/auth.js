import axios from "axios";

/**
 * Performs authentication in order to get the token used in any request. It's stored in local
 * storage and you can get it from any other part of the application.
 * @returns {Promise}
 */
const requestAccessToken = () => {
  const url = process.env.VUE_APP_API_URL;

  const body = "grant_type=client_credentials";

  const config = {
    headers: {
      Authorization: `Basic ${btoa(
        [
          process.env.VUE_APP_API_CLIENT_ID,
          process.env.VUE_APP_API_CLIENT_SECRET
        ].join(":")
      )}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return axios.post(url, body, config).then(response => {
    const {
      data: { access_token: accessToken }
    } = response;
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    return response;
  });
};

/**
 * @returns {String} Returns token from localStorage.
 */
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

/**
 * Removes access token from localStorage.
 */
const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

/**
 * @returns {Boolean} Returns true if the localStorage/accessToken is not empty.
 */
const hasAccessToken = () => {
  return !!getAccessToken();
};

const getAuth = () => {
  return JSON.parse(localStorage.getItem("auth"));
};

const hasAuth = () => {
  return !!getAuth();
};

const removeAuth = () => {
  localStorage.removeItem("auth");
};

export {
  requestAccessToken,
  getAccessToken,
  removeAccessToken,
  hasAccessToken,
  getAuth,
  hasAuth,
  removeAuth
};
