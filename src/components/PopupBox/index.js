import {Popup} from 'reactjs-popup'
import {RxCross2} from 'react-icons/rx'
import {IoMdAdd} from 'react-icons/io'

const PopupBox = props => {
  const {
    details,
    onChangeText,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onClickAddItem,
    onChangeErrors,
    ds,
    errors,
  } = props
  const {status, startDate, endDate, text} = details

  const {textError, startDateError, endDateError} = errors

  const changeText = event => {
    onChangeText(event.target.value)
  }
  const changeStatus = event => {
    onChangeStatus(event.target.value)
  }
  const changeStartDate = event => {
    onChangeStartDate(event.target.value)
  }
  const changeEndDate = event => {
    onChangeEndDate(event.target.value)
  }
  const clickAddItem = event => {
    event.preventDefault()
    if (text === '' && startDate === '' && endDate === '') {
      onChangeErrors({mode: 'ALL'})
    } else if (text === '' && startDate === '') {
      onChangeErrors({mode: 'TEXTSD'})
    } else if (text === '' && endDate === '') {
      onChangeErrors({mode: 'TEXTED'})
    } else if (startDate === '' && endDate === '') {
      onChangeErrors({mode: 'SDED'})
    } else if (text === '') {
      onChangeErrors({mode: 'TEXT'})
    } else if (startDate === '') {
      onChangeErrors({mode: 'SD'})
    } else if (endDate === '') {
      onChangeErrors({mode: 'ED'})
    } else {
      onClickAddItem()
    }
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className={`${ds}`}>
          <IoMdAdd className="add-icon todo-icon" /> Add new
        </button>
      }
    >
      {close => (
        <div className="popup-container">
          <div className="pop-up-close-container">
            <h1 className="pop-up-main-title">Add new task</h1>
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
          <form onSubmit={clickAddItem} className="pop-up-form-container">
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
                  value={text}
                  onChange={changeText}
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
                    value={startDate}
                    onChange={changeStartDate}
                    id="start-date"
                    className="start-date-input-field"
                  />
                  {startDateError.length > 0 && (
                    <p className="error-msg">Please fill the start date</p>
                  )}
                </div>
                <div className="start-date-container">
                  <label className="label-style" htmlFor="end-date">
                    End date
                  </label>
                  <br />
                  <input
                    id="end-date"
                    value={endDate}
                    onChange={changeEndDate}
                    type="date"
                    className="start-date-input-field"
                  />
                  {endDateError.length > 0 && (
                    <p className="error-msg">Please fill the end date</p>
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
                  value={status}
                  onChange={changeStatus}
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
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  )
}

export default PopupBox
