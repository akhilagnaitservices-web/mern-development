import { useState, useEffect, useMemo } from 'react'
import { registerMatrimony } from '../../services/matrimonyAuthService'
import { getGothras } from '../../services/gothraService'
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

    const [gothras, setGothras] = useState([])
    const [gothraLoading, setGothraLoading] = useState(true)
    const [gothraSearch, setGothraSearch] = useState('')
    const [gothraOpen, setGothraOpen] = useState(false)

    const goToMatrimonyLogin = () => {
        if (MATRIMONY_APP_URL) {
            window.location.href = MATRIMONY_APP_URL
        }
    }

const handleChange = (e) => {
    const { name, value } = e.target

    setForm(prev => ({
        ...prev,
        [name]: value,
    }))

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

useEffect(() => {
    const fetchGothras = async () => {
        try {
            setGothraLoading(true)

            const res = await getGothras({ status: 'active' })

            if (res.data?.success) {
                setGothras(res.data.data || [])
            } else {
                setGothras([])
            }
        } catch (err) {
            console.error('Gothras error:', err)
            setGothras([])
        } finally {
            setGothraLoading(false)
        }
    }

    fetchGothras()
}, [])


const filteredGothras = useMemo(() => {
    const query = gothraSearch.trim().toLowerCase()

    if (!query) return gothras

    return gothras
        .filter(gothra =>
            gothra.gothra_name?.toLowerCase().startsWith(query)
        )
}, [gothras, gothraSearch])

const selectedGothra = gothras.find(
    gothra => String(gothra.id) === String(form.gothram)
)

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

                   <div className="auth-group gothra-select-group">
    <label className="auth-label">Gothram *</label>

    <div className="gothra-select-wrapper">
        <button
            type="button"
            className="auth-input gothra-select-trigger"
            onClick={() => {
                if (!gothraLoading && gothras.length > 0) {
                    setGothraOpen(prev => !prev)
                }
            }}
            disabled={gothraLoading}
            aria-haspopup="listbox"
            aria-expanded={gothraOpen}
        >
            <span className={!selectedGothra ? 'gothra-placeholder' : ''}>
                {gothraLoading
                    ? 'Loading Gothrams...'
                    : selectedGothra
                        ? selectedGothra.gothra_name
                        : 'Search or select your Gothram'}
            </span>

            <span className="gothra-select-arrow">
                {gothraOpen ? '▲' : '▼'}
            </span>
        </button>

        {gothraOpen && (
            <div className="gothra-dropdown">
                <div className="gothra-search-box">
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Search Gothram..."
                        value={gothraSearch}
                        onChange={(e) => setGothraSearch(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="gothra-options" role="listbox">
                    {filteredGothras.length > 0 ? (
                        filteredGothras.map((gothra) => (
                            <button
                                key={gothra.id}
                                type="button"
                                className={`gothra-option ${
                                    String(form.gothram) === String(gothra.id)
                                        ? 'selected'
                                        : ''
                                }`}
                                onClick={() => {
                                    setForm(prev => ({
                                        ...prev,
                                        gothram: String(gothra.id),
                                    }))

                                    setGothraSearch('')
                                    setGothraOpen(false)
                                    setError('')
                                }}
                            >
                                <span>{gothra.gothra_name}</span>

                                {String(form.gothram) === String(gothra.id) && (
                                    <span className="gothra-check">✓</span>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className="gothra-no-results">
                            No Gothram found
                        </div>
                    )}
                </div>
            </div>
        )}
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
