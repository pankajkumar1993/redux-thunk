import { createBrowserRouter, RouterProvider } from "react-router-dom"
import TodoApp from "./pages/todos"
import UserComponent from "./pages/users"
import RootLayout from "./layouts/RootLayout"
import PostComponent from "./pages/posts"

const router = createBrowserRouter([
    {
        path: "/", element: <RootLayout />, children: [
            { path: "/", element: <UserComponent /> },
            { path: "/todos", element: <TodoApp /> },
            { path: "/posts", element: <PostComponent /> }
        ]
    }
])

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App