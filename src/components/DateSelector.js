import React, { useState } from 'react'
import DatePicker from 'react-date-picker'

export default function DateSelector (props) {
  const [minDate] = useState(props.minDate)
  const [maxDate] = useState(props.maxDate)

  return (
    <div>
      <DatePicker
        calendarAriaLabel='Toggle calendar'
        clearAriaLabel='Clear value'
        dayAriaLabel='Day'
        monthAriaLabel='Month'
        nativeInputAriaLabel='Date'
        onChange={date => {
          props.onChange(date)
        }}
        value={props.value}
        yearAriaLabel='Year'
        clearIcon=''
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  )
}
