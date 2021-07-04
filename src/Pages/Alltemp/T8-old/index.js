import React from 'react'
import people from '../../../data'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import "./T3.css"
const index = () => {
    const{name,companyname,address,phonenumber,email,website}=people[1]
    return (
        <>
            <div className="div-t3">
                <div className="second-header-t3">
                    <div className="name-t3"><strong>{name}</strong><hr className="hr-t3"></hr></div>
                    <div className="address-t3"><p>{address}</p></div>
                    <div className="details-t3">
                        <div className="icons"><MdEmail/>+91 {phonenumber}</div>
                        <div className="icons"><IoIosContact/>{email}</div>
                        <div className="icons"><RiEarthFill/>{website}</div>
                    </div>
                </div>
                <div className="line-t3"></div>
                <div className="first-header-t3">
                    <div className="header-t3">
                    <h2>{companyname} </h2>
                </div>
                </div>
            </div>
        </>
    )
}

export default index
