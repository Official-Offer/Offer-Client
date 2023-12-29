import type { User, Address } from "src/types/dataTypes";

export const formatAddress = (
  address: Address | undefined,
  short?: boolean,
): string => {
  if (!address) {
    return "Địa điểm không tồn tại";
  }
  if (short) {
    return address.city
      ? `${address.city}, ${address.country}`
      : `${address.country}`;
  }
  return `${address.street}, ${address.city}, ${address.province}, ${address.country}`;
};

export const formatFullName = (user: User | undefined): string => {
  if (!user) {
    return "Người dùng không tồn tại";
  }
  return `${user.first_name} ${user.last_name}`;
};

export const formatOverflowText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};

export const getFileNameFromUrl = (url: string): string => {
  const start = url.lastIndexOf("/") + 1;
  const end = url.indexOf("?");
  if (start != -1 && end != -1) {
    return url.substring(start, end);
  } else {
    return "";
  }
};

export const getPageNumFromUrl = (url?: string): number | undefined => {
  // console.log(url)
  if (!url) return undefined;
  const start = url.indexOf("?");
  const end = url.length;
  const params = url.substring(start + 1, end).split("&");
  const pageParam = params.find((param) => param.includes("page="));
  if (pageParam) {
    return parseInt(pageParam.split("=")[1]);
  } else {
    return undefined;
  }
};
