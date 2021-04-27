import React from 'react'

export default function MapComponent (props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          "<div class='container'><iframe class='responsive-iframe' src='https://maps.google.com/maps?q=" +
          props.latitude +
          ',' +
          props.longitude +
          "&z=15&output=embed' width='360' height='360' frameborder='0' style='border:0' /></div>"
      }}
    />
  )
}
