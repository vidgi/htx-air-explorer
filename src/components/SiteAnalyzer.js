import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import { SiteDropdown, CompoundDropdown, DateSelector, ChartDisplay } from './'
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

function SiteAnalyzer (props) {
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
  const [fromDateValue, setFromDateValue] = useState(new Date('2020-01-01'))
  const [toDateValue, setToDateValue] = useState(new Date('2020-10-01'))
  const [nivoData, setNivoData] = useState('')

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

  function transformDataArrayForNivo (dataArray, compoundValue, siteValue) {
    var transformedDataForNivo = []
    dataArray.forEach(element => {
      var newArray = {
        x: moment(element.date_time.replace(':', ' ')).format(
          'YYYY-MM-DD HH:mm'
        ),
        y: element.value
      }

      transformedDataForNivo.push(newArray)
    })
    var finalData = [{ id: 'data series', data: transformedDataForNivo }]
    return finalData
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

      var transformedDataForNivo = transformDataArrayForNivo(
        newFiltered,
        newCompoundValue,
        newSiteValue
      )

      setNivoData(transformedDataForNivo)
    } else {
      setNivoData('')
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

  function handleFromDateChange (newFromDateValue) {
    setFromDateValue(newFromDateValue)
    filterData(compoundValue, siteValue, newFromDateValue, toDateValue)
  }

  function handleToDateChange (newToDateValue) {
    setToDateValue(newToDateValue)
    filterData(compoundValue, siteValue, fromDateValue, newToDateValue)
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

            <Grid item>
              From
              <DateSelector
                minDate={new Date('2020-01-01')}
                maxDate={new Date('2020-10-01')}
                value={fromDateValue}
                onChange={handleFromDateChange}
              />
            </Grid>
            <Grid item>
              To
              <DateSelector
                minDate={new Date('2020-01-01')}
                maxDate={new Date('2020-10-01')}
                value={toDateValue}
                onChange={handleToDateChange}
              />
            </Grid>
          </Grid>

          <ChartDisplay
            title={
              siteValue +
              ' - ' +
              compoundValue +
              ' (' +
              moment(fromDateValue).format('l') +
              ' - ' +
              moment(toDateValue).format('l') +
              ')'
            }
            data={nivoData}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SiteAnalyzer
