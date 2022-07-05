import { FC } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { formatter } from "@utils/formatCurrency";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const SmallSplineChart: FC = ({ left, right, labels }: any) => {
  const color = "#7652FF";
  const leftData = left?.map((val: Number) => val?.toFixed(2))
  if (!leftData) return null;
  const series = [
    {
      name: "Price",
      data: right?.map((val: Number) => val?.toFixed(2)),
    },
    {
      name: "Market Cap",
      data: leftData
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
          color: "black",
        },
        labels: {
          style: {
            colors:"black",
          },
          formatter: function (val: any) {
            return `$${val?.toFixed(2)}`;
          },
          forceNiceScale: true,
        },
        title: {
          style: {
            color: "black",
          },
        },
      },
      {
        opposite: true,
        axisBorder: {
          show: true,
          color: color,
        },
        labels: {
          style: {
            colors:  color,
          },
          formatter: function (val: any) {
            return formatter?.format(val);
          },
          forceNiceScale: true,
        },
        title: {
          style: {
            color:  color,
          },
        },
      },
    ],
    tooltip: {
      theme: "light",
    },
    colors: ["#344563",color],
    legend: {
      position: "bottom",
      horizontalAlign: "left",
    },
    markers: {
      colors: ["#FFF"],
    },
  };
  

  return <Chart options={options} series={series} type="line" height={180} />;
};
