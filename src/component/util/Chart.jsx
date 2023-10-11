import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Chart = ({arr=[], xLabel, yLabel}) => {
  const xData = []
  const yData = []
  for(let i = 0; i < arr.length; ++i) {
    xData.push(arr[i][0])
    yData.push(arr[i][1])
  }

  const data = {
    labels : xData,
    datasets : [{
      label : xLabel,
      data : yData,
      borderColor: "rgb(255, 99,132)",
      backgroundColor: "rgb(255, 99,132, 0.5)"
    }]
  }

  return (
    <Line 
    options={{
      responsive: true,
  }}
  data={data}
    />
  )
}

export default Chart;