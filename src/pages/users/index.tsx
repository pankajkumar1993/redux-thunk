import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { useAppDispatch } from '../../store';
import { User } from '../../store/users/types';
import { addUser, deleteUser, fetchUsers } from '../../utils/api';

const UserComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: '', email: '' });

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUser({ ...newUser, id: Date.now() }) as any);
    setNewUser({ id: 0, name: '', email: '' });
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id) as any);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!users.length) return <p>No Todo found!!</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      <form className="mb-6" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <button
          type='submit'
          className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
        >
          Add User
        </button>
      </form>

      <ul className="list-disc pl-5 space-y-2">
        {users.sort((a, b) => b.id - a.id).map((user) => (
          <li key={user.id} className="flex justify-between items-center">
            <span className="text-lg">
              {user.name} ({user.email})
            </span>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white rounded-lg p-1 hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;
