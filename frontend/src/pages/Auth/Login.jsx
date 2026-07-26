import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../services/authService'
import '../../styles/auth.css'

const Login = () => {

    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.email || !form.password) {
            setError('Please enter your email and password.')
            return
        }

        setLoading(true)
        try {
            const res = await loginUser({
                email: form.email,
                password: form.password,
            })

            if (res.data?.success) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.data))
                window.location.href = '/'
            } else {
                setError(res.data?.message || 'Login failed. Please try again.')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <div className="auth-divider" />
                <p className="auth-subtitle">
                    Login to your account to continue
                </p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label className="auth-label">Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            className="auth-input"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-group">
                        <label className="auth-label">Password *</label>
                        <input
                            type="password"
                            name="password"
                            className="auth-input"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-link">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
