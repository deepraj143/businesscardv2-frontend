import React, { useContext, useEffect,useState } from 'react'
import { Button, Col, Container, Modal, Row ,Alert} from 'react-bootstrap'
import {FaUserAlt} from 'react-icons/fa'
import {GrMail} from 'react-icons/gr'
import {MdLocalPhone,MdEdit} from 'react-icons/md'
import {GrAdd} from 'react-icons/gr'
import {BiArrowBack} from 'react-icons/bi'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {FaAddressBook} from 'react-icons/fa'
import axios from 'axios';
import {PrefixContext} from '../../../Context/PrefixContext'
import Input from '../../../Components/Input'
import {v4 as uuid} from 'uuid'
import './EditEmployee.css'
const EditEmployee = (props) => {

    const{prefixurl}=useContext(PrefixContext);
    const [employeedata, setemployeedata] = useState([]);
    const [singleemployee, setsingleemployee] = useState({})
    const [addemployee, setaddemployee] = useState([])
    const [Allbranch, setAllbranch] = useState([])
    const [editpanel, seteditpanel] = useState('default')
    const defaultvalidation={
        status:"",
        color:"",
    }
    const [validation,setValidation]=useState(defaultvalidation);

    const changepanel=(el)=>{
        seteditpanel('editfrom');
        setsingleemployee(el);
        setValidation(defaultvalidation)
        
    }
    const HandleChange = e => {
        const newData={
            ...singleemployee
        }
        newData[e.target.name]=e.target.value;
        setsingleemployee(newData)    
        console.log(singleemployee)
    }

    const addhandlechange = e => {
        const newData={ ...addemployee}
        newData[e.target.name]=e.target.value;
        setaddemployee(newData)    
        console.log(addemployee)
    }
    const saveChange=()=>{
        console.log(singleemployee)
        axios.post(prefixurl+"/editemployeedetails",singleemployee,{params:{company_id:props.editData.company_id}})
        .then(response=>{
            if(response.status===200){
                // console.log(response.data.message)
                setValidation({
                    status:response.data.status,
                    color:'success',
                })
                setemployeedata(response.data.message)
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

    const addmoreemployee=()=>{
        const expressdata=[{...addemployee,company_id:props.editData.company_id}]
        console.log(expressdata)
        axios.post(prefixurl+"/Addsingleemployee",expressdata)
        .then(response=>{
            if(response.status===200){
                console.log(response.data)
                setValidation({
                    status:response.data.status,
                    color:'success',
                })

                // setaddemployee([]);
                setemployeedata(response.data.message)
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

    const deleteemployee=(id)=>{
        let newdata=employeedata.filter(el=>{
            return el.employee_id!==id
        })
        console.log(newdata)
        axios.post(prefixurl+"/delemployeedetails",{id:id ,company_id:props.editData.company_id})
        .then(response=>{
            if(response.status===200){
                setValidation({
                    status:response.data.status,
                    color:'success',
                })
                const data=response.data.message.map((el)=>{
                    return{
                        branch_id: el.branch_id,
                        employee_dept:el.employee_dept,
                        employee_email:el.employee_email,
                        employee_id:el.employee_id,
                        employee_name:el.employee_name,
                        employee_phone:el.employee_phone,
                        user_id:el.user_id,
                    }
                })
                setemployeedata(data);
               
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

    const getdata=()=>{
        axios.get(prefixurl+"/fetchAllemployeedetails",{params:{company_id:props.editData.company_id}})
            .then(response=>{
                const data=response.data.message.map((el)=>{
                    return{
                        branch_id: el.branch_id,
                        employee_dept:el.employee_dept,
                        employee_email:el.employee_email,
                        employee_id:el.employee_id,
                        employee_name:el.employee_name,
                        employee_phone:el.employee_phone,
                        user_id:el.user_id,
                    }
                })
                setemployeedata(data);
            })
            .catch(error=>{
                console.log(error)
            })

    } 
    const getbranch=()=>{
        axios.get(prefixurl+"/fetchAllbranchaddress",{params:{company_id:props.editData.company_id}})
            .then(response=>{
                setAllbranch(response.data.message)
            })
            .catch(error=>{
                console.log(error)
            })

    }
    useEffect(()=>{
        getdata();
        getbranch();
         // eslint-disable-next-line 
    },[])


    return (
        <>
            <Modal.Title className="mt-4 ml-4 ">Edit Details</Modal.Title>
                    {editpanel==="default" && <Modal.Body style={{display:'flex',justifyContent:'space-around'}}>
                        <div className="edit-companyname">
                            <div style={{display:'flex',flexDirection:'column' }}>
                                <div className="addemployeebox" onClick={()=>{seteditpanel('addemployee') 
                                setValidation(defaultvalidation)}}><GrAdd size={20} color={'#1bb1dc'}/>Add Employee</div>
                                <Container fluid>
                                    {employeedata.map((el,index)=>{
                                        return <Row key={index}>
                                                    <div className="noofrow">
                                                        <div className="edit-header">
                                                            <h5>{el.employee_name}</h5>
                                                            <p>({el.employee_dept})</p>
                                                        </div>
                                                        <div className="edit-icons">
                                                            <span onClick={()=>changepanel(el)}><MdEdit/></span>
                                                            <span onClick={()=>deleteemployee(el.employee_id)}><RiDeleteBin6Fill/></span>
                                                        </div>
                                                    </div>
                                                </Row>
                                    })}
                                </Container>
                            </div>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',width:'100%',margin:'20px 0px'}}>
                            <button type="button" className="btn btn-light" onClick={()=>props.setchangemodel('Default-container')} style={{border:"1px solid #dee2e6",color:'#808589'}}>
                                <BiArrowBack/>Go Back
                            </button>
                        </div>
                    </div>
                        </div>
                    </Modal.Body>
                    }
                    {editpanel ==='editfrom' &&  <Modal.Body style={{display:'flex',justifyContent:'space-around'}}>
                        <div className="edit-companyname">
                            <Alert variant={validation.color} className="mx-auto w-100">{validation.status}</Alert>
                            <div style={{display:'flex'}}>
                                <Container fluid>
                                         <Row >
                                                   <Col className='col-input1' md={12} style={{display:'inline-flex'}}>
                                                        <label>Name</label><Input icon={<FaUserAlt/>} HandleChange={HandleChange}   type="text"  defaultValue={singleemployee.employee_name} name="employee_name" placeholder="Name" />
                                                    </Col>
                                                    <Col className='col-input1' md={12} style={{display:'inline-flex'}}>
                                                        <label>Email</label><Input icon={<GrMail/>} HandleChange={HandleChange}  type="text" defaultValue={singleemployee.employee_email} name="employee_email" placeholder="Email" />
                                                    </Col>
                                                    <Col className='col-input1' md={12} style={{display:'inline-flex'}}>
                                                        <label>Department</label><Input icon={<FaAddressBook/>} HandleChange={HandleChange}  type="text" defaultValue={singleemployee.employee_dept} name="employee_dept" placeholder="Department" />
                                                    </Col>
                                                    <Col className='col-input1' md={12} style={{display:'inline-flex'}}>
                                                        <label>Contact</label><Input icon={<MdLocalPhone/>} HandleChange={HandleChange}  type="text" defaultValue={singleemployee.employee_phone} name="employee_phone" placeholder="Contact" />
                                                    </Col>
                                                    <label htmlFor="branch_id" style={{marginLeft:'15px',marginTop:'15px'}}>Choose Add:</label>
                                                    <select name="branch_id" id="branch_id" style={{width:'150px',marginLeft:'-35px',marginTop:'15px'}} onChange={e=>HandleChange(e)}>
                                                        <option value="Select One" hidden defaultSelected>--Select One--</option>
                                                        {Allbranch.map(e=>{
                                                            return <option key={uuid()} selected={(addemployee.branch_id===e.branch_id.toString())} value={e.branch_id}>{e.branch_address}</option>
                                                        })}
                                                    </select>
                                            </Row>
                                </Container>
                            </div>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',width:'50%',margin:'15px 10px'}}>
                            <button type="button" className="btn btn-light" onClick={()=>seteditpanel('default')} style={{border:"1px solid #dee2e6",color:'#808589'}}>
                                <BiArrowBack/>Go Back
                            </button>
                        </div>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',width:'50%',margin:'15px 10px'}}>
                            <Button variant="info" onClick={saveChange}> Save Change </Button>
                        </div>
                    </div> 
                        </div>
                    </Modal.Body>}

                    {editpanel ==='addemployee' &&  <Modal.Body style={{display:'flex',justifyContent:'space-around'}}>
                        <div className="edit-companyname">
                            <Alert variant={validation.color} className="mx-auto w-100">{validation.status}</Alert>
                            <div style={{display:'flex'}}>
                                <Container fluid>
                                         <Row >
                                                   <Col className='col-input1' md={12} style={{display:'inline-flex'}}>
                                                        <label>Name</label><Input icon={<FaUserAlt/>} HandleChange={addhandlechange}   type="text"   name="employee_name" placeholder="Name" />
                                                    </Col>
                                                    <Col className='col-input1' md={12} style={{display:'inline-flex'}}>
                                                        <label>Email</label><Input icon={<GrMail/>} HandleChange={addhandlechange}  type="text"  name="employee_email" placeholder="Email" />
                                                    </Col>
                                                    <Col className='col-input1' md={12} style={{display:'inline-flex'}}>
                                                        <label>Contact</label><Input icon={<MdLocalPhone/>} HandleChange={addhandlechange}  type="text"  name="employee_phone" placeholder="Contact" />
                                                    </Col>
                                                    <Col className='col-input1' md={12} style={{display:'inline-flex'}}>
                                                        <label>Department</label><Input icon={<FaAddressBook/>} HandleChange={addhandlechange}  type="text" name="employee_dept" placeholder="Department" />
                                                    </Col>
                                                    <label htmlFor="branch_id" style={{marginLeft:'15px',marginTop:'15px'}}>Choose Add:</label>
                                                    <select name="branch_id" id="branch_id" style={{width:'150px',marginLeft:'-35px',marginTop:'15px'}} onChange={e=>addhandlechange(e)}>
                                                        <option value="Select One" hidden defaultSelected>Select One</option>
                                                        {Allbranch.map(e=>{
                                                            return <option key={uuid()} selected={(addemployee.branch_id===e.branch_id.toString())} value={e.branch_id}>{e.branch_address}</option>
                                                        })}
                                                    </select>
                                            </Row>
                                </Container>
                            </div>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',width:'50%',margin:'15px 10px'}}>
                            <button type="button" className="btn btn-light" onClick={()=>seteditpanel('default')} style={{border:"1px solid #dee2e6",color:'#808589'}}>
                                <BiArrowBack/>Go Back
                            </button>
                        </div>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',width:'50%',margin:'15px 10px'}}>
                            <Button variant="info" onClick={addmoreemployee}> Save Change </Button>
                        </div>
                    </div> 
                        </div>
                    </Modal.Body>}
                     
        </>
    )
}

export default EditEmployee
