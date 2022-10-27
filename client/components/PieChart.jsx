import React from 'react'
import { useSelector } from 'react-redux'
import 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

export default function PieChart() {
  const pieChartData = {
    labels: [],
    datasets: [{ label: 'weight', data: [] }],
  }
  const categories = useSelector((state) => state.gearCategories)
  const gears = useSelector((state) => state.gears)

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
  console.log(pieChartData)
  return <Pie data={pieChartData} />
}
