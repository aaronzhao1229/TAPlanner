export function exportData() {
  /* Get the HTML data using Element by Id */
  let table = document.getElementById('datatable')

  /* Declaring array variable */
  let rows = []

  // //iterate through rows of table
  for (let i = 0; i < table.rows.length; i++) {
    rows.push([])
    for (let j = 0; j < table.rows[i].cells.length - 1; j++) {
      rows[i].push(table.rows[i].cells[j].innerText)
    }
  }

  let csvContent = 'data:text/csv;charset=utf-8,'
  // let csvContent = 'data:application/vnd.ms-excel;base64,'
  /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
  rows.forEach(function (rowArray) {
    let row = rowArray.join(',')
    csvContent += row + '\r\n'
  })

  /* create a hidden <a> DOM node and set its download attribute */
  let encodedUri = encodeURI(csvContent)
  let link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'TA_Plan.csv')
  document.body.appendChild(link)
  /* download the data file named "TA_Plan.csv" */
  link.click()
}

export function defaultValues(ids) {
  if (ids.regionId === 1) {
    ids.trackId = 1
    ids.sectionId = 1
    ids.stopId = 1
  } else if (ids.regionId === 2) {
    ids.trackId = 4
    ids.sectionId = 15
    ids.stopId = 16
  }

  // need to add more data
}
