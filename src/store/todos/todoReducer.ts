import { ADD_TODO, EDIT_TODO, REMOVE_TODO, TOGGLE_TODO } from './todoAction';
import {
  Todo,
  TodoActionTypes,
} from './types';

interface TodoState {
  todos: Todo[];
  // loading: boolean,
  // error: string
}

const initialState: TodoState = {
  todos: [
    {
      id: 1,
      title: "First Task",
      completed: false,
    },
    {
      id: 2,
      title: "Second Task",
      completed: false,
    },
    {
      id: 3,
      title: "Third Task",
      completed: false,
    }
  ],
  // loading: false,
  // error: ''
};

const todoReducer = (
  state = initialState,
  action: TodoActionTypes
): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updatedTodo }
            : todo
        ),
      };

    default:
      return state;
  }
};

export default todoReducer;
