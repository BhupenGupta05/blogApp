import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchComments } from '../reducers/commentReducer'
import { useEffect } from 'react'

const CommentList = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blogComments = useSelector((state) => state.comments)
  console.log('Redux comments:', blogComments)

  useEffect(() => {
    dispatch(fetchComments(id))
  }, [dispatch, id])

  return (
    <div>
      {blogComments && blogComments.map((comment) => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </div>
  )
}

export default CommentList