import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { addTodo, removeTodo, toggleTodo, editTodo } from '../../store/todos/todoActions';
import { Todo } from '../../store/todos/types';
import { AppDispatch } from '../../store';

const TodoApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const handleAddOrEditTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTodoId !== null) {
      dispatch(editTodo(editingTodoId, { id: editingTodoId, title: newTodo, completed: false }));
      setEditingTodoId(null);
    } else {
      const todo: Todo = {
        id: Date.now(),
        title: newTodo,
        completed: false,
      };
      dispatch(addTodo(todo));
    }
    setNewTodo('');
  };

  const handleEditTodo = (todo: Todo) => {
    setNewTodo(todo.title);
    setEditingTodoId(todo.id);
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleAddOrEditTodo}>
        <h1 className='text-center text-2xl font-bold uppercase mb-5'>
          {editingTodoId !== null ? 'Edit Todo' : 'Add Todo'}
        </h1>
        <div className="flex items-center mb-5">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add todo"
            className="form-control"
            required
          />
          <button
            type='submit'
            className="btn btn-primary flex-shrink-0"
          >
            {editingTodoId !== null ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>
      </form>

      {todos.length > 0 ?
        <ul className="space-y-4">
          {todos.map((todo: Todo) => (
            <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm">
              <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </span>
              <div className="space-x-2">
                <button
                  type='button'
                  onClick={() => handleEditTodo(todo)}
                  className="btn-primary btn-sm"
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  className="btn-dark btn-sm"
                >
                  {todo.completed ? 'InComplete' : 'Complete'}
                </button>
                <button
                  type='button'
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        :
        <p>No todo found!!!</p>
      }
    </div>
  );
};

export default TodoApp;
