import { memo } from "react";

import { Pie } from "react-chartjs-2";

const CircleDiagram = ({ product }) => {
  const pieChartData = {
    labels: ["Продукт 1", "Продукт 2"],
    datasets: [{
      data: product,
      backgroundColor: ["#008001", "#FEA500"],
      hoverBackgroundColor: ["#008001", "#FEA500"]
    }]
  };

  const pieChart = (
    <Pie
      options={{
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltips: {
            enabled: false
          },
        }
      }}
      data={pieChartData}
    />
  );
  return pieChart;
};

export default memo(CircleDiagram);
