import React from 'react'
import {MdEmail} from 'react-icons/md'
import {RiEarthFill} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {FaAddressBook} from 'react-icons/fa'
import dummyData from '../../../data'
import logo from '../../../asset/LOGO1.png'
import './T7.css'

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
        {/* <div class="T9card-wrapper">
        <div class="T9card">
            <div class="T9card-front" id={props.DownloadID}>
                <div class="T9left">
                    <img src={logo} alt="logo"/>
                </div>
                <div class="T9right">
                    <div class="T9person T9right-content">
                    <i><CgProfile/></i>
                        <div>
                            <h4>{name}</h4>
                            <p>{dept}</p>
                        </div>
                    </div>

                    <div class="T9phone T9right-content">
                    <i><IoIosContact /></i>
                        <div>
                            <p>{phonenumber}</p>
                        </div>
                    </div>

                    <div class="T9email T9right-content">
                    <i><MdEmail/></i>
                        <div>
                            <p>{email}</p>
                        </div>
                    </div>
                    <div class="T9website T9right-content">
                    <i><RiEarthFill/></i>
                        <div>
                            <p>{website}</p>
                        </div>
                    </div>

                    <div class="T9location T9right-content">
                    <i><FaAddressBook/></i>
                        <div>
                            <p>{address}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="T9card-back">
                <img src={logo} alt="logo"/>
                <h2> <strong>{companyname}</strong> </h2>
            </div>
        </div>
    </div> */}
    <div className='wrapper-class'>
            <div className={props.StopRotate==="stoprotate"? "div-T9-stop":"div-T9"}>
                <div className="front-div-T9" id={props.DownloadID}>
                    <div class="T9left">
                    <img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/>
                    </div>
                    <div class="T9right">
                        <div class="T9person T9right-content">
                        <i><CgProfile/></i>
                            <div>
                                <h4>{name}</h4>
                                <p>{dept}</p>
                            </div>
                        </div>

                        <div class="T9phone T9right-content">
                        <i><IoIosContact /></i>
                            <div>
                                <p>{phonenumber}</p>
                            </div>
                        </div>

                        <div class="T9email T9right-content">
                        <i><MdEmail/></i>
                            <div>
                                <p>{email}</p>
                            </div>
                        </div>
                        <div class="T9website T9right-content">
                        <i><RiEarthFill/></i>
                            <div>
                                <p>{website}</p>
                            </div>
                        </div>

                        <div class="T9location T9right-content">
                        <i><FaAddressBook/></i>
                            <div>
                                <p>{address}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={props.StopRotate==="stoprotate"? "back-div-T9-stop":"back-div-T9"} id={props.DownloadIDback}>
                    <div className="img-conatiner-back-T9"><img src={props.data===null ? logo:"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.data.company_logo} alt="logo"/></div>
                    <div className="strong-T9">{companyname}</div>
                </div>
            </div>
    </div>
    </>
    )
}

export default index
