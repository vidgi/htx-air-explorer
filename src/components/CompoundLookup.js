import React, { useState } from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import { CompoundDropdown } from './'

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

function CompoundLookup (props) {
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

  const [compoundValue, setCompoundValue] = useState('')

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
            className={classes.selectors}
            spacing={2}
          >
            {/* <Grid item>
              <Typography component='h5' variant='h5'>
                Chemical Compound Lookup
              </Typography>
            </Grid> */}
            <Grid item>
              <CompoundDropdown
                value={compoundValue}
                onChange={setCompoundValue}
              />{' '}
            </Grid>
          </Grid>

          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <div>Compound: {compoundValue}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CompoundLookup
