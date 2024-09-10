import { Link } from 'react-router-dom'

const NavLinks = () => {
    return (
        <nav className="flex space-x-4">
            <Link
                to="/"
                className="text-white hover:text-gray-200 font-medium"
            >
                Users
            </Link>
            <Link
                to="/todos"
                className="text-white hover:text-gray-200 font-medium"
            >
                Todos
            </Link>
            <Link
                to="/posts"
                className="text-white hover:text-gray-200 font-medium"
            >
                Posts
            </Link>
        </nav>
    )
}

export default NavLinks