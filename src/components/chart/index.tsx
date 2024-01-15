import { Bar, Line, Pie } from "react-chartjs-2";

interface ChartProps {
	chartData: any;
	text: string;
}

export const BarChart: React.FC<ChartProps> = ({ chartData, text }: any) => {
	return (
		<div className="barchart-container">
			<h2>{text}</h2>
			<Bar data={chartData} className="barchart" />
		</div>
	);
};

export const LineChart: React.FC<ChartProps> = ({ chartData, text }) => {
	return (
		<div className="linechart-container">
			<h2>{text}</h2>
			<Line data={chartData} className="linechart" />
		</div>
	);
};

export const PieChart: React.FC<ChartProps> = ({ chartData, text }) => {
	return (
		<div className="piechart-container">
			<h2>{text}</h2>
			<Pie
				className="piechart"
				data={chartData}
				options={{
					responsive: true,
					plugins: {
						legend: {
							position: "bottom",
							labels: {
								boxWidth: 50,
								padding: 20,
							},
						},
					},
				}}
			/>
		</div>
	);
};
