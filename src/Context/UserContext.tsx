


import { Children, createContext, useState } from "react";



export const UserContext = createContext<any>(null);


function UserContextProvider({children}: any) {

    const [fullUser, setUser]: any = useState(null);


    return (
        <UserContext.Provider value={{ fullUser, setUser }}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContextProvider;