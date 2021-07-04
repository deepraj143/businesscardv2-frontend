import React from 'react'
import dummyData from '../../../data'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import logo from '../../../asset/logoegale.png'

import "./T4.css"

const T4 = (props) => {


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
            <div  className={props.StopRotate==="stoprotate"? "div-t5-stop":"div-t5"}>
                <div className="front-div-t5" id={props.DownloadID}>
                    <div className="sidebar1"></div>
                    <div className="sidebar2"></div>
                    <div className="header1">
                        <div className="list-t5">
                            <div className="item-list-add">
                            <div className="item-add"><div className="text">{address}</div></div>
                            </div>
                            <div className="item-list">
                            <div className="item"><div className="list-icons"><IoIosContact/></div><div className="text">+91 {phonenumber}</div></div>
                            </div>
                            <div className="item-list">
                            <div className="item"><div className="list-icons"><MdEmail/></div><div className="text">{email}</div></div>
                            </div>
                            <div className="item-list">
                            <div className="item"><div className="list-icons"><RiEarthFill/></div><div className="text">{website}</div></div>
                            </div>
                        </div>
                    </div>
                    <div className="header2" >
                        <div className="img-conatiner-T5"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                        <h2>{name}</h2>
                        <div>{dept}</div>
                    </div>
                </div>
                <div className={props.StopRotate==="stoprotate"? "back-div-t5-stop":"back-div-t5"} id={props.DownloadIDback}>
                    <div className="img-conatiner-back-T5"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                    <div className="strong-T5">{companyname}</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default T4
