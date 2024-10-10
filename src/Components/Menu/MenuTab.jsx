import React from 'react'
import Navbar from '../Navbar/Navbar'
import CBanner from '../Common/CBanner'
import Menu from '../Home/Menu'
import Footer from '../Footer'
const MenuTab = ({props}) => {
    return (
        <div>
            <Navbar />
            <CBanner props={props}/>
            <Menu />
            <Footer/>
        </div>
    )
}

export default MenuTab
