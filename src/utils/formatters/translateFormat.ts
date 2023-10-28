export const translateJobType = (data: string | null | undefined) => {
  switch (data) {
    case null:
    case undefined:
    case "{}":
      return "Không xác định"
    case "fulltime":
      return "Toàn thời gian";
    case "parttime":
      return "Bán thời gian";
    case "contract":
      return "Hợp đồng";
    case "internship":
      return "Thực tập";
    case "remote":
      return "Làm việc từ xa (Remote)";
    case "onsite":
      return "Làm việc tại văn phòng (Onsite)";
    case "hybrid":
      return "Làm việc hỗn hợp (Hybrid)";
    default:
      return data;
  }
};

export const translateMajors = (data: number[] | undefined): string => data && data.length !== 0 ? data.toString() : "Không yêu cầu";