import React, { useState } from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import { SiteDropdown, MapComponent } from './'
import moment from 'moment'
import { siteData } from './siteData'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  selectors: {},
  card: {
    marginTop: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    padding: theme.spacing(2)
  }
}))

function SiteOverview (props) {
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
  const [siteDataArray, setSiteDataArray] = useState('')

  function getSiteData (newSiteValue) {
    if (newSiteValue !== '') {
      var siteIndex = siteData.findIndex(function (item, i) {
        return item.Site_Name === newSiteValue
      })

      var dataArray = siteData[siteIndex]

      setSiteDataArray(dataArray)
    } else {
      setSiteDataArray('')
    }
  }

  function handleSiteChange (newSiteValue) {
    setSiteValue(newSiteValue)
    getSiteData(newSiteValue)
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
                className={classes.selectors}
                spacing={2}
              >
                <Grid item>
                  <SiteDropdown value={siteValue} onChange={handleSiteChange} />
                </Grid>
              </Grid>

              <Card className={classes.card}>
                <CardContent className={classes.content}>
                  {siteValue ? (
                    <div>
                      <Typography component='h5' variant='h5'>
                        <div>{siteDataArray.Site_Name}</div>
                      </Typography>

                      <div>
                        ({siteDataArray.latitude}, {siteDataArray.longitude})
                      </div>
                      <br></br>
                      <div>
                        {siteDataArray.Street_Address}, {siteDataArray.City},{' '}
                        {siteDataArray.State}
                        <br></br>
                        {siteDataArray.ZIP}, {siteDataArray.County} COUNTY
                      </div>
                      <br></br>

                      <div>
                        Activation Date:{' '}
                        {moment(siteDataArray.Activation_Date).format('l')}
                      </div>
                      <div>Maintained By: {siteDataArray.Maintained_By}</div>
                      <div>Owned by: {siteDataArray.Owned_By}</div>
                      <div>
                        <br></br>
                        <MapComponent
                          longitude={siteDataArray.longitude}
                          latitude={siteDataArray.latitude}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>Select a site to view information</div>
                      {/* <br></br>
                  {siteData.map((value, index) => (
                    <div>{value.Site_Name}</div>
                  ))} */}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <img src='./loader.gif'></img>
              <br></br>Loading data
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SiteOverview
