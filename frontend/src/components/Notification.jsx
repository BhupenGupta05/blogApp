import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the notification
    setIsVisible(true)

    // Hide the notification after a certain duration (e.g., 3000 milliseconds)
    const timeoutId = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId)
  }, [notification.message])

  if (!notification.message) {
    return null
  }

  const isSuccess =
    notification.message.toLowerCase().includes('added') ||
    notification.message.toLowerCase().includes('updated') ||
    notification.message.toLowerCase().includes('logged in')

  const notificationStyle = {
    color: isSuccess ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: '16px',
    borderStyle: 'solid',
    borderRadius: '6px',
    padding: '8px',
    marginBottom: '10px',
    position: 'fixed',
    top: '50%',
    right: '0',
    transform: 'translateY(-50%)',
    opacity: isVisible ? 1 : 0, // Added opacity property
    maxHeight: isVisible ? '100px' : '0', // Added maxHeight property
    overflow: 'hidden', // Hide overflow when maxHeight is 0
    transition: 'opacity 0.3s ease-in-out, maxHeight 0.3s ease-in-out', // Added transition property
    zIndex: '999', // Ensure the notification is above other elements
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification
