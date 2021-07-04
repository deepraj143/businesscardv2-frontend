import React,{useState,useContext,useEffect} from 'react'
import { useLocation} from 'react-router-dom'
import {Col, Container, Row } from 'react-bootstrap'
// import Button from '../../Components/Button/index'
import {Button} from 'react-bootstrap'
import {AiOutlineDownload} from 'react-icons/ai'
import T1 from '../Alltemp/T1/Temp1'
import T2 from  '../Alltemp/T2'
import T3 from  '../Alltemp/T3'
import T4 from  '../Alltemp/T4'
import T5 from  '../Alltemp/T5'
import T6 from  '../Alltemp/T6'
import T7 from  '../Alltemp/T7'
import './DownloadTemplate.css'
import {PrefixContext} from '../../Context/PrefixContext'
import axios from 'axios'
var htmlToImage = require('html-to-image');

const DownloadTemplate = () => {
    const location = useLocation();
    const{prefixurl}=useContext(PrefixContext);
    const [noofemployee, setnoofemployee] = useState([])
    const [selectedEmployees, setselectedEmployees] = useState([])
    const [download, setdownload] = useState(false)
    const [selectedDownload, setselectedDownload] = useState()
    const [pointer, setpointer] = useState(0)
    // console.log(location.state.data[0].company_id)
    const [checkedState, setCheckedState] = useState();

    const getTemplate = (templateID,payload,noofemployee) =>{
        let data;
        if(payload !== undefined && payload.length!== 0 && noofemployee[pointer] !== undefined)
        {
            data = {
                name:noofemployee[pointer]['employee_name'],
                dept:noofemployee[pointer]['employee_dept'],
                email:noofemployee[pointer]['employee_email'],
                phonenumber:noofemployee[pointer]['employee_phone'],
                address:payload[0]['branches.branch_address'],
                companyname:payload[0].company_name,
                website:payload[0].company_website,
                company_logo:payload[0].company_logo

            }
        }
        else{
            data = null;
        }
        
        const templates = {
            '<T3/>' : <T3 data={data} DownloadID={'downloadTemplateOne'} DownloadIDback={'downloadback'} StopRotate={"stoprotate"}/>,
            '<T1/>' : <T1 data={data} DownloadID={'downloadTemplateOne'} DownloadIDback={'downloadback'} StopRotate={"stoprotate"}/>,
            '<T4/>' : <T4 data={data} DownloadID={'downloadTemplateOne'} DownloadIDback={'downloadback'} StopRotate={"stoprotate"}/>,
            '<T5/>' : <T5 data={data} DownloadID={'downloadTemplateOne'} DownloadIDback={'downloadback'} StopRotate={"stoprotate"}/>,
            '<T6/>' : <T6 data={data} DownloadID={'downloadTemplateOne'} DownloadIDback={'downloadback'} StopRotate={"stoprotate"}/>,
            '<T2/>' : <T2 data={data} DownloadID={'downloadTemplateOne'} DownloadIDback={'downloadback'} StopRotate={"stoprotate"}/>,
            '<T7/>' : <T7 data={data} DownloadID={'downloadTemplateOne'} DownloadIDback={'downloadback'} StopRotate={"stoprotate"}/>
        }
        return templates[templateID]
    }

    const handleOnChange = (el,position) => {
        const updatedCheckedState = checkedState.map((item, index) =>{
        //   index === position ? !item : item
            if(index === position){
                 var idcheck= selectedEmployees;
                 if(idcheck.includes(el.employee_id)){
                     idcheck=idcheck.filter(e=>e!==el.employee_id)
                 }else{
                     idcheck.push(el.employee_id)
                 }
                 setselectedEmployees(idcheck);
                 return !item
            }else{
                return item
            }
        });
      
        setCheckedState(updatedCheckedState);
    }

    const downloadNow=()=>{
        if(download === true){
            if(pointer===0){
                let node = document.getElementById('downloadback');
                htmlToImage.toPng(node)
                .then(function (dataUrl) {  
                    var img = new Image();  
                    img.src = dataUrl;
                    var a = document.createElement("a");
                    a.href = dataUrl;
                    a.setAttribute("download", 'Business Card Back');    
                    a.click();})
            }
            if(pointer < noofemployee.length){
                var node = document.getElementById('downloadTemplateOne');
                htmlToImage.toPng(node)
                .then(function (dataUrl) {  
                    var img = new Image();
                    img.src = dataUrl;
                    var a = document.createElement("a");
                    a.href = dataUrl;
                    a.setAttribute("download", 'Business Card');    
                    a.click();
                    if(pointer < noofemployee.length-1){
                        let newpointer = pointer;
                        newpointer++;
                        setpointer(newpointer)
                    }
                    else{
                        setdownload(false)
                        setpointer(0)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    alert('oops, something went wrong!');
                });
            }
        }
    }

    const selectedDownloadNow=()=>{
        if(selectedDownload === true){
            if(pointer===0){
                let node = document.getElementById('downloadback');
                htmlToImage.toPng(node)
                .then(function (dataUrl) {  
                    var img = new Image();  
                    img.src = dataUrl;
                    var a = document.createElement("a");
                    a.href = dataUrl;
                    a.setAttribute("download", 'Business Card Back');    
                    a.click();})
            }
            if(pointer < noofemployee.length){
                if(noofemployee[pointer] !== undefined && selectedEmployees.includes(noofemployee[pointer].employee_id)){
                    var node = document.getElementById('downloadTemplateOne');
                    htmlToImage.toPng(node)
                    .then(function (dataUrl) {  
                        var img = new Image();
                        img.src = dataUrl;
                        var a = document.createElement("a");
                        a.href = dataUrl;
                        a.setAttribute("download", 'Business Card');    
                        a.click();
                        if(pointer < noofemployee.length){
                            let newpointer = pointer;
                            newpointer++;
                            setpointer(newpointer)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                        alert('oops, something went wrong!');
                    });
                }
                else{
                    let newpointer = pointer;
                    newpointer++;
                    setpointer(newpointer)
                }
            }
            else{
                setselectedDownload(false)
                setpointer(0)
            }
        }    
    }

    const getEmployee=()=>{
        axios.get(prefixurl+"/fetchAllemployeedetails",{params:{company_id:location.state.data[pointer].company_id}})
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
                        select:false
                    }
                })
                setnoofemployee(data);
                setCheckedState(new Array(data.length).fill(false))
            })
            .catch(error=>{
                console.log(error)
            })
    }


    useEffect(() => {
        getEmployee();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        downloadNow();
        // eslint-disable-next-line
    },[download])

    useEffect(() => {
        selectedDownloadNow();
        // eslint-disable-next-line
    },[selectedDownload])
    
    useEffect(() => {
        if(download === true){
            downloadNow();
        }
        if(selectedDownload === true){
            selectedDownloadNow();
        }
    // eslint-disable-next-line
    },[pointer])

  
    return (
        <>  
            <Container className="Download-container">
                <Row style={{height:'inherit'}}>
                    <Col className="Download-container-innerdiv">
                        <div className="template-img-container">
                            {location.state.data.map((el,index)=>{
                                let companyDetails = location.state1.data.filter(element=>{
                                    return element.company_id===el.company_id
                                })
                                return <div className="scale-down-download" key={index}>
                                    {getTemplate(el['template.template_identity'],companyDetails,noofemployee)}
                                </div>
                            })}
                        </div>
                    </Col>
                    <Col md={7} className="Download-container-innerdiv"> 
                    <div class="container ml-5 list-cont " >
                        <h2>Select To Download </h2>
                            {/* <label class="customcheck">One
                            <p>(Fullstack)</p>
                            <input type="checkbox" checked="checked"/>
                            <span class="checkmark"></span>
                            </label> */}
                            {noofemployee.map((el,index)=>{
                                 return <label key={index} class="customcheck">{el.employee_name}
                                            <p>({el.employee_dept})</p>
                                            <input type="checkbox" onChange={() => handleOnChange(el,index)}/>
                                            <span class="checkmark"></span>
                                        </label>
                            })}
                            
                    </div>
                        <div className="text-center download-btn">
                            <Button className="mx-3 btn--primary" onClick={(e)=>{setdownload(true)}}><AiOutlineDownload/>Download All</Button>
                            <Button className="mx-3 btn--primary" onClick={(e)=>{setselectedDownload(true)}}><AiOutlineDownload/>Download Selected</Button>
                        </div>
                    </Col>
                    
                </Row>
            </Container>
                            
        </>
    )
}

export default DownloadTemplate
