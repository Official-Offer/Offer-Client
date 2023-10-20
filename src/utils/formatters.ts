import { Address } from "@types/dataTypes";

export const formatAddress = (address: Address, short?: boolean) => {
  if (!address) {
    return "";
  }
  if (short) {
    return address.city ? `${address.city}, ${address.country}` : `${address.country}`;
  }
  return `${address.street}, ${address.city}, ${address.province}, ${address.country}`;
}

export const formatNum = (number: number) => {
  if (isNaN(number)) {
    return "Invalid number";
  }
  if (number < 1000000) {
    return number.toLocaleString('vi-VN');
  } else if (number < 1000000000) {
    const million = (number / 1000000).toFixed(2);
    return million.toLocaleString('vi-VN') + " triệu";
  } else {
    const billion = (number / 1000000000).toFixed(2);
    return billion.toLocaleString('vi-VN') + " tỷ";
  }
}