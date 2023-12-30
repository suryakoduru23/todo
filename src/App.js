import {Component} from 'react'
import ToDoMainContainer from './components/ToDoMainContainer'
import ContextValue from './ContextData'

import './App.css'

const vs = JSON.parse(localStorage.getItem('listTodos'))
let modified = []
if (vs !== null) {
  modified = vs
}

class App extends Component {
  state = {todos: modified}

  addToLocalStorage = data => {
    const {todos} = this.state
    const match = todos.filter(eachTodo => eachTodo.id === data.id)
    if (match.length > 0) {
      const update = todos.map(eachUp => {
        if (eachUp.id === data.id) {
          return {...data}
        }
        return eachUp
      })
      const totalData = [...update]
      this.setState({todos: totalData})
      localStorage.setItem('listTodos', JSON.stringify(totalData))
      window.location.reload()
    } else {
      const totalData = [...todos, data]
      this.setState({todos: totalData})
      localStorage.setItem('listTodos', JSON.stringify(totalData))
    }
  }

  removeLocalStorage = () => {
    localStorage.removeItem('listTodos')
    this.setState({todos: []})
  }

  render() {
    const {todos} = this.state
    console.log(todos)
    return (
      <ContextValue.Provider
        value={{
          listOfToDos: todos,
          removeLocalStorage: this.removeLocalStorage,
          addToStorage: this.addToLocalStorage,
        }}
      >
        <ToDoMainContainer />
      </ContextValue.Provider>
    )
  }
}

export default App
