import { useState, createContext, useEffect } from 'react';

export const TokenContext = createContext({});

function TokenProvider({children}){
    const [token, setToken] = useState(null);

    useEffect (()=>{
        var tokenUser = localStorage.getItem('token');

        if(tokenUser){
            setToken(tokenUser);
        }
    }, [])

    return(
        <TokenContext.Provider value={{signed: !!token, token}}>
            {children}
        </TokenContext.Provider>
    )

}

export default TokenProvider;