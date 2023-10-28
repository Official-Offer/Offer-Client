export const replaceUrl = (param: string, value?: string) => {
  const { as, url } = window.history.state;
  const baseUrl = process.env.BASE_URL || "https://offer-beta.vercel.app/";
  const urlObj = new URL(url, baseUrl);
  const queryParams = new URLSearchParams(urlObj.search);

  if (value) {
    queryParams.set(param, value);
    urlObj.search = queryParams.toString();
  }

  const newUrl = urlObj.toString();

  window.history.replaceState({ as: newUrl, url: newUrl }, '', newUrl);
};