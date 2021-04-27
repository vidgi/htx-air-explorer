import React from 'react'

import { compoundData } from './compoundData'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

export default function CompoundDropdown (props) {
  return (
    <div>
      <Autocomplete
        onChange={(event, value, reason) => {
          try {
            props.onChange(value.compound_name)
          } catch (exception_var) {
            props.onChange('')
          }
        }}
        style={{ width: 300 }}
        options={compoundData}
        getOptionLabel={option => option.compound_name}
        renderInput={params => (
          <TextField
            {...params}
            label='Select Chemical Compound'
            variant='outlined'
            margin='normal'
          />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.compound_name, inputValue)
          const parts = parse(option.compound_name, matches)

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
