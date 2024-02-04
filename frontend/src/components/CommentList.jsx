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
    <ul className='flex flex-col list-disc'>
      <h2 className='text-xl font-semibold mb-4'>Comments</h2>
      {blogComments && blogComments.map((comment) => (
        <li key={comment.id} className='ml-6'>{comment.text}</li>
      ))}
    </ul>
  )
}

export default CommentList