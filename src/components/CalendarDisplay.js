import React from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
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
export default function CalendarDisplay (props) {
  const classes = useStyles()

  return (
    <div style={{ maxWidth: '100%' }}>
      {props.data ? (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <div>
              Calendar Heatmap for {props.title}
              <div style={{ height: '20em', width: '99%' }}>
                <ResponsiveCalendar
                  data={props.data}
                  from='2020-01-02'
                  to='2020-09-30'
                  // direction='vertical'
                  emptyColor='#eeeeee'
                  colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                  minValue={0}
                  // margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                  monthBorderColor='#ffffff'
                  dayBorderWidth={2}
                  dayBorderColor='#ffffff'
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'row',
                      translateY: 36,
                      itemCount: 4,
                      itemWidth: 42,
                      itemHeight: 36,
                      itemsSpacing: 14,
                      itemDirection: 'right-to-left'
                    }
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  )
}
