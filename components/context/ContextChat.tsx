
import React, { useEffect, useState } from 'react'

export const ContextChat = React.createContext<any>({})


export default function ContextChatModels(props: any) {
  const [currentChatToken, setCurrentChatToken] = useState<any>("")
  const [updateChatListBool, setUpdateChatListBool] = useState<boolean>()
  const [isNotSupport, setIsNotSupport] = useState<boolean>(false)
  const [isNotDenied, setIsNotDenied] = useState<boolean>(false)


  return (
    <ContextChat.Provider value={{
      currentChatToken,
      setCurrentChatToken,
      updateChatListBool,
      setUpdateChatListBool,
      isNotSupport,
      setIsNotSupport,
      isNotDenied,
      setIsNotDenied
    }}>
      {props.children}
    </ContextChat.Provider>
  )
}

