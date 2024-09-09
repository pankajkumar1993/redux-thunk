import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/index';
import { addTodo, removeTodo, toggleTodo } from '../../store/actions/todoAction';
import { Todo } from '../../types';
import { AppDispatch } from '../../store';

const TodoApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [newTodo, setNewTodo] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddTodo = (e: any) => {
    e.preventDefault();
    const todo: Todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    dispatch(addTodo(todo));
    setNewTodo('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleAddTodo}>
        <h1 className='text-center text-2xl font-bold uppercase mb-5'>Add Todo</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add todo"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type='submit'
            className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Todo
          </button>
        </div>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm">
            <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </span>
            <div className="space-x-2">
              <button
                type='button'
                onClick={() => dispatch(toggleTodo(todo.id))}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {todo.completed ? 'InComplete' : 'Complete'}
              </button>
              <button
                type='button'
                onClick={() => dispatch(removeTodo(todo.id))}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default TodoApp;
