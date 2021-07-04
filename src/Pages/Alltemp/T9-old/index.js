import React from 'react'
import people from '../../../data'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import "./T7.css"

const index = () => {
    const{name,companyname,address,phonenumber,email,website}=people[1]
    return (
        <>
            <div className="div-t7">
                <div className="header2-T7"><h1>{companyname}</h1></div>
            <div className="header1-T7">
                <div className="list-T7">
                    <div className="name-T7"><h2>{name}</h2></div>
                    <div className="item-list-T7">
                       <div className="item-T7"><div className="list-icons"><IoIosContact/></div><div className="text-T7">+91 {phonenumber}</div></div>
                    </div>
                    <div className="item-list-T7">
                       <div className="item-T7"><div className="list-icons"><MdEmail/></div><div className="text-T7">{email}</div></div>
                    </div>
                    <div className="item-list-T7">
                       <div className="item-T7"><div className="list-icons"><RiEarthFill/></div><div className="text-T7">{website}</div></div>
                    </div>
                    <div className="address-T7">
                    {address}
                </div>
                </div>
                
            </div>
            
        </div>
        </>
    )
}

export default index
