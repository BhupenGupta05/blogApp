import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/commentReducer'

const CommentForm = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  const handleSubmit = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    e.target.comment.value = ''
    dispatch(addComment(id, comment))
  }

  return (
    <form onSubmit={handleSubmit} className=' mt-4'>
      <input
        className='bg-slate-300 px-4 py-1 my-1 mt-3 mb-4 outline-none rounded-md'
        name="comment"
        placeholder='Add a comment...'
      />

      <button type="submit" className=' bg-pink-400 rounded-md px-2 py-1 ml-2'>comment</button>
    </form>
  )
}
export default CommentForm