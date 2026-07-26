import { Navigate } from 'react-router-dom'

// Guards authenticated routes: redirects to /login when no token is present
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
