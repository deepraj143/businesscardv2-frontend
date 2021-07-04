import React from 'react'
import Singlelist from './Singlelist'

function List(props) {
    return (
        <div>
            {props.List.map((el,index) => {
                return <Singlelist key={index} id={el.id} name={el.branch_address} del={props.del} />
            })}
        </div>
    );
}
export default List;