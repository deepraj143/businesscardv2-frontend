import React,{useState,useContext} from 'react'
import { Alert, Button, Col, Container, Modal, Row } from 'react-bootstrap'
import {FaUserAlt,FaEdit} from 'react-icons/fa'
import {GrMail} from 'react-icons/gr'
import {AiOutlineFileProtect} from 'react-icons/ai'
import {BiArrowBack} from 'react-icons/bi'
import Input from '../../../Components/Input'
import { IKContext, IKUpload } from 'imagekitio-react';
import {PrefixContext} from '../../../Context/PrefixContext'
import axios from 'axios';




const EditCompany = (props) => {
    
    const [changemodel, setchangemodel] = useState('default')
    const{prefixurl}=useContext(PrefixContext)

    const HandleChange = e => {
        const newData={
            ...props.editData
        }
        newData[e.target.name]=e.target.value;
        props.seteditData(newData) 
    }

    const onSuccess = (result) =>{
        const newData={
            ...props.editData
        }
        newData.company_logo=result.name;
        // props.seteditData(newData) 
        axios.post(prefixurl+"/editimage",newData)
        .then(response => {
            console.log(response)
            if(response.status === 200){
                console.log("in response")
                props.seteditData(newData)
            }
        })
        .catch(error=>{
            console.log(error)
            throw(error);
        })
    }

    var LoadFile = (event) =>{
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('output');
          output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      };

    const onError = (err) =>{
        console.log(err)
        alert('Error Uploading File')
    }
    console.log(props.editData)
    return (
         <><Modal.Title className="mt-4 ml-4 ">Edit Details</Modal.Title>
                <Alert variant={props.validation.color} className="mx-auto w-75 ">{props.validation.status}</Alert>
                
                    {changemodel==="default" && <Modal.Body style={{display:'flex',justifyContent:'space-around',flexDirection:'column'}}>
                    <div className="addbranch" onClick={()=>setchangemodel('upload-image')}><FaEdit size={20}/>Edit Image</div>
                        <div className="edit-companyname">
                            <div style={{display:'flex'}}>
                                <Container fluid>
                                    <Row>
                                        <Col md={2}  sm={0} className="edit-company-label-box" >
                                            <div className="edit-company-label">
                                                <label>Name</label>
                                            </div>
                                        </Col>
                                        <Col className='col-input' sm={12} md={10}>
                                            <Input icon={<FaUserAlt/>} defaultValue={(props.editData !== undefined && props.editData.company_name !== undefined) && props.editData.company_name} HandleChange={HandleChange} type="text" name="company_name" placeholder="Name" />
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <div style={{display:'flex'}}>
                                <Container fluid>
                                    <Row>
                                        <Col md={2} sm={0} className="edit-company-label-box"  >
                                            <div className="edit-company-label">
                                                <label>Title</label>
                                            </div>
                                        </Col>
                                        <Col className='col-input' sm={12}  md={10}>
                                            <Input icon={<AiOutlineFileProtect/>} defaultValue={(props.editData !== undefined && props.editData.company_title !== undefined) && props.editData.company_title} HandleChange={HandleChange} type="text" name="company_title" placeholder="Title" />
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <div style={{display:'flex'}}>
                                <Container fluid>
                                    <Row>
                                        <Col  sm={0} md={2} className="edit-company-label-box" >
                                            <div className="edit-company-label">
                                                <label>Email</label>
                                            </div>
                                        </Col>
                                        <Col className='col-input'md={10} sm={12}>
                                            <Input icon={<GrMail/>} defaultValue={(props.editData !== undefined && props.editData.company_website !== undefined) && props.editData.company_website} HandleChange={HandleChange} type="email" name="company_website" placeholder="Email" />
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                        </div>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',width:'50%',margin:'15px 30px'}}>
                            <button type="button" className="btn btn-light" onClick={()=>props.setchangemodel('Default-container')} style={{border:"1px solid #dee2e6",color:'#808589'}}>
                                <BiArrowBack/>Go Back
                            </button>
                        </div>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',width:'50%',margin:'15px 30px'}}>
                            <Button variant="info" onClick={props.submitdata}> Save Change </Button>
                        </div>
                    </div>
                    </Modal.Body>}
                    {changemodel==='upload-image' && 
                      <>
                      <div style={{display:'flex',justifyContent:'space-around'}}>
                          <div>
                          <p style={{marginBottom:'10px'}}>Exisiting Image</p>
                          <div style={{width:"150px",height:"150px",backgroundColor:'#f5f8fd'}}>
                            <img src={"https://ik.imagekit.io/deepraj/BussinessCard/upload/"+props.editData.company_logo } style={{width:"150px",height:"150px"}} alt="logo"/>
                          </div>
                          </div>
                          <div><p style={{marginBottom:'10px'}}>New Image</p>
                          <div style={{width:"150px",height:"150px",backgroundColor:'#f5f8fd'}}>
                              <small style={{color:'#6c757d',marginLeft:'20px'}}>No Image Selected</small>
                            <img id="output" style={{width:"150px",height:"150px",marginTop:'-20px'}} alt="logo"/>
                         </div>
                         </div>
                      </div>
                      <hr style={{width:'90%',borderTop:'1px solid #6c757d',height:'1px',marginBottom:'16px',marginTop:'16px'}}></hr>
                      <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px',marginBottom:'20px'}}>
                    <IKContext 
                        publicKey={'public_VTCu/zK1WjPazE7gk/FTltme42c='} 
                        urlEndpoint={'https://ik.imagekit.io/deepraj/'} 
                        authenticationEndpoint={prefixurl+"/image-auth"}
                    >
                        <IKUpload
                            fileName="test-upload.png"
                            folder="BussinessCard/upload/"
                            useUniqueFileName={true}
                            onError={onError}
                            onSuccess={onSuccess}
                            onChange={LoadFile}
                        />
                    </IKContext>
                      </div>
                      
                      <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',width:'50%',margin:'15px 30px'}}>
                            <button type="button" className="btn btn-light" onClick={()=>setchangemodel('default')} style={{border:"1px solid #dee2e6",color:'#808589'}}>
                                <BiArrowBack/>Go Back
                            </button>
                        </div>
                        
                    </div>
                      </> 

                      
                    }
                    
                    </>
    )
}

export default EditCompany
