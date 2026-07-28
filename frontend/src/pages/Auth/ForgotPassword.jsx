import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../services/authService'
import '../../styles/auth.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setError('Please enter your email.')
            return
        }

        setLoading(true)
        setError('')
        try {
            const res = await forgotPassword({ email })
            setMessage(res.data?.message || 'If an account exists, a reset link has been sent.')
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Forgot Password</h2>
                <div className="auth-divider" />
                <p className="auth-subtitle">
                    Enter your email to receive a password reset link
                </p>

                {message && <div className="auth-success">{message}</div>}
                {error && <div className="auth-error">{error}</div>}

                {!message && (
                    <form onSubmit={handleSubmit}>
                        <div className="auth-group">
                            <label className="auth-label">Email Address *</label>
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError('') }}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                <p className="auth-switch">
                    <Link to="/login" className="auth-link">Back to Login</Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword
