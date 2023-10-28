export const replaceUrl = (param: string, value: string) => {
  const { as, url } = window.history.state;
  const baseUrl = "http://localhost:3000/"
  const urlObj = new URL(url, baseUrl);
  const queryParams = new URLSearchParams(urlObj.search);

  queryParams.set(param, value);

  urlObj.search = queryParams.toString();
  const newUrl = urlObj.toString();

  window.history.replaceState({ as: newUrl, url: newUrl }, '', newUrl);
};