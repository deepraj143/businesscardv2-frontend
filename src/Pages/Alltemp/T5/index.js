import React from 'react'
import dummyData from '../../../data'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import logo from '../../../asset/logoegale.png'
import "./T5.css"

const index = (props) => {

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
                <div className={props.StopRotate==="stoprotate"? "div-t6-back":"div-t6"}>
                    <div className="front-div-t6" id={props.DownloadID}>
                        <div className="nav"></div>     
                        <div className="inner-div">
                        <div className="header2-T6">
                        <div className="imgfront-t6"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                            <h1>{name}</h1>
                            <div>{dept}</div>
                        </div> 
                        <div className="header1-T6">
                            <div className="list-T6">
                                <div className="item-list-T6">
                                <div className="item-T6"><div className="list-icons"><IoIosContact/></div><div className="text-T6">{phonenumber}</div></div>
                                </div>
                                <div className="item-list-T6">
                                <div className="item-T6"><div className="list-icons"><MdEmail/></div><div className="text-T6">{email}</div></div>
                                </div>
                                <div className="item-list-T6">
                                <div className="item-T6"><div className="list-icons"><RiEarthFill/></div><div className="text-T6">{website}</div></div>
                                </div>
                            </div>  
                        </div>
                        </div>
                        <div className="footer">{address}</div>
                    </div>
                    <div className={props.StopRotate==="stoprotate"? "back-div-t6-stop":"back-div-t6"} id={props.DownloadIDback}>
                        <div className="img-t6"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                        <div className="strong-T1">{companyname}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default index
