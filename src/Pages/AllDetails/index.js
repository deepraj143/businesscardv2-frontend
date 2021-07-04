import React, {  useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import AddCompany from '../Company name/CompanyName';
import AddBracnch from '../BranchAdd/BranchAdd'
import Addemployee from '../Addpersondetails/index'
import './AllDetails.css'
const AllDetails = () => {


    const [viewstate,setviewState]=useState('Add-Company');
    const [data, setdata] = useState({
        company:{},
        branches:[],
        employees:[]
    })
    const changestate=(e)=>{
        setviewState(e)
    }
    return (
        <Container style={{backgroundColor:'#e1ebfc',height:'85vh'}}>
            <Row>
                <Col sm={12}>
                    <div className={((viewstate==='Add-employee') ? 'alldetails2':'alldetails1')} >
                     {viewstate==='Add-Company' && <AddCompany  setdata={setdata} data={data} changestate={changestate}/>}
                     {viewstate==='Add-Branch' && <AddBracnch setdata={setdata} data={data} changestate={changestate}/>}
                     {viewstate==='Add-employee' && <Addemployee setdata={setdata} data={data} changestate={changestate}/>}
                    </div>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    )
}
export default AllDetails
