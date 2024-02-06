import { Link } from 'react-router-dom';
import userService from '../services/users';
import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await userService.getUsers();
      setUsers(userData);
    };

    fetchUsers();
  }, []);

  return (
    <div className='flex flex-col mx-auto mt-12'>
      <h2 className='text-2xl font-semibold'>Users associated with us</h2>
      <ul className='flex flex-col gap-2 ml-4 mt-4 sm:ml-8'>
        {users.map((user) => (
          <li className='flex' key={user.id}>
            <Link to={`/users/${user.id}`} className='font-semibold hover:underline transition-colors duration-300'>
              {user.name}
            </Link>
            <p className='ml-2'>
              - {user.blogs.length} {user.blogs.length === 1 ? 'blog' : 'blogs'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
