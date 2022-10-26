import React from 'react'
import 'chart.js/auto'

import { Pie } from 'react-chartjs-2'

export default function PieChart() {
  return (
    <Pie
      data={{
        labels: ['one', 'two', 'three'],
        datasets: [{ lable: 'hey', data: [1, 2, 3] }],
      }}
    />
  )
}
