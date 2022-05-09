import { FC } from "react";
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const SplineChart: FC = ({ data }: any) => {
    const series = [
        {
            name: 'Users',
            data: [31, 40, 71, 50]
        }
    ];

    const options: any = {
        series: [
            {
                name: 'Users',
                data: [31, 40, 71, 50]
            }
        ],
        chart: {
            height: 150,
            type: 'line',
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
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-22T00:00:00.000Z", "2018-09-23T00:00:00.000Z", "2018-09-27T01:30:00.000Z"],
            labels: {
                style: {
                    colors: '#7d7d7d'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#7652FF'
                }
            }
        },
        tooltip: {
            theme: 'dark'
        },
        colors: ['#7652FF'],
        legend: {
            position: 'bottom',
            horizontalAlign: "left",
        },
    };

    return (
        <Chart options={options} series={series} type="line" height={180} />
    );
};