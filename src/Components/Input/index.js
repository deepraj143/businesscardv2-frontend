import React from 'react'
import './Input.css';

const Input =({icon, type, name, placeholder,HandleChange,ErrorMessage,defaultValue,refvalue }) => {
    return (
        <>
            <div className="input-fleid">
                <div>{icon}</div> <input onChange={HandleChange} defaultValue={defaultValue} ref={refvalue} type={type} placeholder={placeholder} name={name} />
                <p style={{textAlign:"start",color:"red",paddingLeft:"40px",fontSize:"11px"}}>{ErrorMessage}</p>
            </div>
        </>
    )
}

export default Input        
