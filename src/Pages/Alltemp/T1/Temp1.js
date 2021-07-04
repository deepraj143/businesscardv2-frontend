import React  from 'react'
import './T1.css'
import dummyData from '../../../data'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import logo from '../../../asset/blacklogo.png'

const Temp1 = (props) => {
    let finaldata = null;
    if(props.data === null)
    {
        finaldata = dummyData
    }
    else{
        finaldata = props.data
    }
    let {name,dept,companyname,address,phonenumber,email,website} = finaldata;
    console.log(props.DownloadID)
    return (
        <>
            <div className='wrapper-class'>
            <div className={props.StopRotate==="stoprotate"? "div-back":"div"}>
                <div className="front-div" id={props.DownloadID}>
                    <div className="first-header">
                        <div className="header">
                            <div className="img-conatiner-T1"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                            <h3>{companyname} </h3>
                        </div>
                    </div>
                    <div className="second-header">
                        <div className="name"><strong>{name}</strong></div>
                        <div className="dept"><strong>{dept}</strong></div>
                        <div className="address"><p>{address}</p></div>
                        <div className="details">
                            <div className="icons"><MdEmail/>{phonenumber}</div>
                            <div className="icons"><IoIosContact/>{email}</div>
                            <div className="icons"><RiEarthFill/>{website}</div>
                        </div>
                    </div>
                </div>  
                <div className={props.StopRotate==="stoprotate"? "back-div-stop":"back-div"} id={props.DownloadIDback}>
                <div className="img-conatiner-back-T1"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                    <div className="strong-T1">{companyname}</div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Temp1
