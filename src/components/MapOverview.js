import React, { useState, useEffect } from 'react'
import { Typography, Card, CardContent, Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import { SiteDropdown, CompoundDropdown, DateSelector } from './'
import moment from 'moment'
import { readRemoteFile } from 'react-papaparse'

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

function MapOverview () {
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

  const [siteValue, setSiteValue] = React.useState('')
  const [compoundValue, setCompoundValue] = React.useState('')
  const [fromDateValue, setFromDateValue] = React.useState(
    new Date('2020-01-02')
  )
  const [toDateValue, setToDateValue] = React.useState(new Date('2020-10-01'))

  const [rows, setRows] = useState([
    {
      compound_code: '',
      date_time: '',
      site_code: '',
      value: ''
    }
  ])
  useEffect(() => {
    async function getData () {
      try {
        readRemoteFile('./dfHouston2020.csv', {
          header: true,
          complete: results => {
            console.log('Results:', results)
            setRows(results.data) // array of objects
          }
        })
      } catch {
        console.log('error')
      }
    }
    getData()
  }, []) // [] means just do this once, after initial render

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
          <div>
            <Typography component='h5' variant='h5'>
              Summary View of Houston Air Monitoring Sites
            </Typography>
          </div>
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
          </Grid>
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
              <br></br>
              <div>
                {moment('02JUL2020:17:00:00.000'.replace(':', ' ')).format(
                  'MMMM Do YYYY h a'
                )}
              </div>
              <div>{rows[0].site_code}</div>
              <div>{rows[0].compound_code}</div>
              <div>{rows[0].date_time}</div>
              <div>{rows[0].value}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MapOverview
