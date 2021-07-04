import React,{useState,useContext} from 'react'
import axios from 'axios';
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordFill } from 'react-icons/ri'
import {PrefixContext} from '../../Context/PrefixContext'
import {AuthContext} from '../../Context/AuthContext'
import Input from '../../Components/Input/index'
import Form from '../../Components/Form/index'
import {Link,useHistory} from 'react-router-dom'

const Login = () => {

    const{prefixurl}=useContext(PrefixContext)
    const AuthContextData =useContext(AuthContext)
    const histroy = useHistory();
    const [data,setdata]=useState({email:"",password:"",});
    const defaultValidation = {
        status:'',
        color:'',
        message:{
            email:"",
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
            password:data.password
        }
        console.log(expressdata)
        axios.post(prefixurl+"/login",expressdata)
        .then(response => {
            if(response.status === 200){
                setvalidation({
                    status: response.data.status,
                    color: 'success',
                    message:{
                        email:null,
                        password:null
                    }
                })
                // console.log(response.data.message)
                AuthContextData.setStatusLoggedIn();
                histroy.push('/profile');
            }
        })
        .catch(error=>{
            if (error.response !== undefined && error.response.data!== undefined && error.response.data.message!== undefined){
                const errorDetails = []
                error.response.data.message.forEach((e)=>{
                    errorDetails[e.param]=e.msg;
                })
                setvalidation({
                    status: error.response.data.status,
                    color: 'danger',
                    message:{
                        email:(errorDetails.email !== undefined)? errorDetails.email :null,
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
                    <div className="col-md-5 col-10 mx-auto mt-5 ">
                        <div className="formdiv">
                            <h4>Login</h4>
                            <Form submitHandler={submitUser} validationMessage={validation.status} validationVariant={validation.color} submitBtn="Register">
                                <Input icon={<HiOutlineMail/>} HandleChange={HandleChange} ErrorMessage={validation.message.email} type="email" name="email" placeholder="Email" />
                                <Input icon={<RiLockPasswordFill/>} HandleChange={HandleChange} ErrorMessage={validation.message.password} type="password" name="password" placeholder="Password" />
                            </Form>
                            <p>Don't have an account?<Link to="/signup"><span>Signup here</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login