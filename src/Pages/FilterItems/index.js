import React,{useState,useEffect,useContext} from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import Categories from './Categories'
import './FilterItems.css'
import ShowCards from './ShowCards';
import {HiTemplate} from 'react-icons/hi'
import axios from 'axios';
import {PrefixContext} from '../../Context/PrefixContext.js'

const FilterItems = (props) => {

    const{prefixurl}=useContext(PrefixContext);
    const [filterID, setfilterID] = useState(null)
    const [cards, setcards] = useState([]);
    const [categories,setcategories]=useState([]);

    const filterItems=(id)=>{
        setfilterID(id)
    }

    useEffect(() => {
        axios.get(prefixurl+'/fetchAllTemplates')
            .then(response => {
                if(response.status === 200){
                    if(response.data !== undefined)
                    {
                        setcards(response.data.templates)
                        setcategories(response.data.categories)
                    }
                }
            })
            .catch(error=>{
                alert('Data Fetching Failed')
                console.log(error)
            })
    // eslint-disable-next-line
    }, [])

    return (
        <>
            <Container className="mt-1 mb-4 ">
                <Row className="mt-3">
                    <Col >
                        {props.withRadio === false && <><div className="select-data"><HiTemplate/></div><h5 className="d-inline-block pl-3">Our Card Templates</h5></> }
                        {props.withRadio === true && <><div className="select-data"><HiTemplate/></div><h5>Select a Card Template *</h5></> }
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col sm="2">
                        <Categories categories={categories} filterItems={filterItems}/>
                    </Col>
                    <Col sm="10">  
                        <div className="section">
                            <ShowCards cards={cards} setchecktemplateHandler={props.setchecktemplateHandler} filterID={filterID} withRadio={props.withRadio}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default FilterItems
