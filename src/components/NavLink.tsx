import { Link } from 'react-router-dom'

const NavLinks = () => {
    return (
        <nav className="flex space-x-4">
            <Link
                to="/"
                className="text-black hover:text-gray-200 font-medium"
            >
                Users
            </Link>
            <Link
                to="/todos"
                className="text-black hover:text-gray-200 font-medium"
            >
                Todos
            </Link>
            <Link
                to="/posts"
                className="text-black hover:text-gray-200 font-medium"
            >
                Posts
            </Link>
        </nav>
    )
}

export default NavLinks