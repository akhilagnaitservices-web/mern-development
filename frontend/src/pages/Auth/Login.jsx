import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { loginUser } from '../../services/authService'
import '../../styles/auth.css'

const Login = () => {

    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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
                        <div className="auth-password-wrap">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="auth-input"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <p className="auth-switch" style={{ textAlign: 'right', marginTop: '-8px' }}>
                        <Link to="/membership/forgot-password" className="auth-link">Forgot Password?</Link>
                    </p>

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
                    <Link to="/membership" className="auth-link">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
