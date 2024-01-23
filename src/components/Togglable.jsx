import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} >{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisibility} className=' bg-slate-600 border-none ml-2 px-2 py-1 rounded-md' >cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable