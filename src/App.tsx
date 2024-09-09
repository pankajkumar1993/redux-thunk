import { createBrowserRouter, RouterProvider } from "react-router-dom"
import TodoApp from "./pages/todos"
import UserComponent from "./pages/users"
import RootLayout from "./layouts/RootLayout"

const router = createBrowserRouter([
  {
    path: "/", element: <RootLayout />, children: [
      { path: "/", element: <UserComponent /> },
      { path: "/todos", element: <TodoApp /> }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
