import {
  Todo,
  TodoActionTypes,
} from './types';


// ********* Define Action Creator *********
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const EDIT_TODO = 'EDIT_TODO';


// ********* Action Creator *********
export const addTodo = (todo: Todo): TodoActionTypes => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (id: number): TodoActionTypes => ({
  type: REMOVE_TODO,
  payload: id,
});

export const toggleTodo = (id: number): TodoActionTypes => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const editTodo = (
  id: number,
  updatedTodo: Partial<Todo>
): TodoActionTypes => ({
  type: EDIT_TODO,
  payload: { id, updatedTodo },
});
