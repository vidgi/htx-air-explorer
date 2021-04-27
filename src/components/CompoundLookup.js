import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  Divider
} from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import { CompoundDropdown } from './'
import { compoundData } from './compoundData'

import GHS02 from './img/GHS02.svg'
import GHS04 from './img/GHS04.svg'
import GHS06 from './img/GHS06.svg'
import GHS07 from './img/GHS07.svg'
import GHS08 from './img/GHS08.svg'
import GHS09 from './img/GHS09.svg'

// Pubchem url:
// https://pubchem.ncbi.nlm.nih.gov/compound/{pubchem_cid}
// To get image:
// https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{pubchem_cid}/PNG
// To get properties:
// https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{pubchem_cid}/property/MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES/JSON
//  To get wikipedia summary:
// https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Ethane

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
    paddingTop: theme.spacing(4),
    padding: theme.spacing(2)
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

  const [compoundValue, setCompoundValue] = useState(props.compoundValue)
  const [compoundDataArray, setCompoundDataArray] = useState('')
  // const [pubChemData, setPubChemData] = useState('')

  // const getPubChemData = async cid => {
  //   const response = await fetch(
  //     'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' +
  //       cid +
  //       '/property/MolecularFormula,MolecularWeight,IUPACName/JSON'
  //   )
  //   const jsonData = await response.json()
  //   setPubChemData(jsonData)
  // }

  function getCompoundData (newCompoundValue) {
    if (newCompoundValue !== '') {
      var compoundIndex = compoundData.findIndex(function (item, i) {
        return item.compound_name === newCompoundValue
      })

      var dataArray = compoundData[compoundIndex]

      setCompoundDataArray(dataArray)
    } else {
      setCompoundDataArray('')
    }
  }

  function handleCompoundChange (newCompoundValue) {
    setCompoundValue(newCompoundValue)
    getCompoundData(newCompoundValue)
    // getPubChemData(compoundDataArray.pubchem_cid)
    // console.log(pubChemData.PropertyTable.Properties[0])
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
                {/* <Grid item>
              <Typography component='h5' variant='h5'>
                Chemical Compound Lookup
              </Typography>
            </Grid> */}
                <Grid item>
                  <CompoundDropdown
                    value={compoundValue}
                    onChange={handleCompoundChange}
                  />{' '}
                </Grid>
              </Grid>

              <Card className={classes.card}>
                <CardContent className={classes.content}>
                  {compoundValue ? (
                    <div>
                      <Typography component='h5' variant='h5'>
                        {compoundValue}
                      </Typography>
                      <br></br>
                      <Divider />
                      {compoundDataArray.summary ? (
                        <div>
                          <br></br>
                          {compoundDataArray.summary}
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <br></br>
                      {compoundDataArray.lod_ppb_v ? (
                        <div>
                          <Typography component='body1' variant='body1'>
                            Level of Detection:
                          </Typography>
                          <br></br>
                          {compoundDataArray.lod_ppb_v} ppb
                        </div>
                      ) : (
                        <div></div>
                      )}

                      {compoundDataArray.pubchem_cid ? (
                        <div>
                          <br></br>
                          <Typography component='body1' variant='body1'>
                            More information:
                          </Typography>
                          <br></br>

                          <Button
                            variant='contained'
                            color='primary'
                            href={
                              'https://pubchem.ncbi.nlm.nih.gov/compound/' +
                              compoundDataArray.pubchem_cid
                            }
                            target='_blank'
                          >
                            PubChem
                          </Button>
                          <br></br>
                          <br></br>
                          <Typography component='body1' variant='body1'>
                            Chemical structure:
                          </Typography>
                          <br></br>
                          <img
                            src={
                              'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' +
                              compoundDataArray.pubchem_cid +
                              '/PNG'
                            }
                            alt='chemical structure'
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}

                      {compoundDataArray.GHS ? (
                        <div>
                          <br></br>
                          <Typography component='body1' variant='body1'>
                            GHS hazard classification:
                          </Typography>

                          {compoundDataArray.GHS.includes('2') ? (
                            <div>
                              <img src={GHS02} alt='Flammable'></img> <br></br>
                              Flammable
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {compoundDataArray.GHS.includes('4') ? (
                            <div>
                              <img src={GHS04} alt='Compressed Gas'></img>{' '}
                              <br></br>
                              Compressed Gas
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {compoundDataArray.GHS.includes('6') ? (
                            <div>
                              <img src={GHS06} alt='Acute Toxicity'></img>{' '}
                              <br></br>
                              Acute Toxicity
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {compoundDataArray.GHS.includes('7') ? (
                            <div>
                              <img src={GHS07} alt='Irritant'></img> <br></br>
                              Irritant
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {compoundDataArray.GHS.includes('8') ? (
                            <div>
                              <img src={GHS08} alt='Health Hazard'></img>
                              <br></br> Health Hazard
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {compoundDataArray.GHS.includes('9') ? (
                            <div>
                              <img src={GHS09} alt='Environmental Hazard'></img>
                              <br></br> Environmental Hazard
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      ) : (
                        <div>Select a compound to view information</div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div>Select a compound to view information</div>
                      {/* <br></br>
                  {compoundData.map((value, index) => (
                    <div>{value.compound_name}</div>
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

export default CompoundLookup
