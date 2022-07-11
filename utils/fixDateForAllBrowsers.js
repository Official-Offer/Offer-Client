const fixDateForAllBrowsers = dateString => dateString.replace(/-/g, '/').replaceAll(".", "/");
export default fixDateForAllBrowsers