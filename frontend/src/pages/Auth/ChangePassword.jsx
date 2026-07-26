import { useState } from 'react'
import { Link } from 'react-router-dom'
import { changePassword } from '../../services/authService'
import '../../styles/auth.css'

const ChangePassword = () => {

    const [form, setForm] = useState({
        current_password: '',
        new_password: '',
        confirm_new_password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.current_password || !form.new_password) {
            setError('Please fill in all required fields.')
            return
        }

        if (form.new_password !== form.confirm_new_password) {
            setError('New passwords do not match.')
            return
        }

        setLoading(true)
        try {
            const res = await changePassword({
                current_password: form.current_password,
                new_password: form.new_password,
            })

            if (res.data?.success) {
                setSuccess(true)
                setForm({ current_password: '', new_password: '', confirm_new_password: '' })
            } else {
                setError(res.data?.message || 'Failed to change password.')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to change password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Change Password</h2>
                <div className="auth-divider" />
                <p className="auth-subtitle">
                    Update the password for your account
                </p>

                {success && (
                    <div className="auth-success">
                        Password changed successfully.
                    </div>
                )}

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label className="auth-label">Current Password *</label>
                        <input
                            type="password"
                            name="current_password"
                            className="auth-input"
                            placeholder="Enter your current password"
                            value={form.current_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-group">
                        <label className="auth-label">New Password *</label>
                        <input
                            type="password"
                            name="new_password"
                            className="auth-input"
                            placeholder="Enter your new password"
                            value={form.new_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-group">
                        <label className="auth-label">Confirm New Password *</label>
                        <input
                            type="password"
                            name="confirm_new_password"
                            className="auth-input"
                            placeholder="Re-enter your new password"
                            value={form.confirm_new_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>

                <p className="auth-switch">
                    <Link to="/profile" className="auth-link">Back to Profile</Link>
                </p>
            </div>
        </div>
    )
}

export default ChangePassword
