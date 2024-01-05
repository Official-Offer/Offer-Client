export const workTypes = [
    { value: "fulltime", label: "Full-time" },
    { value: "parttime", label: "Part-time" },
    { value: "contract", label: "Hợp đồng" },
    { value: "volunteer", label: "Tình nguyện" },
]
export const levels = [
    { value: "internship", label: "Thực tập" },
    { value: "newgrad", label: "Fresher" },
    { value: "experienced", label: "Đã có kinh nghiệm" }
]

export const jobTypes = [
    {value: "remote", label: "Remote"},
    {value: "onsite", label: "Onsite"},
    {value: "hybrid", label: "Hybrid"}
]

export const value_to_label = (value: string, dict: Record<string, string>[]) => {
    const item = dict.find(item => item.value === value);
    return item ? item.label : "";
}
