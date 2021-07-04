import React,{useContext,useEffect} from 'react'
import axios from 'axios';
import {PrefixContext} from '../../Context/PrefixContext'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext';

const Logout = () => {

    let histroy = useHistory();
    const{prefixurl}=useContext(PrefixContext)
    const AuthContextData =useContext(AuthContext)

    const logout = () => {
        axios.post(prefixurl+"/logout")
        .then( res => {
            if(res.status === 200){
                AuthContextData.setStatusLoggedOut();
                histroy.push('/')
            }
        })
    }

    useEffect(
        logout,
        // eslint-disable-next-line
         [])

    return (
        <div>
            <h1>logedout successfully</h1>
        </div>
    )
}

export default Logout
