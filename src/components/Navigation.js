import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import LogoIcon from '@material-ui/icons/Waves'
import SiteIcon from '@material-ui/icons/Place'
import AnalyzerIcon from '@material-ui/icons/Timeline'
import GridIcon from '@material-ui/icons/Apps'

import DataIcon from '@material-ui/icons/Storage'
import CompoundIcon from '@material-ui/icons/MenuBook'
import Divider from '@material-ui/core/Divider'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {
  Home,
  SiteOverview,
  DataPlot,
  CompoundLookup,
  DataViewer,
  CalendarHeatmap
} from './'
import { readRemoteFile } from 'react-papaparse'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(10)
  }
}))

function Navigation (props) {
  const { window } = props
  const classes = useStyles()
  const [selectedIndex] = React.useState(1)

  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List>
        <ListItem
          button
          key={'htx air explorer'}
          component={Link}
          to={'/'}
          selected={
            props.location.pathname === '/'
              ? selectedIndex === 1
              : selectedIndex === 0
          }
        >
          <ListItemIcon>
            <LogoIcon />
          </ListItemIcon>
          <ListItemText primary={'htx air explorer'} />
        </ListItem>
        <Divider />
        <ListItem
          button
          key={'calendar heatmap'}
          component={Link}
          to={'/calendar-heatmap'}
          selected={
            props.location.pathname === '/calendar-heatmap'
              ? selectedIndex === 1
              : selectedIndex === 0
          }
        >
          <ListItemIcon>
            <GridIcon />
          </ListItemIcon>
          <ListItemText primary={'calendar heatmap'} />
        </ListItem>

        <ListItem
          button
          key={'data plot'}
          component={Link}
          to={'/data-plot'}
          selected={
            props.location.pathname === '/data-plot'
              ? selectedIndex === 1
              : selectedIndex === 0
          }
        >
          <ListItemIcon>
            <AnalyzerIcon />
          </ListItemIcon>
          <ListItemText primary={'data plot'} />
        </ListItem>
        <Divider />

        <ListItem
          button
          key={'data viewer'}
          component={Link}
          to={'/data-viewer'}
          selected={
            props.location.pathname === '/data-viewer'
              ? selectedIndex === 1
              : selectedIndex === 0
          }
        >
          <ListItemIcon>
            <DataIcon />
          </ListItemIcon>
          <ListItemText primary={'data viewer'} />
        </ListItem>
        <ListItem
          button
          key={'site overview'}
          component={Link}
          to={'/site-overview'}
          selected={
            props.location.pathname === '/site-overview'
              ? selectedIndex === 1
              : selectedIndex === 0
          }
        >
          <ListItemIcon>
            <SiteIcon />
          </ListItemIcon>
          <ListItemText primary={'site overview'} />
        </ListItem>
        <ListItem
          button
          key={'compound lookup'}
          component={Link}
          to={'/compound-lookup'}
          selected={
            props.location.pathname === '/compound-lookup'
              ? selectedIndex === 1
              : selectedIndex === 0
          }
        >
          <ListItemIcon>
            <CompoundIcon />
          </ListItemIcon>
          <ListItemText primary={'compound lookup'} />
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  const [rows, setRows] = useState('')
  useEffect(() => {
    async function getData () {
      try {
        readRemoteFile('./dfHouston2020new.csv', {
          header: true,
          complete: results => {
            // console.log('Results:', results)
            setRows(results.data) // array of objects
          }
        })
      } catch {
        // console.log('error')
      }
    }
    getData()
  }, []) // [] means just do this once, after initial render

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={classes.appBar}
        style={{ background: '#54758c' }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>{' '}
          <Typography variant='h5' noWrap>
            {/* <LogoIcon /> */}
            {props.location.pathname.replace(/-/g, ' ').replace(/\//g, ' ')}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}>
          <Switch>
            <Route path='/' exact component={() => <Home rows={rows} />} />
            <Route
              path='/site-overview'
              exact
              component={() => <SiteOverview rows={rows} siteValue='' />}
            />
            <Route
              path='/data-plot'
              exact
              component={() => (
                <DataPlot rows={rows} siteValue='' compoundValue='' />
              )}
            />
            <Route
              path='/calendar-heatmap'
              exact
              component={() => (
                <CalendarHeatmap rows={rows} siteValue='' compoundValue='' />
              )}
            />
            <Route
              path='/data-viewer'
              exact
              component={() => (
                <DataViewer rows={rows} siteValue='' compoundValue='' />
              )}
            />
            <Route
              path='/compound-lookup'
              exact
              component={() => <CompoundLookup rows={rows} compoundValue='' />}
            />
          </Switch>
        </div>
      </main>
    </div>
  )
}

export default withRouter(Navigation)
