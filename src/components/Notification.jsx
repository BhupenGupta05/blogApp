const Notification = ({message}) => {
    if(message === null){
      return null
    }

    const isSuccess = message.toLowerCase().includes('added') || message.toLowerCase().includes('updated')

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
    <div style={notificationStyle}>
        {message}
    </div>
  )
}

export default Notification