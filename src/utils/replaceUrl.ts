export const replaceUrl = (
  param: string,
  value?: string,
  deleteOtherParams?: boolean,
) => {
  const { as, url } = window.history.state;
  const baseUrl = process.env.BASE_URL || "https://offer-client-offer.vercel.app/";
  const urlObj = new URL(url, baseUrl);
  const queryParams = new URLSearchParams(urlObj.search);

  if (value) {
    queryParams.set(param, value);
    urlObj.search = queryParams.toString();
  }

  if (deleteOtherParams) {
    for (const key of queryParams.keys()) {
      if (key !== param) {
        queryParams.delete(key);
      }
    }
    urlObj.search = queryParams.toString();
  }

  const newUrl = urlObj.toString();
  console.log(newUrl);

  window.history.replaceState({ as: newUrl, url: newUrl }, "", newUrl);
};
