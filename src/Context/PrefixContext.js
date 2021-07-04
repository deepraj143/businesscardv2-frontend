import React, { createContext } from 'react'


export const PrefixContext=createContext(); 

const Prefixcontext = ({children}) => {
    
    const prefixurl="http://localhost:5000"
    
    return (
        <PrefixContext.Provider value={{prefixurl}}>
            {children}
        </PrefixContext.Provider>
    )
}
    
export default Prefixcontext
