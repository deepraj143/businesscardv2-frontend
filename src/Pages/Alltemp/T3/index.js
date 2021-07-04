import React from 'react'
import dummyData from '../../../data'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import logo from '../../../asset/logo.png'
import "./T3.css"


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
    console.log(props.StopRotate)
    return (
        <>
        <div className='wrapper-class'>
          <div className={props.StopRotate==="stoprotate"? "div-t4-stop":"div-t4"}>
              <div className=" front-div-t4" id={props.DownloadID}>
                <div className="line-t4">
                    <IoIosContact/>
                    <MdEmail />
                    <RiEarthFill/>
                </div>  
                    <div className="second-header-t4">
                        <div className="name-t4"><strong>{name}</strong> </div>
                        <div className="dept"><strong>{dept}</strong></div>
                        <div className="hr-t4"></div>
                        <div className="address-t4"><p>{address}</p></div>
                        <div className="details-t4">
                            <div className="icons">+91 {phonenumber}</div>
                            <div className="icons">{email}</div>
                            <div className="icons">{website}</div>
                        </div>
                    </div>
                    <div className="first-header-t4">
                        <div className="header-t4">
                            <div className="img-conatiner-T4"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                        </div>
                    </div>
                </div>
                <div className={props.StopRotate==="stoprotate"? "back-div-t4-stop":"back-div-t4"} id={props.DownloadIDback}>
                <div className="img-conatiner-back-T4"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                    <div className="strong-T4">{companyname}</div>
                </div>
            </div>
        </div>  
        </>
    )
}

export default index
