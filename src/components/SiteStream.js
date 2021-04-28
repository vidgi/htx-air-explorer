import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import { CompoundDropdown, AreaBumpDisplay } from './'
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

function SiteStream (props) {
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

  const [compoundValue, setCompoundValue] = useState(props.compoundValue)
  const [nivoCalendarData, setNivoCalendarData] = useState('')

  function getAverages (data) {
    var sums = data.reduce(function (acc, obj) {
      var date = obj.month
      if (!acc[date]) {
        acc[date] = { sum: 0, count: 0 }
      }
      acc[date].sum += +obj.value
      acc[date].count++
      return acc
    }, Object.create(null))
    return Object.keys(sums).map(function (date) {
      return { x: date, y: sums[date].sum / sums[date].count }
    })
  }

  function filterData (newCompoundValue, newSiteValue) {
    var compoundIndex = compoundData.findIndex(function (item, i) {
      return item.compound_name === newCompoundValue
    })
    var compoundCode = compoundData[compoundIndex].compound_code

    var siteIndex = siteData.findIndex(function (item, i) {
      return item.Site_Name === newSiteValue
    })

    var siteCode = siteData[siteIndex].site_code

    var newFiltered = props.rows.filter(
      row => row.compound_code === compoundCode && row.site_code === siteCode
    )

    var transformedDataForCalendar = []

    newFiltered.forEach(element => {
      var newArray2 = {
        month: moment(element.date_time.replace(':', ' ')).format('M/Y'),
        value: parseFloat(element.value)
      }

      transformedDataForCalendar.push(newArray2)
    })

    var finalCalendarData = getAverages(transformedDataForCalendar)

    finalCalendarData.sort(function (a, b) {
      if (a.x < b.x) {
        return -1
      }
      if (a.x > b.x) {
        return 1
      }
      return 0
    })

    return finalCalendarData
  }

  function handleCompoundChange (newCompoundValue) {
    setCompoundValue(newCompoundValue)
    if (newCompoundValue !== '') {
      var allSiteMonthData = []

      siteData.forEach(element => {
        var newArray = {
          id: element.Site_Name,
          data: filterData(newCompoundValue, element.Site_Name)
        }

        allSiteMonthData.push(newArray)
      })
      setNivoCalendarData(allSiteMonthData)
    } else {
      setNivoCalendarData('')
    }
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
                  <CompoundDropdown
                    value={compoundValue}
                    onChange={handleCompoundChange}
                  />
                </Grid>
              </Grid>

              <AreaBumpDisplay
                compound={compoundValue}
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

export default SiteStream
