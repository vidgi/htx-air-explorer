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
  const [filteredData, setFilteredData] = useState([
    {
      compound_code: '',
      date_time: '',
      site_code: '',
      value: ''
    }
  ])

  function handleSiteChange (newSiteValue) {
    setSiteValue(newSiteValue)
    // console.log(
    //   props.rows.filter(function (item) {
    //     return item.site_code === '482010617'
    //   })
    // )
  }

  function handleCompoundChange (newCompoundValue) {
    setCompoundValue(newCompoundValue)
    if (newCompoundValue !== '') {
      var val = newCompoundValue
      var index = compoundData.findIndex(function (item, i) {
        return item.compound_name === val
      })
      var compoundCode = compoundData[index].compound_code
      var newFiltered = props.rows.filter(function (item) {
        return item.compound_code === compoundCode
      })
      setFilteredData(newFiltered)
    } else {
      setFilteredData([
        {
          compound_code: '',
          date_time: '',
          site_code: '',
          value: ''
        }
      ])
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
              <div>hi</div>
            </CardContent>
          </Card>
          <br></br>
          <DataTableDisplay
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
            rows={filteredData}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DataViewer
