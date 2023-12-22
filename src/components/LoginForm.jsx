import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            className=" bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"
          />

        </div>

        <div>
            password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"
          />

        </div>
        <button type="submit" className="px-4 py-1 bg-slate-200 rounded-md mb-2">Login</button>
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