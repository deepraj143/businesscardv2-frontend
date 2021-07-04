import React, { useContext, useEffect,useState } from 'react'
import {  Button, Col, Container, Modal, Row } from 'react-bootstrap'
import {MdLibraryAdd} from 'react-icons/md'
import {IoMdAddCircle,IoMdDownload} from 'react-icons/io'
import {ImOffice} from 'react-icons/im'
import {BiBookmarkPlus} from 'react-icons/bi'
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete,AiFillEdit,AiOutlineClose} from 'react-icons/ai'
import Add from '../../asset/ADD.png'
import adddata from '../../asset/add data.png'
import './MyCards.css'
import { Link ,useHistory} from 'react-router-dom'
import {PrefixContext} from '../../Context/PrefixContext'
import axios from 'axios';
import EditCompany from './EditCompany'
import EditEmployee from './EditEmployee'
import EditBranch from './EditBranch'
import T1 from '../Alltemp/T1/Temp1'
import T2 from  '../Alltemp/T2'
import T3 from  '../Alltemp/T3'
import T4 from  '../Alltemp/T4'
import T5 from  '../Alltemp/T5'
import T6 from  '../Alltemp/T6'
import T7 from  '../Alltemp/T7'

const MyCards = () => {

    const{prefixurl}=useContext(PrefixContext);
    const history = useHistory();
    const [noofcompany, setnoofcompany] = useState([]) 
    const [noofmycard, setnoofmycard] = useState([]) 
    const [editData, seteditData] = useState({})
    const [refresh, setrefresh] = useState(false)
    const [show, setShow] = useState(false);
    const [changemodel, setchangemodel] = useState('Default-container')
    const defaultvalidation={
        status:"",
        color:"",
    }
    const [validation,setValidation]=useState(defaultvalidation);

    const handleClose = () => setShow(false);
    const handleShow = (data) =>{setShow(true);seteditData(data)};

    const getTemplate = (templateID,payload) =>{
        let data;
        if(payload !== undefined && payload.length!==0)
        {
            data = {
                name:payload[0]['employees.employee_name'],
                dept:payload[0]['employees.employee_dept'],
                companyname:payload[0].company_name,
                address:payload[0]['branches.branch_address'],
                phonenumber:payload[0]['employees.employee_phone'],
                email:payload[0]['employees.employee_email'],
                website:payload[0].company_website,
                company_logo:payload[0].company_logo
            }
        }
        else{
            data = null;
        }
        const templates = {
            '<T3/>' : <T3 data={data}/>,
            '<T1/>' : <T1 data={data}/>,
            '<T4/>' : <T4 data={data}/>,
            '<T5/>' : <T5 data={data}/>,
            '<T6/>' : <T6 data={data}/>,
            '<T2/>' : <T2 data={data}/>,
            '<T7/>' : <T7 data={data}/>
          }
        return templates[templateID]
    }

    const download=(el)=>{
        history.push({
            pathname:"/Download/Template",
            search: '?query=abc',
            state:{data:[el]},
            state1:{data:noofcompany}
        });
    }

    const DeleteTemp=(el)=>{
        console.log(el.mycards_id)
        axios.post(prefixurl+"/deleteTemp",{id:el.mycards_id})
                .then(response=>{
                    if(response.status===200){
                        setValidation({
                            status:response.data.status,
                            color:'success',
                        })
                        setrefresh(true);
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
    }

    const Delete=(e)=>{
        let data=prompt('This Will Delete All Your Template And Details of this Company ,if u want to delete then type confirm in input feild')
        console.log(data)
        if(data === "confirm"){
            axios.post(prefixurl+"/deletecompany",{id:e.company_id})
                .then(response=>{
                    if(response.status===200){
                        setValidation({
                            status:response.data.status,
                            color:'success',
                        })
                        setrefresh(true);
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
           console.log('in else')
        }
    }

    const submitdata=()=>{
        console.log(editData)
        axios.post(prefixurl+"/editcompanydetails",editData)
            .then(response=>{
                if(response.status===200){
                    setValidation({
                        status:response.data.status,
                        color:'success',
                    })
                    setnoofcompany(response.data.message)
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }

    const getdata=()=>{
        axios.get(prefixurl+'/fetchAllCompanyname')
        .then(response => {
            if(response.status===200){
                setnoofcompany(response.data.message); 
            }
        })
        .catch(error=>{
            alert('Data Fetching Failed')
            console.log(error)
        })
    }

    const getmycards=()=>{
        axios.get(prefixurl+'/fetchAllmycards')
            .then(response => {
                if(response.status===200){
                    setnoofmycard(response.data.message)
                }
            })
            .catch(error=>{
                alert('Data Fetching Failed')
                console.log(error)
                
            })
    }
    useEffect(()=>{
        getdata();
        getmycards();
    // eslint-disable-next-line
    },[refresh,editData])

    // console.log(noofcompany)

    return (
        <>
            <Container style={{maxWidth:'90%'}}>
                <Row>
                    <Col className='mt-4 mb-3' sm={12}>
                        <div style={{display:'flex'}}><BiBookmarkPlus size={25} color={'#6ed5f5'}/><h3 style={{marginLeft:'10px',marginTop:'-5px',color:'#4b4c4e'}}>Saved<strong style={{color:'#6ed5f5'}}> Cards</strong> </h3></div>
                        <p>All your cards will be shown here.</p>
                    </Col>
                    <Col sm={12}>
                        <div className="slider">
                            {noofcompany.length===0 ? 
                            <div className="box" onClick={()=>alert('Please Fill Company Details First  ')}>
                                <img src={adddata} style={{objectFit:'contain',width:'270px',height:'120px'}} alt='temp'/>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><IoMdAddCircle/>  Add Template</div>
                            </div>
                            :<Link to='Template/add'>
                            <div className="box mt-4">
                                <img src={adddata} style={{objectFit:'contain',width:'270px',height:'120px'}} alt='temp'/>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><IoMdAddCircle/>  Add Template</div>
                            </div>
                            </Link>}
                            {noofmycard.map((el,index)=>{
                                let companyDetails = noofcompany.filter(element=>{
                                    return element.company_id===el.company_id
                                })
                                return <div className="scale-down" key={index}>
                                    {getTemplate(el['template.template_identity'],companyDetails)}
                                    <div className="Tempalte-icons"><IoMdDownload style={{backgroundColor:'#198754'}} onClick={()=> download(el) }/><AiFillDelete onClick={()=>{DeleteTemp(el)}} style={{backgroundColor:'#dc3545'}}/></div>
                                </div>
                            })}
                        </div>
                    </Col>
                    <Col className='mt-4 mb-3' sm={12} >
                        <div style={{display:'flex'}}><MdLibraryAdd size={25} color={'#6ed5f5'}/><h3 style={{marginLeft:'10px',marginTop:'-5px',color:'#4b4c4e'}}>Manage <strong style={{color:' #6ed5f5'}}> Data</strong></h3></div>
                        <p>All your Details will be shown here.</p>
                    </Col>
                    <Col sm={12} > 
                        <div className="slider">
                            <Link to='/alldetails'>
                            <div className="box">
                                <img src={Add} style={{objectFit:'contain',width:'270px',height:'120px'}} alt='temp'/>
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><IoMdAddCircle/>  Add Data</div>
                            </div>
                            </Link>
                            {noofcompany.map((e,index)=>{
                            return <div className="company-box" key={index}>
                                    <div style={{fontSize:'2rem',color:'#1bb1dc',textTransform:'capitalize'}}><ImOffice color={'#4b4c4e'}/>{e.company_name}</div>
                                    <div style={{fontSize:'1rem',color:'black'}}>{e.company_title}</div>
                                    <div className='edit-icon'><AiFillEdit style={{backgroundColor:'#198754'}} onClick={()=> handleShow(e) }/><AiFillDelete onClick={()=>{Delete(e)}} style={{backgroundColor:'#dc3545'}} /></div>
                                </div>
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal 
             size="lg"
            show={show}
            onHide={handleClose}
            dialogClassName="modal-90w"
            aria-labelledby="example-modal-sizes-title-lg" >


                {(changemodel==='Default-container') && 
                    <><Modal.Title className="mt-4 ml-4 ">Edit Details</Modal.Title>
                    <Modal.Body  className="mycard-model-body">
                        <div onClick={()=>setchangemodel('Company-container')} className="model-innerdiv" ><div><FiEdit style={{marginTop:"-8px",marginRight:"5px",color:"black"}}/>Edit CompanyDetails</div></div>
                        <div onClick={()=>setchangemodel('Branch-container')} className="model-innerdiv" ><div><FiEdit style={{marginTop:"-8px",marginRight:"5px",color:"black"}}/>Edit BranchDetails</div></div>
                        <div onClick={()=>setchangemodel('Employee-container')} className="model-innerdiv" ><div><FiEdit style={{marginTop:"-8px",marginRight:"5px",color:"black"}}/>Edit EmployeeDetails</div></div>
                    </Modal.Body>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',margin:'15px 30px'}}>
                        <Button   variant="outline-info" onClick={handleClose}>
                            <AiOutlineClose/>Close
                        </Button>
                    </div></>
                }
                {(changemodel==='Company-container') && <EditCompany editData={editData} setchangemodel={setchangemodel} seteditData={seteditData} submitdata={submitdata} validation={validation}/>}
                {(changemodel==='Branch-container') && <EditBranch editData={editData}  setchangemodel={setchangemodel}/>}
                {(changemodel==='Employee-container') && <EditEmployee editData={editData}  setchangemodel={setchangemodel} /> }
                
            </Modal>

        </>
    )
}

export default MyCards
