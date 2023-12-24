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
}

export const extractFileName = (url: string): string => {
  const start = url.lastIndexOf("/") + 1;
  const end = url.indexOf(".pdf");
  if (start != -1 && end != -1) {
      return url.substring(start, end);
  } else {
      return "";
  }
}