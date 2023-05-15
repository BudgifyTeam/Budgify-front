import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

function CandlestickChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      series: [
        {
          data: [
            {
              x: new Date(2022, 0, 1),
              y: [100, 150, 90, 120],
            },
            {
              x: new Date(2022, 0, 2),
              y: [120, 140, 100, 110],
            },
            {
              x: new Date(2022, 0, 3),
              y: [110, 130, 90, 100],
            },
            {
              x: new Date(2022, 0, 4),
              y: [100, 120, 80, 90],
            },
            {
              x: new Date(2022, 0, 5),
              y: [90, 110, 70, 100],
            },
            {
              x: new Date(2022, 0, 6),
              y: [100, 130, 80, 120],
            },
            {
              x: new Date(2022, 0, 7),
              y: [120, 150, 100, 140],
            },
          ],
        },
      ],
      chart: {
        type: 'rangeBar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#00B746',
            downward: '#EF403C',
          },
        },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        shared: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const { o, h, l, c } = series[seriesIndex].data[dataPointIndex].y;
          return `
            <div class="apexcharts-tooltip-candlestick">
              <div>Open: ${o}</div>
              <div>High: ${h}</div>
              <div>Low: ${l}</div>
              <div>Close: ${c}</div>
            </div>
          `;
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, chartOptions);

    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div ref={chartRef}></div>;
}

export default CandlestickChart;