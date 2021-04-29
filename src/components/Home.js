import React from 'react'

import { Typography, Card, CardContent, Link } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    padding: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    padding: theme.spacing(4)
  }
}))
function Home (props) {
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
          {props.rows ? (
            <div>
              <Card>
                <CardContent className={classes.content}>
                  <div>
                    <Typography component='h4' variant='h4'>
                      htx air explorer
                    </Typography>
                  </div>
                  <div className={classes.content}>
                    <Typography variant='body1' color='textPrimary'>
                      exploring houston air data
                    </Typography>
                    <br></br>
                    <Typography variant='caption' color='textPrimary'>
                      Houston is the hub of chemical manufacturing and energy
                      production in the nation with many refineries and chemical
                      facilities. To monitor the air quality and potential
                      emissions across the state, the Texas Commission on
                      Environmental Quality's (TCEQ) has automated gas
                      chromatograph (AutoGC) monitoring sites to monitor several
                      compounds such as benzene, toluene, ethyl benzene,
                      xylenes, and 1,3-butadiene. Additionally, these sites
                      record meteorological data such as wind that can impact
                      air quality and distribution of any emissions.
                    </Typography>
                    <br></br>
                    <br></br>
                    <Typography variant='caption' color='textPrimary'>
                      This tool uses various views to help illustrate the
                      measurements in visual format and communicate trends of
                      concentrations over time across various sites. The dataset
                      was acquired from the Kinder Urban Data Portal, containing
                      hourly samples from TCEQ monitoring sites from 2020 with
                      >50 chemical compounds.
                    </Typography>
                    <br></br>
                    <br></br>
                    <Typography variant='body1' color='textPrimary'>
                      sources:
                      <br></br>
                    </Typography>

                    <Typography variant='caption' color='textPrimary'>
                      <Link
                        underline='none'
                        href='https://www.kinderudp.org/#/datasetCatalog/qrrmeybylzpq'
                        target='_blank'
                        rel='noopener'
                      >
                        TCEQ Air Data
                      </Link>
                      <br></br>

                      <Link
                        underline='none'
                        href='https://pubchem.ncbi.nlm.nih.gov/'
                        target='_blank'
                        rel='noopener'
                      >
                        Chemical Compound Data
                      </Link>
                    </Typography>
                  </div>
                </CardContent>
              </Card>
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

export default Home
