import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ScrollToTop, Navigation } from './components'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif"
  },

  palette: {
    background: {
      default: '#F3F3F3'
    },
    text: {
      primary: '#54758c',
      secondary: '#a9a9a9'
    }
  }
})

function App () {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <ScrollToTop />
          <AnimatePresence>
            <Navigation />
          </AnimatePresence>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
