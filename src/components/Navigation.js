import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import LogoIcon from '@material-ui/icons/Waves'
import MapIcon from '@material-ui/icons/Explore'
import AnalyzerIcon from '@material-ui/icons/Timeline'
import CompoundIcon from '@material-ui/icons/MenuBook'

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

import { Home, MapOverview, SiteAnalyzer, CompoundLookup } from './'

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
        <ListItem
          button
          key={'map overview'}
          component={Link}
          to={'/map-overview'}
          selected={
            props.location.pathname === '/map-overview'
              ? selectedIndex === 1
              : selectedIndex === 0
          }
        >
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary={'map overview'} />
        </ListItem>
        {/* <ListItem
          button
          key={'site analyzer'}
          component={Link}
          to={'/site-analyzer'}
          selected={
            props.location.pathname === '/site-analyzer'
              ? selectedIndex === 1
              : selectedIndex === 0
          }
        >
          <ListItemIcon>
            <AnalyzerIcon />
          </ListItemIcon>
          <ListItemText primary={'site analyzer'} />
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
        </ListItem> */}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

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
            <Route path='/' exact component={() => <Home />} />
            <Route
              path='/map-overview'
              exact
              component={() => <MapOverview />}
            />
            <Route
              path='/site-analyzer'
              exact
              component={() => <SiteAnalyzer />}
            />
            <Route
              path='/compound-lookup'
              exact
              component={() => <CompoundLookup />}
            />
          </Switch>
        </div>
      </main>
    </div>
  )
}

export default withRouter(Navigation)
