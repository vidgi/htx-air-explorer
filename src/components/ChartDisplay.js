import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Card, CardContent, Grid } from '@material-ui/core'
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
export default function ChartDisplay (props) {
  const classes = useStyles()

  return (
    <div style={{ maxWidth: '100%' }}>
      {props.data ? (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <div>
              Chart for {props.title}
              <div style={{ height: '30em', width: '99%' }}>
                <ResponsiveLine
                  data={props.data}
                  curve='monotoneX'
                  margin={{ top: 50, right: 20, bottom: 60, left: 60 }}
                  xScale={{
                    type: 'time',
                    format: '%Y-%m-%d %H:%M',
                    precision: 'hour'
                  }}
                  xFormat='time:%m/%d/%Y %H:%M'
                  yScale={{
                    type: 'linear',
                    min: '0',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                  }}
                  yFormat=' >-.2f'
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 10,
                    tickRotation: 15,
                    format: '%m/%d/%Y',
                    legend: 'datetime',
                    legendOffset: 50,
                    legendPosition: 'middle'
                  }}
                  axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'value',
                    legendOffset: -40,
                    legendPosition: 'middle'
                  }}
                  //   nodeSize={6}
                  pointSize={5}
                  //   pointColor={{ theme: 'background' }}
                  //   pointBorderWidth={2}
                  //   pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            Select a site, compound, and date range to view chart
          </CardContent>
        </Card>
      )}
    </div>
  )
}
