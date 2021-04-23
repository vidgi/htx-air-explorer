import React from 'react'
import { Link, withRouter } from 'react-router-dom'
// import logo from '../swarigamaLogo.svg'

function Header (props) {
  return (
    <div className='header'>
      <nav class='navbar navbar-expand-lg'>
        <div class='container'>
          <Link class='navbar-brand' to='/'>
            htx air explorer
          </Link>

          <div class='navbar'>
            <ul class='list of links'>
              <li
                class={`nav-item  ${
                  props.location.pathname === '/map-overview' ? 'active' : ''
                }`}
              >
                <Link class='nav-link' to='/map-overview'>
                  map overview
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === '/site-analyzer' ? 'active' : ''
                }`}
              >
                <Link class='nav-link' to='/site-analyzer'>
                  historical site analyzer
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === '/compound-lookup' ? 'active' : ''
                }`}
              >
                <Link class='nav-link' to='/compound-lookup'>
                  compound lookup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Header)
