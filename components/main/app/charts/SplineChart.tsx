import { FC } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const SplineChart: FC = ({ data, price, showPrice = false }: any) => {
  const color = data.name == "Social Signal" ? "#7652FF" : "#F68922";
  const labels = data.data.charts.labels;
  const datasets = data.data.charts.datasets[data.name];
  const series = [
    {
      name: data?.name,
      data: datasets,
    },
    {
      name: "Price",
      data: [1,2,3,4,5,6,7] //price?.prices.map(p=>p*100000),
    },
  ];
  const options: any = {
    series: series,
    chart: {
      height: 150,
      type: "line",
      toolbar: {
        show: false,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    stroke: {
      curve: ["straight", 'smooth'],
      width: [2, 2],
    },
    xaxis: {
      type: "datetime",
      categories: labels,
      labels: {
        style: {
          colors: "#7d7d7d",
        },
      },
    },
    // yaxis: {
    //   labels: {
    //     style: {
    //       colors: color,
    //     },
    //   },
    // },
    yaxis: [
      {
        axisBorder: {
          show: true,
          color: color,
        },
        labels: {
          style: {
            colors: color,
          },
        },
        title: {
         
          style: {
            color: color,
          },
        },
      },
      {
        opposite: true,
        axisBorder: {
          show: true,
          color: "black",
        },
        labels: {
          style: {
            colors: "black",
          },
        },
        title: {
          style: {
            color: "black",
          },
        },
      },
    ],
    tooltip: {
      theme: "dark",
    },
    colors: [color, "#223052"],
    legend: {
      position: "bottom",
      horizontalAlign: "left",
    },
  };

  return <Chart options={options} series={series} type="line" height={180} />;
};
