import React,{useState,useContext} from 'react'
import axios from 'axios';
import {PrefixContext} from '../../Context/PrefixContext'
import Input from '../../Components/Input';
import {AiOutlineFileProtect} from 'react-icons/ai'
import {IoEarth} from 'react-icons/io5'
import {ImOffice} from 'react-icons/im'
import Form from '../../Components/Form';
import './CompanyName.css';
import { Alert } from 'react-bootstrap';
import { IKContext, IKUpload } from 'imagekitio-react';

function CompanyName(props) {

    const{prefixurl}=useContext(PrefixContext)
    const [data,setdata]=useState({name:"",title:"",email:"",image:""});
    const defaultValidation = {
        status:'',
        color:''
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
            title:data.title,
            email:data.email,
            company_logo:data.image
        }
        axios.post(prefixurl+"/addcompany",expressdata)
        .then(response => {
            if(response.status === 200){
                setvalidation({
                    status: response.data.status,
                    color: 'success',
                })
                props.setdata({...props.data,company:{...response.data.message}})
                props.changestate('Add-Branch');
            }
        })
        .catch(error=>{
            if (error.response !== undefined && error.response.data!== undefined && error.response.data.message!== undefined){
                setvalidation({
                    status: error.response.data.status,
                    color: 'danger',
                })
            }
            else{
                setvalidation({
                    status: error.message,
                    color: 'danger',
                })
            }
            throw(error);
        })
    }
    const onSuccess = (result) =>{
        const newData={
            ...data
        }
        newData.image=result.name;
        setdata(newData)
    }

    const onError = (err) =>{
        console.log(err)
        alert('Error Uploading File')
    }
    
    return (
        <div className="Container-company">
            <div className="company-icons mx-auto"><ImOffice/></div>
            <div className="company-header">Add Company Details</div>
            <Alert variant={validation.color} style={{margin:'0 50px'}}>{validation.status}</Alert>
            <Form submitHandler={submitUser} validationMessage={validation.status} validationVariant={validation.color} submitBtn="Submit">
                <Input icon={<ImOffice/>} HandleChange={HandleChange}  type="text" name="name" placeholder="Enter Company Name" />
                <Input icon={<AiOutlineFileProtect/>} HandleChange={HandleChange}  type="text" name="title" placeholder="Enter Company Title" />
                <Input icon={<IoEarth/>} HandleChange={HandleChange}  type="text" name="email" placeholder="Enter Company Website" />
                <div className="upload">
                    <div className="uploaddiv">
                   
                    <IKContext 
                        publicKey={'public_VTCu/zK1WjPazE7gk/FTltme42c='} 
                        urlEndpoint={'https://ik.imagekit.io/deepraj/'} 
                        authenticationEndpoint={prefixurl+"/image-auth"}
                    >
                        <p>Upload an image:-</p>
                        <IKUpload
                            fileName="test-upload.png"
                            folder="BussinessCard/upload/"
                            useUniqueFileName={true}
                            onError={onError}
                            onSuccess={onSuccess}
                        />
                    </IKContext>
                    </div>
                </div>
            </Form>
            
        </div>
    );
}
export default CompanyName;