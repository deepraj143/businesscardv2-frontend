import React from 'react'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {FaAddressBook} from 'react-icons/fa'
import logo from '../../../asset/logo.png'
import dummyData from '../../../data'
import './T6.css'
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
            <div className={props.StopRotate==="stoprotate"? "div-T6-stop":"div-T6"}>
                <div className="front-div-T6" id={props.DownloadID}>
                    <div class="T8left">
                    <img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/>
                    </div>
                    <div class="T8right">
                        <div class="T8person T8right-content">
                            <i><CgProfile/></i>
                            <div>
                                <h4>{name}</h4>
                                <p>{dept}</p>
                            </div>
                        </div>
                        <div class="T8phone T8right-content">
                            <i><IoIosContact /></i>
                            <div>
                                <p>{phonenumber}</p>
                            </div>
                        </div>
                        <div class="T8email T8right-content">
                            <i><MdEmail/></i>
                            <div>
                            <p>{email}</p>
                            </div>
                        </div>
                        <div class="T8website T8right-content">
                            <i><RiEarthFill/></i>
                            <div>
                            <p>{website}</p>
                            </div>
                        </div>
                        <div class="T8address T8right-content">
                            <i><FaAddressBook/></i>
                            <div>
                                <p style={{fontSize:'14px',fontWeight:'600'}}>{address}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={props.StopRotate==="stoprotate"? "back-div-T6-stop":"back-div-T6"} id={props.DownloadIDback}>
                
                    <div className="img-conatiner-back-T6"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                    <div className="strong-T6">{companyname}</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default index
