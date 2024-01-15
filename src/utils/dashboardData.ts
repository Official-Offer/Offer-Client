// Test Data: add up to 1,000,000

export const PieChartData = {
	labels: ["Đã ứng tuyển", "Đang phỏng vấn", "Đã được tuyển"],
	datasets: [
		{
			label: "Tỉ lệ tuyển dụng",
			data: [650000, 250000, 100000],
			backgroundColor: [
				"#00196E",
				"rgba(0, 25, 110, 0.25)",
				"rgba(0, 25, 110, 0.50)",
			],
			borderColor: "white",
			borderWidth: 1,
		},
	],
};

export const LineChartData = {
	labels: [
		"Tháng 1", // January
		"Tháng 2", // February
		"Tháng 3", // March
		"Tháng 4", // April
		"Tháng 5", // May
		"Tháng 6", // June
		"Tháng 7", // July
		"Tháng 8", // August
		"Tháng 9", // September
		"Tháng 10", // October
		"Tháng 11", // November
		"Tháng 12", // December
	],
	datasets: [
		{
			label: "Số lượng học sinh được tuyển dụng năm 2023",
			data: [59, 67, 81, 94, 106, 111, 116, 130, 145, 150, 156, 170],
			borderColor: "#4bc0c0",
			fill: false,
		},
	],
};

export const BarChartData = {
	labels: [
		"Khoa học máy tính",
		"Kỹ thuật cơ khí",
		"Quản trị kinh doanh",
		"Sinh học",
		"Thiết kế đồ họa",
	],
	datasets: [
		{
			label: "Số lượng hồ sơ ứng tuyển",
			data: [303, 414, 310, 310, 330],
			backgroundColor: "#00196E",
		},
	],
};
