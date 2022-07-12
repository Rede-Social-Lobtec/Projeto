import { useState, createContext, useEffect } from 'react';

export const TokenContext = createContext({});

function TokenProvider({children}){
    const [token, setToken] = useState(null);

    return(
        <TokenContext.Provider value={{signed: !!token, token}}>
            {children}
        </TokenContext.Provider>
    )

}

export default TokenProvider;