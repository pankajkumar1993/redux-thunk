
// export const AUTH = {
//     ADMIN_LOGIN: "login/"
// }

// export const USERS = {
//     FETCH_USERS: "users",
//     ADD_USER: "users/add"
// }


export const USERS = "users";
export const ADD_USERS = "users/add";
export const DELETE_USERS = (userId: string) => `users/${userId}`;
export const EDIT_USERS = (userId: string) => `users/${userId}`;