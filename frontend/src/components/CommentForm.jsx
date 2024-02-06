import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/commentReducer';

const CommentForm = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    e.target.comment.value = '';
    dispatch(addComment(id, comment));
  };

  return (
    <form onSubmit={handleSubmit} className='mt-4'>
      <input
        className='bg-slate-300 px-4 py-2 my-2 outline-none rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3'
        name="comment"
        placeholder='Add a comment...'
      />
      <button type="submit" className='bg-pink-300 rounded-md px-4 py-2 ml-2'>Comment</button>
    </form>
  );
};

export default CommentForm;
