import React from 'react'
import MUIDataTable from 'mui-datatables'

export default function DataTableDisplay (props) {
  const columns = [
    { name: 'compound_code', label: 'Compound Code', options: { sort: true } },
    { name: 'date_time', label: 'Date Time' },
    { name: 'site_code', label: 'Site Code' },
    { name: 'value', label: 'Value' }
  ]
  const options = {
    selectableRows: false,
    rowsPerPage: 10,
    responsive: 'stacked'
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <MUIDataTable
        columns={columns}
        data={props.rows}
        title='AutoGC Data'
        options={options}
      />
    </div>
  )
}
