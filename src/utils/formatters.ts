import moment from "moment";
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

export const formatNum = (number: number | undefined | null): string => {
  if (number === null || isNaN(number)) {
    return "??";
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
};

export const formatDate = (date: string | undefined | null, format: string, timeDist?: boolean): string => {
  if (date) {
    let dateDist: string = "";
    if (timeDist) {
      const time = moment(date);
      const now = moment();
      const diff = now.diff(time, "days");
      if (diff < 30) {
        dateDist = `${diff} ngày trước`;
      } else if (diff < 365) {
        dateDist = `${Math.floor(diff / 30)} tháng trước`;
      } else {
        dateDist = `${Math.floor(diff / 365)} năm trước`;
      }
    }
    return `${moment(date).format(format)} ${timeDist ? `(${dateDist})` : ""}`;
  }
  return "?/?/????";
};

export const dateDist = (date: string | undefined | null): string => {
  const time = moment(date);
  const now = moment();
  const diff = now.diff(time, "days");
  if (diff < 30) {
    return `${diff} ngày trước`;
  } else if (diff < 365) {
    return `${Math.floor(diff / 30)} tháng trước`;
  } else {
    return `${Math.floor(diff / 365)} năm trước`;
  }
};