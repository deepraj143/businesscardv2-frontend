import React, {  createContext, useState,useEffect } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
export const AuthContext=createContext();


const Authcontext = ({children}) => {
    const [auth,setauth]=useState(undefined);

    const setStatusLoggedIn=()=>{
        setauth(true);
    }
    const setStatusLoggedOut=()=>{
        setauth(false)  
    }
    
    const isAuthenticated=()=>{
        // axios.post("https://businesscard-generator.herokuapp.com/verify",{withCredentials: true})
        axios.post("http://localhost:5000/verify",{withCredentials: true})
        .then(response => {
            if(response.status === 200){
                console.log('User Verified')
                setStatusLoggedIn();
            }
            else{
                setStatusLoggedOut();
            }
        })
        .catch(error=>{
            console.log(error)
            setStatusLoggedOut();
            throw(error);
        })
    }

    useEffect(() => {
        isAuthenticated();
        // eslint-disable-next-line 
    },[])

    return (
       <AuthContext.Provider value={{auth,setStatusLoggedIn,setStatusLoggedOut,isAuthenticated}}>
           {children}
       </AuthContext.Provider>
    )
}

export default Authcontext