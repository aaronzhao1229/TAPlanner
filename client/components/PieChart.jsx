import React from 'react'
import { useSelector } from 'react-redux'
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

export default function PieChart() {
  const categories = useSelector((state) => state.gearCategories)
  const gears = useSelector((state) => state.gears)
  const pieChartData = {
    labels: [],
    datasets: [
      {
        label: 'weight',
        data: [],
        backgroundColor: [
          '#66CC8A',
          '#377CFB',
          '#EA5234',
          '#333C4D',
          '#3ABFF8',
          '#36D399',
          '#FBBD23',
          '#F87272',
        ],
      },
    ],
  }
  const plugIns = {
    plugins: {
      legend: {
        position: 'right',
        rtl: false,
        labels: {
          usePointStyle: true,
          pointStyle: 'rect',
          padding: 20,
          generateLabels: customLabels,
        },
        // title: {
        //   display: true,
        //   color: 'red',
        //   text: 'Hey',
        // },
      },
    },
  }

  function customLabels() {
    const datasets = pieChartData.datasets
    const totalWeight = datasets[0].data.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    )
    const label = datasets[0].data.map((data, i) => ({
      text: `${pieChartData.labels[i]}   ${data} (g)`,
      fillStyle: datasets[0].backgroundColor[i],
      lineWidth: 0,
    }))

    // store the total weight data to the legend
    label.push({
      text: `Total   ${totalWeight} (g)`,
      fillStyle: 'white',
      lineWidth: 0,
      fontColor: 'black',
    })

    return label
  }

  // make pie chart data
  categories.map((category) => {
    pieChartData.labels.push(category.category)
    let weightSum = 0
    gears.map((gear) => {
      if (gear.categoryId === category.id) {
        weightSum += gear.weight
      }
    })
    pieChartData.datasets[0].data.push(weightSum)
  })

  return (
    <div className="flex flex-row justify-center">
      <div className="basis-1/5">
        <Doughnut data={pieChartData} options={plugIns} />
      </div>
    </div>
  )
}
