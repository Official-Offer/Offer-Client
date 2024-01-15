import { NextPage } from "next";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { useState } from "react";
import {
	PieChartData,
	LineChartData,
	BarChartData,
} from "@utils/dashboardData";
import { PieChart, LineChart, BarChart } from "@components/chart";

Chart.register(CategoryScale);

const Dashboard: NextPage = () => {
	const [pieChartData, setPieChartData] = useState(PieChartData);

	const [lineChartData, setLineChartData] = useState(LineChartData);
	const [barChartData, setBarChartData] = useState(BarChartData);

	return (
		<div className="dashboard-container">
			<div className="top-charts">
				<div className="pie-chart">
					<PieChart
						chartData={pieChartData}
						text="Tỉ lệ tuyển dụng"
					/>
				</div>
				<div className="line-chart">
					<LineChart
						chartData={lineChartData}
						text="Số lượng học sinh được tuyển dụng"
					/>
				</div>
			</div>
			<div className="bar-chart">
				<BarChart
					chartData={barChartData}
					text="Số lượng hồ sơ theo ngành"
				/>
			</div>
		</div>
	);
};

export default Dashboard;
