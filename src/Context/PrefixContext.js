import React, { createContext } from 'react'


export const PrefixContext=createContext(); 

const Prefixcontext = ({children}) => {
    
    const prefixurl="https://business-card-generator.netlify.app"
    
    return (
        <PrefixContext.Provider value={{prefixurl}}>
            {children}
        </PrefixContext.Provider>
    )
}
    
export default Prefixcontext
