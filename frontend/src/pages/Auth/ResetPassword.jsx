import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../../services/authService'
import '../../styles/auth.css'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const [form, setForm] = useState({ new_password: '', confirm_password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!token) {
            setError('Invalid or missing reset link.')
            return
        }
        if (!form.new_password || form.new_password !== form.confirm_password) {
            setError('Passwords do not match.')
            return
        }

        setLoading(true)
        setError('')
        try {
            const res = await resetPassword({ token, new_password: form.new_password })
            if (res.data?.success) {
                alert('Password reset successfully. Please login.')
                navigate('/login')
            } else {
                setError(res.data?.message || 'Failed to reset password.')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Reset Password</h2>
                <div className="auth-divider" />
                <p className="auth-subtitle">Enter your new password</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label className="auth-label">New Password *</label>
                        <input
                            type="password"
                            className="auth-input"
                            value={form.new_password}
                            onChange={(e) => setForm({ ...form, new_password: e.target.value })}
                            required
                        />
                    </div>
                    <div className="auth-group">
                        <label className="auth-label">Confirm Password *</label>
                        <input
                            type="password"
                            className="auth-input"
                            value={form.confirm_password}
                            onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <p className="auth-switch">
                    <Link to="/login" className="auth-link">Back to Login</Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPassword
