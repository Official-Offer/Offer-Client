import moment from "moment";

export const formatNum = (
  number: number | undefined | null,
  long: boolean,
  alt?: string,
): string => {
  if (number === undefined || number === null || isNaN(number)) {
    return alt || "Không xác định";
  }
  if (long) {
    return number.toLocaleString("vi-VN");
  }
  if (number < 1000) {
    return number.toLocaleString("vi-VN");
  } else if (number < 1000000) {
    const thousand = number / 1000;
    return (
      thousand.toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + " nghìn"
    );
  } else if (number < 1000000000) {
    const million = number / 1000000;
    return (
      million.toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + " triệu"
    );
  } else {
    const billion = number / 1000000000;
    return (
      billion.toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + " tỷ"
    );
  }
};

export const formatCurrency = (
  number: number | undefined | null,
  alt?: string,
): string => {
  if (number === 0) {
    return "0";
  } else if (!number || isNaN(number)) {
    return alt || "Không xác định";
  }
  // console.log(number)
  number *= 1000000;
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export const formatDate = (
  date: string | undefined | null,
  format: string,
  timeDist?: boolean,
): string => {
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
