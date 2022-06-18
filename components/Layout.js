import React from 'react'
import Header from './Header'
import Notify from './Notify'

function Layout({children}) {
  return (
    <div style={{padding:10}}>

        <Header />
        <Notify />
        {children}
    </div>
  )
}

export default Layout