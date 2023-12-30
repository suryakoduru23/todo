import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {IoMdAdd} from 'react-icons/io'
import {GrTasks} from 'react-icons/gr'
import {TbPointFilled} from 'react-icons/tb'
import ProjectButtons from '../ProjectButtons'
import EachToDoItem from '../EachToDoItem'
import PopupBox from '../PopupBox'
import ContextValue from '../../ContextData'
import './index.css'

const ProjectTypeItems = [
  {id: uuidv4(), projectType: 'Freelance Project'},
  {id: uuidv4(), projectType: 'SBI Outsource'},
  {id: uuidv4(), projectType: 'HPCL Project1'},
]

class ToDoMainContainer extends Component {
  state = {
    text: '',
    startDate: '',
    endDate: '',
    status: 'In Progress',
    errors: {textError: '', startDateError: '', endDateError: ''},
  }

  onChangeErrors = data => {
    if (data.mode === 'ALL') {
      this.setState({
        errors: {
          textError: 'error',
          startDateError: 'error',
          endDateError: 'error',
        },
      })
    } else if (data.mode === 'TEXTSD') {
      this.setState({
        errors: {textError: 'error', startDateError: 'error', endDateError: ''},
      })
    } else if (data.mode === 'TEXTED') {
      this.setState({
        errors: {textError: 'error', startDateError: '', endDateError: 'error'},
      })
    } else if (data.mode === 'SDED') {
      this.setState({
        errors: {textError: '', startDateError: 'error', endDateError: 'error'},
      })
    } else if (data.mode === 'TEXT') {
      this.setState({
        errors: {textError: 'error', startDateError: '', endDateError: ''},
      })
    } else if (data.mode === 'SD') {
      this.setState({
        errors: {textError: '', startDateError: 'error', endDateError: ''},
      })
    } else {
      this.setState({
        errors: {textError: '', startDateError: '', endDateError: 'error'},
      })
    }
  }

  onChangeText = data => {
    this.setState({text: data})
  }

  onChangeStartDate = data => {
    this.setState({startDate: data})
  }

  onChangeEndDate = data => {
    this.setState({endDate: data})
  }

  onChangeStatus = data => {
    this.setState({status: data})
  }

  onChangeEachTodo = data => {
    const {text, status, startDate, endDate} = data
    this.setState({text, status, startDate, endDate})
  }

