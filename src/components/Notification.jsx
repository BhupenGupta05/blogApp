import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector((state) => state.notification)
  if(!notification.message){
    return null
  }

  const isSuccess = notification.message.toLowerCase().includes('added') 
  || notification.message.toLowerCase().includes('updated') 
  || notification.message.toLowerCase().includes('logged in')

  const notificationStyle = {
    color: isSuccess ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '6px',
    padding: '8px',
    marginBottom: '10px',
  }

  return (
    <div style={notificationStyle} className="error">
      {notification.message}
    </div>
  )
}

export default Notification