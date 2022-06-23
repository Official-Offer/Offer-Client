import { FC } from "react";
import dynamic from "next/dynamic";
import moment from "moment";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const SmallSplineChart: FC = ({ left, right, labels }: any) => {
  const color = "#7652FF";

  const series = [
    {
      name: "Price",
      data: left,
    },
    {
      name: "Market Cap",
      data: right,
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
      curve: ["straight", "smooth"],
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
