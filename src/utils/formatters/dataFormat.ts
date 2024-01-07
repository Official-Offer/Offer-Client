export const formatProfileData = (data: any): string => {
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

type Option = {
  value: string;
  label: string;
}

export const formatAPIData = (list: any[]): Option[] => {
  return list.map(item => {
      return {
          value: item.value || item.pk || item.id,
          label: item.label || item.name
      }
  })
}