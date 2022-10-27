import React from 'react'
import { useSelector } from 'react-redux'
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'

export default function PieChart() {
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
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      },
    ],
  }
  const categories = useSelector((state) => state.gearCategories)
  const gears = useSelector((state) => state.gears)

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
      <div className="basis-1/4">
        <Doughnut data={pieChartData} />
      </div>
    </div>
  )
}
