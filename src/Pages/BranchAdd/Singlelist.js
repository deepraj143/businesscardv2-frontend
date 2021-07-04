import React from 'react'
import {FiDelete} from 'react-icons/fi'
function Singlelist(props) {

    return (
        <div className='singlebranch'>
            <p>{props.name}</p>
            <FiDelete size={25} onClick={() => props.del(props.id)}/>
        </div>
    );
}
export default Singlelist;