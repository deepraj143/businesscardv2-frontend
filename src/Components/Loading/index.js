import React from 'react'
import LoadingImg from '../../asset/loading.gif'
import './Loading.css'
const index = () => {
    return (
        <>
           <div className="img-Conatiner">
                <img src={LoadingImg} alt="img"/>
                <h2>Loading.....</h2>
            </div> 
        </>
    )
}

export default index
