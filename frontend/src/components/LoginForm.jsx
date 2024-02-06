import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  setUsername,
  setPassword
}) => {
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className='flex flex-col justify-center items-center mt-4'>
      <h2 className='text-xl font-semibold mb-4'>Login</h2>
      <div className='flex items-center mt-4'>
        <form onSubmit={handleSubmit}>
          <div>
            Username :
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"
            />
          </div>

          <div>
            Password :
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"
            />
          </div>

          <div className='flex mt-1 gap-4'>
            <button type="submit" className="px-4 py-1 bg-blue-600 rounded-md mb-2">Login</button>
            <button type="button" className="px-4 py-1 bg-slate-400 rounded-md mb-2" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
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
