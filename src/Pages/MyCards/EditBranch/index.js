import React, { useContext, useEffect,useState } from 'react'
import { Alert, Button, Col, Container, Modal, Row } from 'react-bootstrap'
import {BiArrowBack} from 'react-icons/bi'
import {FaAddressBook} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {GrAdd} from 'react-icons/gr'
import axios from 'axios';
import {PrefixContext} from '../../../Context/PrefixContext'
import Input from '../../../Components/Input'
import './EditBranch.css'

const EditBranch = (props) => {

    const{prefixurl}=useContext(PrefixContext);
    const [branchdata, setbranchdata] = useState([])
    const [editpanel, seteditpanel] = useState('default')
    const [singleemployee, setsingleemployee] = useState({})
    const [singleaddbranch, setsingleaddbranch] = useState({})
    const defaultvalidation={
        status:"",
        color:"",
    }
    const [validation,setValidation]=useState(defaultvalidation);

    const changepanel=(el)=>{
        seteditpanel('editform');
        setValidation(defaultvalidation);
        setsingleemployee(el);
        
    }
    const HandleChange = (e,index) => {
        const newData={
            ...singleemployee
        }
        newData[e.target.name]=e.target.value;
        setsingleemployee(newData)    
    }
    const HandleChange1 = (e,index) => {
        const newData={
            ...singleaddbranch
        }
        newData[e.target.name]=e.target.value;
        setsingleaddbranch(newData)    
        console.log(singleaddbranch)   
    }

    const saveChange=()=>{
        const expressdata=singleemployee
        axios.post(prefixurl+"/editbranchaddress",expressdata)
        .then(response=>{
            if(response.status === 200){
                setValidation({
                    status:response.data.status,
                    color:'success',
                })
               setbranchdata(response.data.message)
            }else{
                setValidation({
                    status:response.data.status,
                    color:'danger',
                })
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const addbranch=()=>{
        const  expressdata=[{...singleaddbranch,company_id:branchdata[0].company_id,user_id:branchdata[0].user_id}]
        axios.post(prefixurl+"/addbranch",expressdata)
        .then(response => {
            if(response.status === 200){
                // setvalidation({
                //     status: response.data.status,
                //     color: 'success'
                // })
                setbranchdata(response.data.message)
            }
        })
        .catch(error=>{
            if (error.response !== undefined && error.response.data!== undefined && error.response.data.message!== undefined){
                
                // setvalidation({
                //     status: error.response.data.status,
                //     color: 'danger',
                    
                // })
            }
            else{
                // setvalidation({
                //     status: error.message,
                //     color: 'danger',
                    
                // })
            }
            throw(error);
        })
    }
    

    const deleteemployee=(id)=>{
        let chechk=branchdata.map((el)=>{
                return el.branch_id
        })
        if(chechk.includes(id)){
            alert('Please First Delete Employee Details in Which This Brach Address Added!!!')
        }else{
            axios.post(prefixurl+"/delbranch",{id:id},{params:{company_id:props.editData.company_id}})
                .then(response=>{
                    if(response.status===200){
                        setValidation({
                            status:response.data.status,
                            color:'success',
                        })
                        const data=response.data.message.map((el)=>{
                            return{
                                branch_id: el.branch_id,
                                branch_address:el.branch_address,
                                company_id:el.company_id,
                                user_id:el.user_id,
                            }
                        })
                        setbranchdata(data);
                    
                    }else{
                        setValidation({
                            status:response.data.status,
                            color:'danger',
                        })
                    }
        })
        .catch(error=>{
            console.log(error)
        })
        }
        
    }

    const getdata=()=>{
        axios.get(prefixurl+"/fetchAllbranchaddress",{params:{company_id:props.editData.company_id}})
            .then(response=>{
                const data=response.data.message.map((el)=>{
                    return{
                        branch_address: el.branch_address,
                        branch_id:el.branch_id,
                        company_id:el.company_id,
                        user_id:el.user_id,
                    }
                })
                setbranchdata(data);
            })
            .catch(error=>{
                console.log(error)
            })

    } 

  

    useEffect(()=>{
        getdata();
        // eslint-disable-next-line
    },[])

    console.log(branchdata)

    return (
       <> 
        <Modal.Title className="m-4 ">Edit BranchDetails</Modal.Title>
       
        {editpanel==="default" && <Modal.Body style={{display:'flex',justifyContent:'space-around',flexDirection:'column'}}>
            <div className="addbranch" onClick={()=>seteditpanel('addbranch')}><GrAdd size={20} color={'#1bb1dc'}/>Add Employee</div>
            <div className="edit-companyname">
                <div style={{display:'flex',flexDirection:'column'}}>
                    <Container fluid>
                        {branchdata.map((el,index)=>{
                        return <Row key={index}>
                                <Col>
                                   <div className="noofadd">
                                        <div className="branch-box">
                                            <h5>{el.branch_address}</h5>
                                        </div>
                                        <div className="edit-icons-branch">
                                        <span onClick={()=>changepanel(el)}><MdEdit/></span>
                                        <span onClick={()=>deleteemployee(el.branch_id)}><RiDeleteBin6Fill/></span>
                                        </div>
                                   </div>
                                </Col>
                            </Row>
                        })}
                    </Container>
                </div>
            </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',width:'50%',margin:'15px 30px'}}>
                <button type="button" className="btn btn-light" onClick={()=>props.setchangemodel('Default-container')} style={{border:"1px solid #dee2e6",color:'#808589'}}>
                    <BiArrowBack/>Go Back
                </button>
            </div>
        </div> 
        </Modal.Body>
        }
        {editpanel==="editform" && <Modal.Body style={{display:'flex',justifyContent:'space-around',flexDirection:'column'}}>
        <Alert variant={validation.color} className="mx-auto w-75 ">{validation.status}</Alert>
            <div className="edit-companyname">
                <div style={{display:'flex'}}>
                    <Container fluid>
                         <Row>
                                <Col>
                                    <div style={{display:"flex",alignItems:'center'}}>
                                        <div className="edit-company-label">
                                            <label style={{fontSize:'5rem'}}>Address</label>
                                        </div>  
                                        <Input icon={<FaAddressBook/>} HandleChange={HandleChange}  type="text" defaultValue={singleemployee.branch_address} name="branch_address" placeholder="Address" />
                                        {/* <Input icon={<FaAddressBook/>} refvalue={(el) => (inputfield.current[index] = el)} type="text" defaultValue={el.branch_address} name="branch_address" placeholder="Address" /> */}
                                    </div>
                                </Col>
                            </Row>
                    </Container>
                </div>
            </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',width:'50%',margin:'15px 30px'}}>
                <button type="button" className="btn btn-light" onClick={()=>seteditpanel('default')} style={{border:"1px solid #dee2e6",color:'#808589'}}>
                    <BiArrowBack/>Go Back
                </button>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',width:'50%',margin:'15px 30px'}}>
                <Button variant="info" onClick={saveChange}> Save Change </Button>
            </div>
        </div> 
        </Modal.Body>}
        {editpanel==="addbranch" && <Modal.Body style={{display:'flex',justifyContent:'space-around',flexDirection:'column'}}>
        <Alert variant={validation.color} className="mx-auto w-75 ">{validation.status}</Alert>
            <div className="edit-companyname">
                <div style={{display:'flex'}}>
                    <Container fluid>
                         <Row>
                                <Col>
                                    <div style={{display:"flex",alignItems:'center'}}>
                                        <div className="edit-company-label">
                                            <label style={{fontSize:'5rem'}}>Address</label>
                                        </div>  
                                        <Input icon={<FaAddressBook/>}  HandleChange={HandleChange1}   type="text"  name="branch_address" placeholder="Address" />
                                    </div>
                                </Col>
                            </Row>
                    </Container>
                </div>
            </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',width:'50%',margin:'15px 30px'}}>
                <button type="button" className="btn btn-light" onClick={()=>seteditpanel('default')} style={{border:"1px solid #dee2e6",color:'#808589'}}>
                    <BiArrowBack/>Go Back
                </button>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',width:'50%',margin:'15px 30px'}}>
                <Button variant="info" onClick={addbranch}> Save Change </Button>
            </div>
        </div> 
        </Modal.Body>}
        </>
    )
}

export default EditBranch
