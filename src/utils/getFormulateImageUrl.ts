// See https://vueformulate.com/guide/inputs/types/file/#upload-results-with-v-model-on-formulateinput
// to check an example of the code below
export const getImgURL = async (img): Promise<string | string[]> => {
  // if ("results" in img && Array.isArray(img.results)) {
  //   if (img.results.length === 1) return img.results[0].url;
  //   return img.results.map(({ url }) => url);
  // }
  if (typeof img?.upload === "function") {
    return img.upload().then(([res]) => {
      if (res && "url" in res) return res.url;

      return "";
    });
  }
  if (typeof img === "string") {
    return img;
  }
  if (Array.isArray(img)) {
    if (img.length === 1 && "url" in img[0]) {
      return img[0].url;
    } else if (img.every(pic => "url" in pic)) {
      return img.map(({ url }) => url);
    }
  }
  return "";
};
