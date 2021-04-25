import React, { useState } from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import {
  SiteDropdown,
  CompoundDropdown,
  DateSelector,
  DataTableDisplay
} from './'
import moment from 'moment'

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

function DataViewer (props) {
  const classes = useStyles()
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-100vw',
      scale: 0.8
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: 0,
      scale: 1.2
    }
  }
  const pageVariants2 = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  }

  const [siteValue, setSiteValue] = useState('')
  const [compoundValue, setCompoundValue] = useState('')
  const [fromDateValue, setFromDateValue] = useState(new Date('2020-01-02'))
  const [toDateValue, setToDateValue] = useState(new Date('2020-10-01'))

  return (
    <div className={classes.root}>
      <motion.div
        initial='initial'
        animate='in'
        exit='out'
        variants={pageVariants2}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial='initial'
          animate='in'
          exit='out'
          variants={pageVariants}
        >
          {/* <div>
            <Typography component='h5' variant='h5'>
              Historical Site Analyzer
            </Typography>
          </div> */}
          <Grid
            container
            direction='row'
            alignItems='center'
            alignContent='center'
            justify='center'
            className={classes.selectors}
            spacing={2}
          >
            <Grid item>
              <SiteDropdown value={siteValue} onChange={setSiteValue} />
            </Grid>
            <Grid item>
              <CompoundDropdown
                value={compoundValue}
                onChange={setCompoundValue}
              />
            </Grid>

            <Grid item>
              From
              <DateSelector
                minDate={new Date('2020-01-02')}
                maxDate={new Date('2020-10-01')}
                value={fromDateValue}
                onChange={setFromDateValue}
              />
            </Grid>
            <Grid item>
              To
              <DateSelector
                minDate={new Date('2020-01-02')}
                maxDate={new Date('2020-10-01')}
                value={toDateValue}
                onChange={setToDateValue}
              />
            </Grid>
          </Grid>

          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <div>From: {moment(fromDateValue).format('MMMM Do YYYY')}</div>
              <div>To: {moment(toDateValue).format('MMMM Do YYYY')}</div>
              <br></br>
              <div>Site: {siteValue}</div>
              <div>Compound: {compoundValue}</div>
            </CardContent>
          </Card>
          <br></br>
          <DataTableDisplay
            rows={[
              props.rows[0],
              props.rows[1],
              props.rows[2],
              props.rows[3],
              props.rows[4],
              props.rows[5],
              props.rows[6],
              props.rows[7],
              props.rows[8],
              props.rows[9],
              props.rows[10],
              props.rows[11],
              props.rows[12],
              props.rows[13],
              props.rows[14],
              props.rows[15],
              props.rows[16],
              props.rows[17],
              props.rows[18],
              props.rows[19],
              props.rows[20],
              props.rows[21],
              props.rows[22],
              props.rows[23],
              props.rows[24],
              props.rows[25],
              props.rows[26],
              props.rows[27],
              props.rows[28],
              props.rows[29]
            ]}
          />
          {/* <DataTableDisplay rows={props.rows} /> */}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DataViewer
