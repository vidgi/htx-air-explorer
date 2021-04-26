import React from 'react'
import MUIDataTable from 'mui-datatables'

export default function DataTableDisplay (props) {
  const columns = [
    { name: 'compound_name', label: 'Compound' },
    { name: 'site_name', label: 'Site' },
    {
      name: 'date',
      label: 'Date',
      options: {
        sort: true
      }
    },
    { name: 'time', label: 'Time' },
    {
      name: 'value',
      label: 'Value',
      options: {
        customBodyRender: value => <span>{parseFloat(value).toFixed(3)}</span>
      }
    }
  ]
  const options = {
    // selectableRows: false,
    rowsPerPage: 10
    // responsive: 'stacked'
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      {props.rows ? (
        <MUIDataTable
          columns={columns}
          data={props.rows}
          title={props.title}
          options={options}
        />
      ) : (
        'Select a site, compound, and date range to view data'
      )}
    </div>
  )
}
