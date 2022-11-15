import React, { useEffect, useState } from 'react'

export const ContextCategories = React.createContext<any>({})


export default function ContextCategoriesModels(props: any) {
    const [categoriesList, setCategoriesList] = useState<any>([])


    return (
        <ContextCategories.Provider value={{
            categoriesList,
            setCategoriesList,
        }}>
            {props.children}
        </ContextCategories.Provider>
    )
}