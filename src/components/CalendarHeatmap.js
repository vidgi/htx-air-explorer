import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import { SiteDropdown, CompoundDropdown, CalendarDisplay } from './'
import moment from 'moment'
import { siteData } from './siteData'
import { compoundData } from './compoundData'

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

function CalendarHeatmap (props) {
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

  const [siteValue, setSiteValue] = useState(props.siteValue)
  const [compoundValue, setCompoundValue] = useState(props.compoundValue)
  const [fromDateValue] = useState(new Date('2020-01-01'))
  const [toDateValue] = useState(new Date('2020-09-30'))
  const [nivoCalendarData, setNivoCalendarData] = useState('')

  function checkIfInDateRange (dateStringToCheck, fromDate, toDate) {
    // Date string is in the csvdate format (not moment)
    // below, we are taking out that problematic colon and converting to moment
    const dateToCheckMoment = moment(dateStringToCheck.replace(':', ' '))
    const check = moment(dateToCheckMoment).isBetween(
      fromDate,
      toDate,
      undefined,
      '[]'
    )
    return check
  }

  function getAverages (data) {
    var sums = data.reduce(function (acc, obj) {
      var date = obj.day.split(' ')[0]
      if (!acc[date]) {
        acc[date] = { sum: 0, count: 0 }
      }
      acc[date].sum += +obj.value
      acc[date].count++
      return acc
    }, Object.create(null))
    return Object.keys(sums).map(function (date) {
      return { day: date, value: sums[date].sum / sums[date].count }
    })
  }

  function transformDataArrayForNivo (dataArray, compoundValue, siteValue) {
    var transformedDataForCalendar = []

    dataArray.forEach(element => {
      var newArray2 = {
        day: moment(element.date_time.replace(':', ' ')).format(
          'YYYY-MM-DD HH:mm'
        ),
        value: parseFloat(element.value)
      }

      transformedDataForCalendar.push(newArray2)
    })

    var finalCalendarData = getAverages(transformedDataForCalendar)
    setNivoCalendarData(finalCalendarData)
  }

  function filterData (
    newCompoundValue,
    newSiteValue,
    newFromDateValue,
    newToDateValue
  ) {
    if (
      newCompoundValue !== '' &&
      newSiteValue !== '' &&
      newFromDateValue !== null &&
      newToDateValue !== null
    ) {
      var compoundIndex = compoundData.findIndex(function (item, i) {
        return item.compound_name === newCompoundValue
      })
      var compoundCode = compoundData[compoundIndex].compound_code

      var siteIndex = siteData.findIndex(function (item, i) {
        return item.Site_Name === newSiteValue
      })

      var siteCode = siteData[siteIndex].site_code

      var newFiltered = props.rows.filter(
        row =>
          row.compound_code === compoundCode &&
          row.site_code === siteCode &&
          checkIfInDateRange(row.date_time, newFromDateValue, newToDateValue)
      )

      transformDataArrayForNivo(newFiltered, newCompoundValue, newSiteValue)
    } else {
      setNivoCalendarData('')
    }
  }

  function handleSiteChange (newSiteValue) {
    setSiteValue(newSiteValue)
    filterData(compoundValue, newSiteValue, fromDateValue, toDateValue)
  }

  function handleCompoundChange (newCompoundValue) {
    setCompoundValue(newCompoundValue)
    filterData(newCompoundValue, siteValue, fromDateValue, toDateValue)
  }

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
          {props.rows ? (
            <div>
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
                  <SiteDropdown value={siteValue} onChange={handleSiteChange} />
                </Grid>
                <Grid item>
                  <CompoundDropdown
                    value={compoundValue}
                    onChange={handleCompoundChange}
                  />
                </Grid>
              </Grid>

              <CalendarDisplay
                title={
                  siteValue + ' - ' + compoundValue + ' (1/1/2020-9/30/2020)'
                }
                from={moment(fromDateValue).format('YYYY-MM-DD')}
                to={moment(toDateValue).format('YYYY-MM-DD')}
                data={nivoCalendarData}
              />
            </div>
          ) : (
            <div>
              <img src='./loader.gif' alt='loading animation'></img>
              <br></br>Loading data
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CalendarHeatmap
