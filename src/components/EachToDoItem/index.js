import {Component} from 'react'

import {Popup} from 'reactjs-popup'
import {RxCross2} from 'react-icons/rx'
import ContextValue from '../../ContextData'
import './index.css'

class EachToDoItem extends Component {
  constructor(props) {
    super(props)
    const {eachItem} = this.props
    this.state = {
      status1: eachItem.status,
      text1: eachItem.text,
      startDate1: eachItem.startDate,
      endDate1: eachItem.endDate,
      items: eachItem,
      errors: {textError: '', startDateError: '', endDateError: ''},
    }
  }

  editToDo = () => {}

  changeText = event => {
    this.setState({text1: event.target.value})
  }

  changeStatus = event => {
    this.setState({status1: event.target.value})
  }

  changeStartDate = event => {
    this.setState({startDate1: event.target.value})
  }

  changeEndDate = event => {
    this.setState({endDate1: event.target.value})
  }

  render() {
    const {text1, status1, startDate1, endDate1, items, errors} = this.state
    const {textError, startDateError, endDateError} = errors
    const {text, startDate, endDate, id} = items
    return (
      <ContextValue.Consumer>
        {value => {
          const {addToStorage} = value
          const clickAddItem = event => {
            event.preventDefault()
            if (text1 === '' && startDate1 === '' && endDate1) {
              this.setState({
                errors: {
                  textError: 'error',
                  startDateError: 'error',
                  endDateError: 'error',
                },
              })
            } else if (text1 === '' && startDate1 === '') {
              this.setState({
                errors: {
                  textError: 'error',
                  startDateError: 'error',
                  endDateError: '',
                },
              })
            } else if (text1 === '' && endDate1 === '') {
              this.setState({
                errors: {
                  textError: 'error',
                  startDateError: '',
                  endDateError: 'error',
                },
              })
            } else if (startDate1 === '' && endDate1 === '') {
              this.setState({
                errors: {
                  textError: '',
                  startDateError: 'error',
                  endDateError: 'error',
                },
              })
            } else if (text1 === '') {
              this.setState({
                errors: {
                  textError: 'error',
                  startDateError: '',
                  endDateError: '',
                },
              })
            } else if (startDate1 === '') {
              this.setState({
                errors: {
                  textError: '',
                  startDateError: 'error',
                  endDateError: '',
                },
              })
            } else if (endDate1 === '') {
              this.setState({
                errors: {
                  textError: '',
                  startDateError: 'error',
                  endDateError: '',
                },
              })
            } else {
              const todo = {
                status: status1,
                id,
                endDate: endDate1,
                startDate: startDate1,
                text: text1,
              }
              this.setState({
                errors: {
                  textError: '',
                  startDateError: 'error',
                  endDateError: '',
                },
              })
              addToStorage(todo)
            }
          }

          return (
            <Popup
              modal
              trigger={
                <li className="each-list-item" onClick={this.editToDo}>
                  <h1 className="list-item-title">{text}</h1>
                  <div className="list-item-dates">
                    <div>
                      <p className="item-date-para">Start date</p>
                      <p className="each-item-date-set">{startDate}</p>
                    </div>
                    <div>
                      <p className="item-date-para">Dead line</p>
                      <p className="each-item-date-set">{endDate}</p>
                    </div>
                  </div>
                </li>
              }
            >
              {close => (
                <div className="popup-container">
                  <div className="pop-up-close-container">
                    <h1 className="pop-up-main-title">Edit Task</h1>
                    <button
                      type="button"
                      className="trigger-button"
                      aria-label="delete"
                      onClick={() => close()}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                  <hr />
                  <form
                    onSubmit={clickAddItem}
                    className="pop-up-form-container"
                  >
                    <div className="pop-up-form-inner-container">
                      <div className="pop-up-task-name-container">
                        <label className="label-style" htmlFor="text-name">
                          Name of the task
                        </label>
                        <br />
                        <input
                          type="text"
                          id="text-name"
                          placeholder="Text"
                          value={text1}
                          onChange={this.changeText}
                          className="pop-up-input-text"
                        />
                        {textError.length > 0 && (
                          <p className="error-msg">Please fill the task name</p>
                        )}
                      </div>
                      <div className="pop-up-dates-container">
                        <div className="start-date-container">
                          <label className="label-style" htmlFor="start-date">
                            Start date
                          </label>
                          <br />
                          <input
                            type="date"
                            value={startDate1}
                            onChange={this.changeStartDate}
                            id="start-date"
                            className="start-date-input-field"
                          />
                          {startDateError.length > 0 && (
                            <p className="error-msg">
                              Please fill the start date
                            </p>
                          )}
                        </div>
                        <div className="start-date-container">
                          <label className="label-style" htmlFor="end-date">
                            End date
                          </label>
                          <br />
                          <input
                            id="end-date"
                            value={endDate1}
                            onChange={this.changeEndDate}
                            type="date"
                            className="start-date-input-field"
                          />
                          {endDateError.length > 0 && (
                            <p className="error-msg">
                              Please fill the end date
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="label-style" htmlFor="status">
                          Status
                        </label>
                        <br />
                        <select
                          id="status"
                          value={status1}
                          onChange={this.changeStatus}
                          className="status-field"
                        >
                          <option value="In Progress">In Progress</option>
                          <option value="In Review">In Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <hr />
                    <div className="form-button-container">
                      <button
                        type="button"
                        onClick={() => close()}
                        className="form-each-button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="form-each-button form-each-add-button"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </Popup>
          )
        }}
      </ContextValue.Consumer>
    )
  }
}
export default EachToDoItem
