import { FC } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { formatter } from "@utils/formatCurrency";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const SplineChart: FC = ({ data, price, showPrice }: any) => {
  const isAdvanced = ![
    "Social Signal",
    "Volume",
    "Transactions",
    "Users",
  ].includes(data.name);
  const color = !isAdvanced ? "#7652FF" : "#F68922";
  const labels = data.data.charts.labels;
  const datasets =
    data.data.charts.datasets[Object.keys(data.data.charts.datasets)[0]];
  const processPrice = (labels: any, price: any) => {
    const first = new Date(labels[0]);
    const last = new Date(labels[labels.length - 1]);
    const res: Array<any> = price.prices.filter((p: any, i: any) => {
      const priceDate = new Date(price.labels[i]);
      return priceDate >= first && priceDate <= last;
    });
    const emptyDate = labels.length - res.length;
    const lastPrice = res[res.length - 1];
    for (let i = 0; i < emptyDate; i++) {
      // incase of no data for that date, use the latest date's price
      res.push(lastPrice);
    }
    return res;
  };
  const primitivePrice = data.data.charts.price?.data;
  const damnPrice = processPrice(labels, price);
  const finalPrice = primitivePrice || damnPrice;
  const first = labels[0];
  const last = labels[1];
  const series = showPrice
    ? [
        {
          name: data?.name,
          data: datasets,
        },
        {
          name: "Price",
          data: finalPrice,
        },
      ]
    : [
        {
          name: data?.name,
          data: datasets,
        },
      ];

  const options: any = {
    series: series,
    chart: {
      height: 200,
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
    yaxis: showPrice
      ? [
          {
            axisBorder: {
              show: true,
              color: color,
            },
            labels: {
              style: {
                colors: color,
              },
              formatter: function (val: any) {
                return formatter.format(val);
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
              formatter: function (val: any) {
                return `$${val.toFixed(3)}`;
              },
            },
            title: {
              style: {
                color: "black",
              },
            },
          },
        ]
      : [
          {
            axisBorder: {
              show: true,
              color: color,
            },
            labels: {
              style: {
                colors: color,
              },
              formatter: function (val: any) {
                return formatter.format(val.toFixed(2));
              },
            },
            title: {
              style: {
                color: color,
              },
            },
          },
        ],
    tooltip: {
      theme: "light",
    },
    colors: [color, "#223052"],
    legend: {
      position: "bottom",
      horizontalAlign: "left",
    },
  };

  return <Chart options={options} series={series} type="line" height={220} />;
};
