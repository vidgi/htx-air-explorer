import React from 'react'

import { siteData } from './siteData'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

export default function SiteDropdown (props) {
  return (
    <div>
      <Autocomplete
        onChange={(event, value, reason) => {
          try {
            props.onChange(value.Site_Name)
          } catch (exception_var) {
            props.onChange('')
          }
        }}
        inputValue={props.value}
        style={{ width: 300 }}
        options={siteData}
        getOptionLabel={option => option.Site_Name}
        renderInput={params => (
          <TextField
            {...params}
            label='Select Air Monitoring Site'
            variant='outlined'
            margin='normal'
          />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.Site_Name, inputValue)
          const parts = parse(option.Site_Name, matches)

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          )
        }}
      />
    </div>
  )
}
