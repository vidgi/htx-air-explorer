import React from 'react'

import { Typography, Card, CardContent } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    padding: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(2)
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
