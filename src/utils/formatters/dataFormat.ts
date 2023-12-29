export const formatProfileData = (data: any) => {
  if (Array.isArray(data)) {
    return data
      .map((item) => {
        if (typeof item === "object") {
          return formatProfileData(item);
        }
        return item;
      })
      .join(", ");
  }
  if (typeof data === "object") {
    return data?.name ?? "Không xác định";
  }
  return data;
};
