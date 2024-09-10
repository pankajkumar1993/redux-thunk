import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { User } from "../../store/users/types";
import { addUser, deleteUser, editUser, fetchUsers } from "../../utils/api";

const UserComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [newUser, setNewUser] = useState<User>({ id: 0, firstName: '', lastName: '', email: '' });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  const handleAddOrEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUserId !== null) {
      dispatch(editUser(newUser) as any);
      setEditingUserId(null);
    } else {
      dispatch(addUser({ ...newUser, id: Date.now() }) as any);
    }
    setNewUser({ id: 0, firstName: '', lastName: '', email: '' });
  };

  const handleEditUser = (user: User) => {
    setNewUser(user);
    setEditingUserId(user.id);
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id) as any);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!users?.length) return <p>No Users found!!</p>;

  return (
    <>
      <div className="card mb-5">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        <form className="mb-6 flex gap-4 items-center" onSubmit={handleAddOrEditUser}>
          <input
            type="text"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            className="form-control"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            className="form-control"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="form-control"
            required
          />
          <button
            type='submit'
            className="btn btn-primary flex-shrink-0"
          >
            {editingUserId !== null ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {users?.sort((a, b) => b.id - a.id)?.map((user) => (
          <div key={user.id} className="card flex flex-col gap-3">
            <div>
              <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
              <p> ({user.email})</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEditUser(user)}
                className="btn-sm btn-dark"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserComponent;
