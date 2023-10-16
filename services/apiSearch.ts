import request from './apiService';

export const getSearch = async (query: string) => {
  const response = await request.get(`/search/?q=${query}`);
  const APIResults = response.data;

  const searchResults: Record<string, string[]> = {};
  let maxResultNum = 5;
  for (let i = 0; maxResultNum > 0 && i < APIResults.length; i++) {
    const key = Object.keys(APIResults[i])[0];
    for (let j = 0; maxResultNum > 0 && j < APIResults[i][key].nbHits; j++) {
      if (searchResults[key]) {
        searchResults[key].push(APIResults[i][key].hits[j]);
      }
      else {
        searchResults[key] = [APIResults[i][key].hits[j]];
      }
      maxResultNum--;
    }
  }

  console.log(searchResults);

  return searchResults;
}