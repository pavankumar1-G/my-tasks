import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here

const TaskItem = props => {
  const {taskDetails} = props
  const {task, tagId} = taskDetails
  const text = tagsList.find(each => each.optionId === tagId)
  return (
    <li className="task-item">
      <p className="task-title">{task}</p>
      <p className="tag-category">{text.displayText}</p>
    </li>
  )
}

class App extends Component {
  state = {
    userTaskInput: '',
    taskList: [],
    tagId: tagsList[0].optionId,
    activeTag: 'initial',
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {userTaskInput, tagId} = this.state
    if (userTaskInput.length !== 0) {
      const createAtask = {
        id: v4(),
        task: userTaskInput,
        tagId,
      }

      this.setState(prev => ({
        taskList: [...prev.taskList, createAtask],
        userTaskInput: '',
        tagId: tagsList[0].optionId,
      }))
    }
  }

  onClickTagBtn = event => {
    this.setState(prev => ({
      activeTag:
        prev.activeTag === event.target.value ? 'initial' : event.target.value,
    }))
  }

  onChangeTaskInput = event => {
    this.setState({userTaskInput: event.target.value})
  }

  onChangeTagOption = event => {
    this.setState({tagId: event.target.value})
  }

  render() {
    const {userTaskInput, taskList, tagId, activeTag} = this.state
    const filteredTaskList =
      activeTag === 'initial'
        ? taskList
        : taskList.filter(eachTag => eachTag.tagId === activeTag)

    return (
      <div className="my-tasks-container">
        <div className="creating-tasks-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="task-heading">Create a task!</h1>
            <label className="label" htmlFor="task">
              Task
            </label>
            <input
              className="input-text"
              type="text"
              placeholder="Enter the task here"
              onChange={this.onChangeTaskInput}
              value={userTaskInput}
              id="task"
            />
            <br />
            <label className="label" htmlFor="tags">
              Tags
            </label>

            <select
              className="tags-options"
              id="tags"
              onChange={this.onChangeTagOption}
              value={tagId}
            >
              {tagsList.map(eachTag => (
                <option value={eachTag.optionId} key={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <br />
            <div className="button-container">
              <button type="submit" className="add-task-btn">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="tags-and-tasks-list-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => {
              const isActive = eachTag.optionId === activeTag
              const buttonClassName = isActive ? 'active-btn' : 'tag-button'
              return (
                <li key={eachTag.optionId} className="tag-item">
                  <button
                    type="button"
                    value={eachTag.optionId}
                    onClick={this.onClickTagBtn}
                    className={buttonClassName}
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              )
            })}
          </ul>

          <h1 className="tasks-heading">Tasks</h1>

          <ul className="task-list">
            {filteredTaskList.length === 0 ? (
              <div className="no-tasks-view-container">
                <p className="note">No Tasks Added Yet</p>
              </div>
            ) : (
              filteredTaskList.map(eachTag => (
                <TaskItem key={eachTag.optionId} taskDetails={eachTag} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
