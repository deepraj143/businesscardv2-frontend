import React, { useContext, useEffect,useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import {AiFillSetting} from 'react-icons/ai'
import {PrefixContext} from '../../Context/PrefixContext'
import Button from '../../Components/Button'
import axios from 'axios';
import './Addtemplate.css'
import FilterItems from '../FilterItems/index.js';

const Addtemplate = () => {

    const{prefixurl}=useContext(PrefixContext);
    const history = useHistory();
    const [noofcompany, setnoofcompany] = useState([]) 
    const [check, setcheck] = useState({company_id:''})
    const [checktemplate, setchecktemplate] = useState({template_id:0})

    const HandleChange = e => {
       setcheck({company_id:e.company_id})
    }
    const setchecktemplateHandler = (value) =>{
        setchecktemplate({template_id:value}) 
    }

     const submit=()=>{
        const expressdata={...check,...checktemplate}
        axios.post(prefixurl+"/addmycard",expressdata)
            .then(response=>{
                if(response.status===200){
                    history.push("/card");
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
                const item=response.data.message.map((el)=>{
                return {
                    company_id: el.company_id,
                    company_name:el.company_name,
                    company_title:el.company_title,
                    company_website:el.company_website,
                    user_id:el.user_id
                }
                })
                setnoofcompany(item); 
            }
        })
        .catch(error=>{
            alert('Data Fetching Failed')
            console.log(error)
            
        })
    }

    useEffect(()=>{
        getdata();
    // eslint-disable-next-line
    },[])

    return (
        <>
              <Row>
                  <Col sm={12} className="data-col">
                    <Container className="mt-3">
                        <div className="select-data"><AiFillSetting/></div><h5>Select Company Data *</h5>
                        <Row>
                            <Col lg={3} md={4} sm={10}>
                                <div className="select-anyone">Select Anyone:</div> 
                            </Col>
                            <Col lg={9} md={8} sm={10}>
                                <div className='mt-3 radio-container'>
                                    {noofcompany.map((el,index)=>{
                                        return <div>
                                            <div className="from-check" key={index}>
                                                <input required type='radio' checked={check.company_id===el.company_id}  onChange={()=>HandleChange(el)} name={el.company_name}  value={el.company_name} className="radio-check-input"/><label htmlFor="">{el.company_name}</label>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </Container> 
                  </Col>
                   <Col sm={12} className="data-col mt-3">
                        <FilterItems withRadio={true} setchecktemplateHandler={setchecktemplateHandler}/>
                   </Col>
                  
                    <Col sm={12} style={{display:'flex',justifyContent:'center'}}>
                        <Button buttonStyle="btn--primary" buttonSize="btn--medium" onClick={submit}>Submit</Button>
                    </Col>
              </Row>
        </>
    )
}

export default Addtemplate
