import React, { useContext, useState } from 'react'
import axios from 'axios';
import { HiOutlineMail } from 'react-icons/hi'
import { IoIosPersonAdd } from 'react-icons/io'
import { MdLocalPhone } from 'react-icons/md'
import { AiFillMessage } from 'react-icons/ai'
import {PrefixContext} from '../../Context/PrefixContext'
import Input from '../../Components/Input/index'
import Form from '../../Components/Form/index'
import { Col, Container, Row } from 'react-bootstrap'

const Contact = () => {
    
    const{prefixurl}=useContext(PrefixContext)
    

    const [data,setdata]=useState({name:"",email:"",phonenumber:"",message:""});
    const defaultValidation = {
        status:'',
        color:'',
        message:{
            name:"",
            email:"",
            phonenumber:"",
            message:""
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
            name:data.name,
            email:data.email,
            phonenumber:data.phonenumber,
            message:data.message
        }
        console.log(data)
        axios.post(prefixurl+"/contact",expressdata )
        .then(response => {
            setvalidation({
                status: response.data.status,
                color: 'success',
                message:{
                    name:null,
                    email:null,
                    phonenumber:null,
                    message:null,
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
                        name:(errorDetails.name !== undefined)? errorDetails.name :null,
                        email:(errorDetails.email !== undefined)? errorDetails.email :null,
                        phonenumber:(errorDetails.phonenumber !== undefined)? errorDetails.phonenumber :null,
                        message:(errorDetails.message !== undefined)? errorDetails.message :null,
                        
                    }
                })
            }
            else{
                setvalidation({
                    status: error.message,
                    color: 'danger',
                    message:{
                        name:null,
                        email: null,
                        phonenumber: null,
                        message: null,
                       
                    }
                })
            }
            throw(error);
        })
    }

    return (
        <>
        <Container>
            <Row>
               <Col xs={{span:'12', order: 2 }}  md={{span:'6', order: 1 }}>
                   <div className="iframe-conatiner">
                        {/* // eslint-disable-next-line */}
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620510473038!5m2!1sen!2sin"  style={{borderRadius:'4px',border:"none",marginLeft:'-80px'}}  height="470px" width="550px" title={"task"} allowfullscreen="" loading="lazy"></iframe>
                   </div>
                </Col> 
               <Col xs={{span:'12', order: 1 }}  md={{span:'6', order: 2 }}>
                    <div className="formdiv" style={{border:'none',marginTop:'50px',width:'100%'}}>
                            <div className="contact-header">
                                <h4>Get in touch</h4>
                                <p>Give us a feedback on the product or send some suggestions we will try to implement it.</p>
                            </div>
                            <Form submitHandler={submitUser} validationVariant={validation.color} validationMessage={validation.status} submitBtn="Send Message">
                                <Input icon={<IoIosPersonAdd/>} HandleChange={HandleChange} ErrorMessage={validation.message.name} type="text" name="name" placeholder="Name" /> 
                                <Input icon={<HiOutlineMail/>} HandleChange={HandleChange} ErrorMessage={validation.message.email} type="email" name="email" placeholder="Email" />
                                <Input icon={<MdLocalPhone/>} HandleChange={HandleChange} ErrorMessage={validation.message.phonenumber} type="text" name="phonenumber" placeholder="Phone" />
                                <Input icon={<AiFillMessage/>} HandleChange={HandleChange} ErrorMessage={validation.message.message} type="text" name="message" placeholder="Message" />
                            </Form>
                    </div>
                </Col> 
            </Row>
        </Container>  
        </>
    )
}

export default Contact