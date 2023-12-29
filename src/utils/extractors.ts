export const extractNestedData = (data: any, keyPath: string) => {
  return keyPath.split(".").reduce((acc, key) => {
    return acc?.[key];
  }, data);
};

export const extractKeyByValue = (object: any, value: any, nestedValuePath?: string) => {
  let key = Object.keys(object).find((key) => object[key] === value);
  if (nestedValuePath) {
    key = Object.keys(object).find((key) => object[key][nestedValuePath] === value);
  }

  if (!Number.isNaN(key)) {
    return Number(key);
  }
  return key;
};