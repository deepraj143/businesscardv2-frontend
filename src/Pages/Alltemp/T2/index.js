import React from 'react'
import dummyData from '../../../data'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import "./T2.css"
const T2 = (props) => {
    let finaldata = null;
    if(props.data === null)
    {
        finaldata = dummyData
    }
    else{
        finaldata = props.data
    }
    let {name,dept,companyname,address,phonenumber,email,website} = finaldata
    
    return (
        <>
        <div className='wrapper-class'>
            <div className="div-t2">
                <div className="T2front-div" id={props.DownloadID}>
                    <div className="first-header-t2">
                        <div className="header-t2">
                            <h1>{companyname}</h1>
                        </div>
                    </div>
                    <hr className="line-t2"></hr>
                    <div className="second-header-t2">
                        <div className="name-t2"><strong>{name}</strong><hr className="hr-t2"></hr></div>
                        <div className="dep-t2t"><strong>{dept}</strong></div>
                        <div className="address-t2"><p>{address}</p></div>
                        <div className="details-t2">
                            <div className="icons"><MdEmail/>+91{phonenumber}</div>
                            <div className="icons"><IoIosContact/>{email}</div>
                            <div className="icons"><RiEarthFill/>{website}</div>
                        </div>
                    </div>
                </div> 
                <div className="T2back-div">
                    <strong>{companyname}</strong>  
                    <div className='T2-1'></div>
                    <div className='T2-2'></div>
                    <div className='T2-3'></div>
                    <div className='T2-4'></div>
                    <div className='T2-5'></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default T2
