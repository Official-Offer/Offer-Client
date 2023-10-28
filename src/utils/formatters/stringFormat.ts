import type { Address } from "@types/dataTypes";

export const formatAddress = (address: Address, short?: boolean): string => {
  if (!address) {
    return "Địa điểm không tồn tại";
  }
  if (short) {
    return address.city ? `${address.city}, ${address.country}` : `${address.country}`;
  }
  return `${address.street}, ${address.city}, ${address.province}, ${address.country}`;
};