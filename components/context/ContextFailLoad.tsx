import React, { useEffect, useState } from 'react'

export const ContextFailLoad = React.createContext<any>({})


export default function ContextFailLoadModels(props: any) {
    const [failLoad, setFailedLoad] = useState<boolean>(false)


    return (
        <ContextFailLoad.Provider value={{
            failLoad,
            setFailedLoad,
        }}>
            {props.children}
        </ContextFailLoad.Provider>
    )
}