import React from 'react'
import { ResponsiveAreaBump } from '@nivo/bump'
import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    // flexDirection: 'row',
    // float: 'left',
    // flexGrow: 1,
    padding: theme.spacing(2)
  },
  selectors: {},
  card: {
    marginTop: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(2)
  }
}))
export default function AreaBumpDisplay (props) {
  const classes = useStyles()

  return (
    <div style={{ maxWidth: '100%' }}>
      {props.data &&
      props.compound !== 'n-Undecane' &&
      props.compound !== '1,2,3-Trimethylbenzene' &&
      props.compound !== '1,2,4-Trimethylbenzene' ? (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <div>
              Site Stream for {props.compound} (1/1/2020-9/30/2020)
              <div style={{ height: '28em', width: '99%' }}>
                <ResponsiveAreaBump
                  data={props.data}
                  margin={{ top: 30, right: 120, bottom: 30, left: 120 }}
                  spacing={8}
                  colors={{ scheme: 'set3' }}
                  startLabel='id'
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          {props.compound !== 'n-Undecane' &&
          props.compound !== '1,2,3-Trimethylbenzene' &&
          props.compound !== '1,2,4-Trimethylbenzene' ? (
            <div>
              <br></br>Select a compound to view site stream
            </div>
          ) : (
            <div>
              <br></br>
              Site stream not available for this compound
            </div>
          )}
        </div>
      )}
    </div>
  )
}
