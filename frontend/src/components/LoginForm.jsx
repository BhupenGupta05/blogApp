import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'

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
    <div className='flex mt-4 ml-4'>
      <form onSubmit={handleSubmit}>
        <div>
            Username :
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            className=" bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"
          />

        </div>

        <div>
            Password :
          <input
            id='password'
            type="text"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"
          />

        </div>
        <div className='flex mt-1 gap-4'>
          <button id='login-button' type="submit" className="px-4 py-1 bg-blue-600 rounded-md mb-2">Login</button>
          <button id='cancel-button' type="button" className="px-4 py-1 bg-slate-400 rounded-md mb-2" onClick={handleCancel}>Cancel</button>
        </div>

      </form>
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