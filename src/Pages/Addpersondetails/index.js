import React, { useState,useContext,useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import {AiOutlineDoubleRight,AiOutlineUserAdd} from 'react-icons/ai'
import {FaPlus} from 'react-icons/fa'
import {FiDelete} from 'react-icons/fi'
import { Container,Row,Col,Alert} from 'react-bootstrap'
import Button from '../../Components/Button'
import './Addpersondetails.css'
import {PrefixContext} from '../../Context/PrefixContext'
import axios from 'axios'
import Input from '../../Components/Input'
import { HiOutlineMail } from 'react-icons/hi'
import { MdLocalPhone } from 'react-icons/md'
import { FaAddressBook } from 'react-icons/fa'
import { IoIosPersonAdd } from 'react-icons/io'
import {v4 as uuid} from 'uuid'
const Addpersondetails = (props) => {
    const{prefixurl}=useContext(PrefixContext)
    const history = useHistory();
    const usertemplate={company_id:props.data.company.company_id,id:1,name:"",email:"",phonenumber:"",department:""};
    const [person,setperosn]=useState([usertemplate]);
    const [items, setitems] = useState([])
    const defaultValidation={
        status:"",
        color:"",
        message:{
            name:"",
            email:"",
            phonenumber:"",
            department:"",
        }
    }
    const [validation,setvalidation]=useState(defaultValidation);
    //////////Addperson///////////
   const addperson=()=>{
       console.log(person)
       if(person[person.length-1].name!==""){
        setperosn([...person,{company_id:props.data.company.company_id,id:(person[person.length-1]!==undefined)?person[person.length-1].id+1:1,name:"",email:"",phonenumber:"",department:""}])
       }else{
           alert("plzz fill the form first")
       }
        
   }

   //////////Delperson///////////
   const delperson=(index)=>{
      let filters=[...person];
      filters.splice(index,1);
      setperosn(filters)
   }

   //////////setperson///////////
   const onDropdownchange=(e,index)=>{
        let newUser = JSON.parse(JSON.stringify(person))
        let updatedUser = newUser.map((el,mapIndex)=>{
            if(mapIndex === index)
            {
                let newEl = {...el};
                newEl.branch_id = e.target.value;
                return newEl;
            }
            else{
                return el;
            }
        })
        setperosn(updatedUser);
   }

   const onchange=(e,index)=>{
    const updateuser=person.map((person,i)=>index === i ? Object.assign(person,{[e.target.name]:e.target.value}):person);
    setperosn(updateuser);
   }

   //////////Server-side///////////
   const submitHandler=(e)=>{
       e.preventDefault();
       setvalidation(defaultValidation);
       const expressdata=person;
       console.log(expressdata)
       axios.post(prefixurl+"/Addemployee",expressdata)
       .then(response => {
            if(response.status===200){
                console.log(response.data)
                setvalidation({
                    status:response.data.status,
                    color:"success",
                    message:{
                        name:null,
                        email:null,
                        phonenumber:null,
                        department:null,
                    }
                })
                history.push("/card");
            }
       })
       .catch(error => {
           console.log(error)
        const errorDetails=[];
        if (error.response !== undefined && error.response.data!== undefined && error.response.data.message!== undefined){ 
            error.response.data.message.forEach((e,index)=>{
                // errorDetails[e.param]=e.msg;
        })
        setvalidation({
            status:error.response.data.status,
            color:"danger",
            message:{
                name:(errorDetails.name!==undefined)?errorDetails.name:null,
                email:(errorDetails.email !== undefined)? errorDetails.email :null,
                phonenumber:(errorDetails.phonenumber !== undefined)? errorDetails.phonenumber :null,
                department:(errorDetails.department!==undefined)?errorDetails.department:null,

            }
        })
    }else{
        setvalidation({
            status:error.message,
            color:"danger",
            message:{
                name:null,
                email:null,
                phonenumber:null,
                department:null,
            }
        })
    }
    throw(error)
})
}
    // const getData=()=>{
    //     axios.get(prefixurl+'/branchaddfetch',{withCredentials: true})
    //     .then(response => {
    //     if(response.status===200){
    //         item=response.data.message;
    //         console.log(item)
    //     }
    // })
    // }

    useEffect(() => {
        if(props.data.branches !== undefined)
            setitems(props.data.branches)
        else
            props.changestate('Add-Branch')
    }
    // eslint-disable-next-line 
    ,[])
    console.log(person)
    return (
        <>
            <Container className="container-head mt-5">
                <Row>
                    <Col className=" d-flex justify-content-center">< AiOutlineUserAdd  size={34}/><h3>ADD DETAILS</h3></Col>
                </Row>
            </Container>
            <Container className="container-add">
            <Alert variant={validation.color} className="mx-auto w-75 ">{validation.status}</Alert>
                <form onSubmit={submitHandler}>
                {person.map((person,index)=>{
                    return(<Row key={index}>
                        <Col className="input">
                            <div style={{display:"flex",flexWrap:'wrap',width:"100%"}}>
                                <Input defaultValue={person.name} icon={<IoIosPersonAdd/>} HandleChange={e=>onchange(e,index)} ErrorMessage={validation.message.name} type="text" name="name" placeholder="Name" />
                                <Input defaultValue={person.email} icon={<HiOutlineMail/>} HandleChange={e=>onchange(e,index)} ErrorMessage={validation.message.email} type="text" name="email" placeholder="email" />
                                <Input defaultValue={person.phonenumber} icon={<MdLocalPhone/>} HandleChange={e=>onchange(e,index)} ErrorMessage={validation.message.phonenumber} type="text" name="phonenumber" placeholder="Contact" />
                                <Input defaultValue={person.department} icon={<FaAddressBook/>} HandleChange={e=>onchange(e,index)} ErrorMessage={validation.message.department} type="text" name="department" placeholder="Department" />
                                <label htmlFor="branch_id">Choose Add:</label>
                                    <select name="branch_id" id="branch_id" onChange={e=>onDropdownchange(e,index)}>
                                        <option value="Select One" hidden defaultSelected>Select One</option>
                                        {items.map(e=>{
                                            return <option key={uuid()} selected={(person.branch_id === e.branch_id.toString())} value={e.branch_id}>{e.branch_address}</option>
                                        })}
                                    </select>
                                <FiDelete onClick={()=>delperson(index)} className="icon" size={32} onChange={e=>onchange(e,index)} />
                            </div>
                        </Col>    
                    </Row>)
                })}
                </form>
                <Button className="bt" onClick={addperson}><FaPlus size={20}/>  Add more</Button>
                <Button onClick={submitHandler}> Submit<AiOutlineDoubleRight size={20}/></Button>
            </Container>
            

        </>
    )
}
export default Addpersondetails;

