import { ADD_TODO, EDIT_TODO, REMOVE_TODO, TOGGLE_TODO } from "./todoActions";

// ************************* Todo Types *************************
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoState {
    todos: Todo[];
}

export interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: Todo;
}

export interface RemoveTodoAction {
    type: typeof REMOVE_TODO;
    payload: number;
}

export interface ToggleTodoAction {
    type: typeof TOGGLE_TODO;
    payload: number;
}

export interface EditTodoAction {
    type: typeof EDIT_TODO;
    payload: {
        id: number;
        updatedTodo: Partial<Todo>;
    };
}

export type TodoActionTypes =
    | AddTodoAction
    | RemoveTodoAction
    | ToggleTodoAction
    | EditTodoAction;



