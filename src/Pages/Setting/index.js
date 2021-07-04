import React,{useState,useContext} from 'react'
import {PrefixContext} from '../../Context/PrefixContext'
import {Col, Container, Row ,Alert} from 'react-bootstrap'
import Button from '../../Components/Button'
import {AiFillSetting} from 'react-icons/ai'
import axios from 'axios';

import './Setting.css'

const Setting = () => {

    const{prefixurl}=useContext(PrefixContext)
    const [data, setdata] = useState()

    const defaultvalidation={
        status:"",
        color:"",
    }
    const [validation,setValidation]=useState(defaultvalidation);

    const HandleChange = (e) => {
        const newData={
            ...data
        }
        newData[e.target.name]=e.target.value;
        setdata(newData)  
        console.log(data)  
    }

    const submit=()=>{
        axios.post(prefixurl+"/changepassword",data)
        .then(response => {
            if(response.status === 200){
                setValidation({
                    status: response.data.status,
                    color: 'success',
                })
                
            }
        })
        .catch(error=>{
            if (error.response !== undefined && error.response.data!== undefined && error.response.data.message!== undefined){
                setValidation({
                    status: error.response.data.status,
                    color: 'danger',
                })
            }
            else{
                setValidation({
                    status: error.message,
                    color: 'danger',
                })
            }
            throw(error);
        })
    }

    return (
        <>      
            <Container>
                <Row>
                    <Col>
                        <div className="container-box">
                            <div className="container-header">
                                <div><AiFillSetting/></div>
                                <p>Change Password</p>
                            </div>
                            <Alert variant={validation.color} className="mx-auto w-75 ">{validation.status}</Alert>
                            <form className="from">
                                <div>
                                    <label>Old Password</label><input type='text'  onChange={HandleChange} name="oldpassword" placeholder="Enter Old Password"/>
                                </div>
                                <div>
                                    <label>New Password</label><input type='password' onChange={HandleChange} name="newpassword" placeholder="Enter New Password"/>
                                </div>
                                <div>
                                    <label>Confrim Password</label><input type='password' onChange={HandleChange} name="confirmpassword" placeholder="Enter Same Password"/>
                                </div>
                            </form>
                            <div className="container-footer">
                                <Button buttonStyle="btn--primary" buttonSize="btn--medium" onClick={submit}>Submit</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>  
        </>
    )
}

export default Setting
