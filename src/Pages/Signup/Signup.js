import React, { useContext, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { HiOutlineMail } from 'react-icons/hi'
import { MdLocalPhone } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import {PrefixContext} from '../../Context/PrefixContext'
import Input from '../../Components/Input/index'
import Form from '../../Components/Form/index'
import './Signup.css'
const Signup = () => {

    const{prefixurl}=useContext(PrefixContext)
    

    const [data,setdata]=useState({email:"",phonenumber:"",password:""});
    const defaultValidation = {
        status:'',
        color:'',
        message:{
            email:"",
            phonenumber:"",
            password:""
        }
    }
    const [validation,setvalidation]=useState(defaultValidation);

    const HandleChange = e => {
        const newData={
            ...data
        }
        newData[e.target.name]=e.target.value;
        setdata(newData)    
    }

    const submitUser = (e) => {
        e.preventDefault();
        setvalidation(defaultValidation);
        const expressdata={
            email:data.email,
            phonenumber:data.phonenumber,
            password:data.password
        }
        axios.post(prefixurl+"/signup",expressdata )
        .then(response => {
            setvalidation({
                status: response.data.status,
                color: 'success',
                message:{
                    email:null,
                    phonenumber:null,
                    password:null
                }
            })
        })
        .catch(error=>{
            const errorDetails = []
            console.log(error.response )
            if (error.response !== undefined && error.response.data!== undefined && error.response.data.message!== undefined){
                error.response.data.message.forEach((e)=>{
                    errorDetails[e.param]=e.msg;
                })
                setvalidation({
                    status: error.response.data.status,
                    color: 'danger',
                    message:{
                        email:(errorDetails.email !== undefined)? errorDetails.email :null,
                        phonenumber:(errorDetails.phonenumber !== undefined)? errorDetails.phonenumber :null,
                        password:(errorDetails.password !== undefined)? errorDetails.password :null
                    }
                })
            }
            else{
                setvalidation({
                    status: error.message,
                    color: 'danger',
                    message:{
                        email: null,
                        phonenumber: null,
                        password:null
                    }
                })
            }
            throw(error);
        })
    }
   
    return (
        <>
            <div className="container contact_div mt-5">
                <div className="row">
                    <div className="col-md-5  col-10 mx-auto mt-5">
                        <div className="formdiv">
                            <h4>Sign up</h4>
                            <Form submitHandler={submitUser} validationVariant={validation.color} validationMessage={validation.status} submitBtn="Register">
                                <Input icon={<HiOutlineMail/>} HandleChange={HandleChange} ErrorMessage={validation.message.email} type="email" name="email" placeholder="Email" />
                                <Input icon={<MdLocalPhone/>} HandleChange={HandleChange} ErrorMessage={validation.message.phonenumber} type="text" name="phonenumber" placeholder="Phone" />
                                <Input icon={<RiLockPasswordFill/>} HandleChange={HandleChange} ErrorMessage={validation.message.password} type="password" name="password" placeholder="Password" />
                            </Form>
                            <p>Already have an account?<Link to="/login"><span>Login here</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup