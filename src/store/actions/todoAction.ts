import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  Todo,
  TodoActionTypes,
} from '../../types';


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
