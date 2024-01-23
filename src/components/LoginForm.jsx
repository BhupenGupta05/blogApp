import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  setUsername,
  setPassword
}) => {
  const naviagte = useNavigate()
  const handleCancel = () => {
    naviagte('/')
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username: </Form.Label>
            
          <Form.Control
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

        </Form.Group>

        <Form.Group>
          <Form.Label>password: </Form.Label>
            
          <Form.Control
            id='password'
            type="text"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

        </Form.Group>
        <Button id='login-button' type="submit" variant='primary' className=' bg-blue-600' >
          Login
          </Button>
        <Button id='cancel-button' type="button" variant='secondary' onClick={handleCancel} className=' bg-slate-600 m-3'>
          Cancel
          </Button>
        
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm