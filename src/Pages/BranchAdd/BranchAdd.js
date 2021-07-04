import React,{useState,useContext,useRef} from 'react'
import axios from 'axios';
import './BranchAdd.css';
import List from './List'
import {FaAddressBook,FaPlus} from 'react-icons/fa'
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5'
import Button from "../../Components/Button/index"
import { Alert } from 'react-bootstrap';
import {PrefixContext} from '../../Context/PrefixContext'



function BranchAdd(props) {

    const{prefixurl}=useContext(PrefixContext)
    const [input, setinput] = useState([])
    const defaultValidation = {
        status:'',
        color:'',
    }

    const [validation,setvalidation]=useState(defaultValidation);

    const inputref = useRef();

    const  additem=()=> {
        if (inputref.current.value.length !== 0) {
            if(props.data.company.company_id === undefined){
                props.changestate('Add-Company');
                alert('Please add a Company First')
                return;
            }
            setinput([...input, { company_id:props.data.company.company_id, id: (input[input.length - 1] !== undefined) ? input[input.length - 1].id + 1 : 1, branch_address: inputref.current.value }])
            inputref.current.value="";
        } else {
            alert('Please enter Valid Input')
        }
    }
    const del = (id) => {
        let newinput = input.filter(el => { 
            return el.id !== id;
        });
        setinput(newinput);
    }
    
    const onsubmit=()=>{
        setvalidation(defaultValidation);
        const expressdata=input;
        axios.post(prefixurl+"/addbranch",expressdata)
        .then(response => {
            if(response.status === 200){
                setvalidation({
                    status: response.data.status,
                    color: 'success'
                })
                let newData = {...props.data};
                newData.branches = response.data.message;
                props.setdata(newData)
                props.changestate('Add-employee');
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

    return (
        <form onSubmit={(e)=>e.preventDefault()}>
            <div className="Container-branch">
            <div className="branch-icons"><FaAddressBook/></div>
                <div className="branch-header">ADD BRANCHADDRESS</div>
                <Alert variant={validation.color} style={{margin:'0 50px'}}>{validation.status}</Alert>
                <div className="input-branch">
                    <input ref={inputref} type='text' placeholder="Enter Branch address " />
                </div>
                <List List={input} del={del} />
                <div className='btn-branch' >
                <Button onClick={additem} ><FaPlus size={20}/> ADD</Button>
                <Button onClick={onsubmit}  ><IoCheckmarkDoneCircleSharp size={20}/> Submit</Button>
                </div>
            </div>
        </form>
    );
}
export default BranchAdd;