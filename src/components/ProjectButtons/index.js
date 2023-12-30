import './index.css'

const ProjectButtons = props => {
  const {eachItem} = props
  const {projectType} = eachItem
  return (
    <button type="button" className="project-button-style">
      {projectType}
    </button>
  )
}

export default ProjectButtons