  render() {
    const {text, startDate, endDate, status, errors} = this.state

    const details = {text, startDate, endDate, status}

    return (
      <ContextValue.Consumer>
        {value => {
          const {listOfToDos, addToStorage, removeLocalStorage} = value
          const progressItems = listOfToDos.filter(
            eachProgress => eachProgress.status === 'In Progress',
          )
          const reviewItems = listOfToDos.filter(
            eachReview => eachReview.status === 'In Review',
          )
          const completedItems = listOfToDos.filter(
            eachSuccess => eachSuccess.status === 'Completed',
          )

          const removeData = () => {
            removeLocalStorage()
          }

          const onClickAddItem = () => {
            /* datas.preventDefault() */
            const data = {id: uuidv4(), text, startDate, endDate, status}
            this.setState({
              text: '',
              startDate: '',
              endDate: '',
              status: '',
              errors: {textError: '', startDateError: '', endDateError: ''},
            })
            addToStorage(data)
          }

          return (
            <div className="main-container">
              <div className="left-main-container">
                <div className="task-heading-container-top">
                  <div className="task-heading-container">
                    <GrTasks className="icon-setting-style" />
                    <h2 className="task-board-heading-style">Task boards</h2>
                  </div>
                </div>
                <div className="left-container-buttons">
                  {ProjectTypeItems.map(eachButton => (
                    <ProjectButtons key={eachButton.id} eachItem={eachButton} />
                  ))}
                </div>
                <div className="add-new-project-container">
                  <button type="button" className="new-project-button">
                    <IoMdAdd className="add-icon" />
                    Add new Project
                  </button>
                </div>
              </div>
              <div className="right-side-main-container">
                <div className="heading-button-style-container">
                  <h2 className="task-board-heading-style">
                    Freelance Project
                  </h2>
                  <button
                    onClick={removeData}
                    className="remove-all-button-style"
                    type="button"
                  >
                    Clear All Todos
                  </button>
                </div>
                <div className="right-todo-items-container">
                  <div className="right-todo-container-list">
                    <div className="right-todo-title">
                      <TbPointFilled />
                      To Do
                    </div>
                    <ul className="right-unordered-items-container">
                      {listOfToDos.length > 0
                        ? listOfToDos.map(eachProgItem => (
                            <EachToDoItem
                              eachItem={eachProgItem}
                              key={eachProgItem.id}
                            />
                          ))
                        : null}
                      <PopupBox
                        details={details}
                        onChangeText={this.onChangeText}
                        onChangeStartDate={this.onChangeStartDate}
                        onChangeEndDate={this.onChangeEndDate}
                        onChangeStatus={this.onChangeStatus}
                        onClickAddItem={onClickAddItem}
                        onChangeErrors={this.onChangeErrors}
                        errors={errors}
                        ds="list-add-todo-button"
                      />
                    </ul>
                  </div>
                  <div className="right-progress-container-list">
                    <div className="right-todo-title progress">
                      <TbPointFilled />
                      In Progress
                    </div>
                    <ul className="right-unordered-items-container">
                      {progressItems.length > 0
                        ? progressItems.map(eachProgItem => (
                            <EachToDoItem
                              eachItem={eachProgItem}
                              key={eachProgItem.id}
                              onChangeEachTodo={this.onChangeEachTodo}
                            />
                          ))
                        : null}

                      <PopupBox
                        details={details}
                        onChangeText={this.onChangeText}
                        onChangeStartDate={this.onChangeStartDate}
                        onChangeEndDate={this.onChangeEndDate}
                        onChangeStatus={this.onChangeStatus}
                        onClickAddItem={onClickAddItem}
                        onChangeErrors={this.onChangeErrors}
                        ds="list-add-progress-button"
                        errors={errors}
                      />
                    </ul>
                  </div>
                  <div className="right-review-container-list">
                    <div className="right-todo-title review">
                      <TbPointFilled />
                      Review
                    </div>
                    <ul className="right-unordered-items-container">
                      {reviewItems.length > 0
                        ? reviewItems.map(eachProgItem => (
                            <EachToDoItem
                              eachItem={eachProgItem}
                              key={eachProgItem.id}
                              onChangeEachTodo={this.onChangeEachTodo}
                            />
                          ))
                        : null}

                      <PopupBox
                        details={details}
                        onChangeText={this.onChangeText}
                        onChangeStartDate={this.onChangeStartDate}
                        onChangeEndDate={this.onChangeEndDate}
                        onChangeStatus={this.onChangeStatus}
                        onClickAddItem={onClickAddItem}
                        onChangeErrors={this.onChangeErrors}
                        ds="list-add-review-button"
                        errors={errors}
                      />
                    </ul>
                  </div>
                  <div className="right-success-container-list">
                    <div className="right-todo-title success">
                      <TbPointFilled />
                      Completed
                    </div>
                    <ul className="right-unordered-items-container">
                      {completedItems.length > 0
                        ? completedItems.map(eachProgItem => (
                            <EachToDoItem
                              eachItem={eachProgItem}
                              key={eachProgItem.id}
                              onChangeEachTodo={this.onChangeEachTodo}
                            />
                          ))
                        : null}
                      <PopupBox
                        details={details}
                        onChangeText={this.onChangeText}
                        onChangeStartDate={this.onChangeStartDate}
                        onChangeEndDate={this.onChangeEndDate}
                        onChangeStatus={this.onChangeStatus}
                        onClickAddItem={onClickAddItem}
                        onChangeErrors={this.onChangeErrors}
                        ds="list-add-complete-button"
                        errors={errors}
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ContextValue.Consumer>
    )
  }
}
export default ToDoMainContainer
