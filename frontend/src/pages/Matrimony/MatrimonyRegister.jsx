import { useState } from 'react'
import { registerMatrimony } from '../../services/matrimonyAuthService'
import '../../styles/auth.css'

const MATRIMONY_APP_URL = import.meta.env.VITE_MATRIMONY_APP_URL

const MatrimonyRegister = () => {

    const [form, setForm] = useState({
        name: '',
        last_name: '',
        email_id: '',
        mobile_no: '',
        date_of_birth: '',
        gender: '',
        looking_for: '',
        gothram: '',
        password: '',
        confirm_password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const goToMatrimonyLogin = () => {
        if (MATRIMONY_APP_URL) {
            window.location.href = MATRIMONY_APP_URL
        }
    }

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !form.name || !form.last_name || !form.email_id || !form.mobile_no ||
            !form.date_of_birth || !form.gender || !form.looking_for ||
            !form.gothram || !form.password
        ) {
            setError('Please fill in all required fields.')
            return
        }

        if (form.password !== form.confirm_password) {
            setError('Passwords do not match.')
            return
        }

        setLoading(true)
        try {
            const res = await registerMatrimony({
                name: form.name,
                last_name: form.last_name,
                email_id: form.email_id,
                mobile_no: Number(form.mobile_no),
                date_of_birth: form.date_of_birth,
                gender: form.gender,
                looking_for: form.looking_for,
                gothram: form.gothram,
                password: form.password,
            })

            // Matrimony issues its own token, but we never store it or
            // auto-login here — Membership and Matrimony sessions stay independent.
            setSuccessMessage(res.data?.message || 'Registration successful.')

            setTimeout(goToMatrimonyLogin, 1500)

        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to reach the Matrimony service. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Matrimony Registration</h2>
                <div className="auth-divider" />
                <p className="auth-subtitle">
                    Create your Matrimony profile
                </p>

                {successMessage && <div className="auth-success">{successMessage}</div>}
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-row">
                        <div className="auth-group">
                            <label className="auth-label">First Name *</label>
                            <input
                                type="text"
                                name="name"
                                className="auth-input"
                                placeholder="Enter your first name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="auth-group">
                            <label className="auth-label">Last Name *</label>
                            <input
                                type="text"
                                name="last_name"
                                className="auth-input"
                                placeholder="Enter your last name"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-group">
                        <label className="auth-label">Email Address *</label>
                        <input
                            type="email"
                            name="email_id"
                            className="auth-input"
                            placeholder="Enter your email"
                            value={form.email_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-row">
                        <div className="auth-group">
                            <label className="auth-label">Mobile Number *</label>
                            <input
                                type="tel"
                                name="mobile_no"
                                className="auth-input"
                                placeholder="Enter your mobile number"
                                value={form.mobile_no}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="auth-group">
                            <label className="auth-label">Date of Birth *</label>
                            <input
                                type="date"
                                name="date_of_birth"
                                className="auth-input"
                                value={form.date_of_birth}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-row">

                        <div className="auth-group">
    <label className="auth-label">Gender *</label>
    <select
        name="gender"
        className="auth-input"
        value={form.gender}
        onChange={handleChange}
        required
    >
        <option value="">Select Gender</option>
        <option value="1">Male</option>
        <option value="2">Female</option>
        <option value="3">Others</option>
    </select>
</div>
                      

                        <div className="auth-group">
    <label className="auth-label">Looking For *</label>
    <select
        name="looking_for"
        className="auth-input"
        value={form.looking_for}
        onChange={handleChange}
        required
    >
        <option value="">Select Preference</option>
        <option value="1">Groom</option>
        <option value="2">Bride</option>
    </select>
</div>
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
                        disabled={loading || !!successMessage}
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have a Matrimony account?{' '}
                    <a
                        href="#"
                        className="auth-link"
                        onClick={(e) => {
                            e.preventDefault()
                            goToMatrimonyLogin()
                        }}
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}

export default MatrimonyRegister
