import React from 'react'
import Navbar1 from '../Templates/Header'
const MainLayout = (props) => {
    
    return (
        <>
            <Navbar1/>
            <div className={"page-container "+props.pageColor}>
                {props.children}
            </div>
        </>
    )
}

export default MainLayout
