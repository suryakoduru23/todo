import React from 'react'

const ContextValue = React.createContext({
  listOfToDos: [],
  addToStorage: () => {},
  removeLocalStorage: () => {},
})

export default ContextValue
