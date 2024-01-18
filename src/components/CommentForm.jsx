import { useParams } from "react-router"
import { useDispatch } from "react-redux"
import { addComment } from "../reducers/commentReducer"

const CommentForm = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    // const [comment, setComment] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const comment = e.target.comment.value
        e.target.comment.value = ''
        dispatch(addComment(id, comment))
    }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment:
        <textarea
        name="comment"
        />
      </label>
      <button type="submit">Add Comment</button>
    </form>
  )
}
export default CommentForm