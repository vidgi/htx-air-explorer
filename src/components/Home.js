import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(2)
  }
}))
function Home () {
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
          <Card>
            <CardContent className={classes.content}>
              <div>
                <Typography component='h4' variant='h4'>
                  htx air explorer
                </Typography>
              </div>
              <div className={classes.content}>
                <Typography variant='body1' color='textPrimary'>
                  exploring houston air quality + emissions
                </Typography>
                <br></br>
                <div className={classes.content}>
                  <Typography variant='caption' color='textSecondary'>
                    Houston is the hub of chemical manufacturing and energy
                    production in the nation with many refineries and chemical
                    facilities which are under regulation to comply with air
                    quality laws. To monitor the air quality and potential
                    emissions across the state, the Texas Commission on
                    Environmental Quality's (TCEQ) has automated gas
                    chromatograph (AutoGC) monitoring sites to monitor several
                    compounds such as benzene, toluene, ethyl benzene, xylenes,
                    and 1,3-butadiene. Additionally, these sites record
                    meteorological data such as wind that can impact air quality
                    and distribution of any emissions and can be used to
                    calculate Air Quality Index (AQI).
                    <br></br>
                    <br></br>However, to an ordinary citizen, these readings may
                    be difficult to understand and any regulations can be
                    difficult to understand. To address this, this visualization
                    tool can help illustrate the air quality data in simpler
                    format to understand trends of air quality over time and
                    areas of high concentration of chemical compounds. The core
                    dataset is from the Kinder Urban Data Portal which is a
                    collection of data from TCEQ monitoring sites that spans
                    data from 24 years (1997-2020) with >50 compounds.
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home
