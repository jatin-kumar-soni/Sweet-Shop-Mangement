import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!token) {
    return null
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              Sweet Shop
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Welcome, {user?.username}
            </span>
            {user?.role === 'admin' && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                Admin
              </span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

