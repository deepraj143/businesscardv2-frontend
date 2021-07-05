import React, { createContext } from 'react'


export const PrefixContext=createContext(); 

const Prefixcontext = ({children}) => {
    
    const prefixurl="https://businesscard-generator.herokuapp.com"
    
    return (
        <PrefixContext.Provider value={{prefixurl}}>
            {children}
        </PrefixContext.Provider>
    )
}
    
export default Prefixcontext
