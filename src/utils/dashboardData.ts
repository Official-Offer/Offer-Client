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
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
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
	// labels: [
	// 	"Computer Science",
	// 	"Mechanical Engineering",
	// 	"Business Administration",
	// 	"Biology",
	// 	"Graphic Design",
	// ],

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
			// backgroundColor: [
			// 	"#FF6384",
			// 	"#36A2EB",
			// 	"#FFCE56",
			// 	"#4BC0C0",
			// 	"#9966FF",
			// ],
			backgroundColor: "#00196E",
		},
	],
};
