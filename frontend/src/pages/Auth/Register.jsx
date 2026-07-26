import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/authService'
import '../../styles/auth.css'

const Register = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        full_name: '',
        username: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.full_name || !form.username || !form.email || !form.password) {
            setError('Please fill in all required fields.')
            return
        }

        if (form.password !== form.confirm_password) {
            setError('Passwords do not match.')
            return
        }

        setLoading(true)
        try {
            const res = await registerUser({
                full_name: form.full_name,
                username: form.username,
                email: form.email,
                phone_number: form.phone_number,
                password: form.password,
            })

            if (res.data?.success) {
                navigate('/login')
            } else {
                setError(res.data?.message || 'Registration failed. Please try again.')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <div className="auth-divider" />
                <p className="auth-subtitle">
                    Register to join Vadiyaraju Kshatriya Seva Samiti
                </p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label className="auth-label">Full Name *</label>
                        <input
                            type="text"
                            name="full_name"
                            className="auth-input"
                            placeholder="Enter your full name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-row">
                        <div className="auth-group">
                            <label className="auth-label">Username *</label>
                            <input
                                type="text"
                                name="username"
                                className="auth-input"
                                placeholder="Choose a username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="auth-group">
                            <label className="auth-label">Phone Number</label>
                            <input
                                type="tel"
                                name="phone_number"
                                className="auth-input"
                                placeholder="Enter your phone number"
                                value={form.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

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

                    <div className="auth-row">
                        <div className="auth-group">
                            <label className="auth-label">Password *</label>
                            <input
                                type="password"
                                name="password"
                                className="auth-input"
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="auth-group">
                            <label className="auth-label">Confirm Password *</label>
                            <input
                                type="password"
                                name="confirm_password"
                                className="auth-input"
                                placeholder="Re-enter your password"
                                value={form.confirm_password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
