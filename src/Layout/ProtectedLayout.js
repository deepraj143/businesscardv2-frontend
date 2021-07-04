import React,{useEffect,useContext} from 'react'
import Navbar1 from '../Templates/Header'
import {AuthContext} from '../Context/AuthContext'

const ProtectedLayout = (props) => {

    const AuthContextData = useContext(AuthContext)
    useEffect(() => {
        AuthContextData.isAuthenticated();
    },
    // eslint-disable-next-line 
     [])

    return (
        <>
            <Navbar1/>
            <div className={"page-container "+props.pageColor}>
                {props.children}
            </div>
        </>
    )
}

export default ProtectedLayout
