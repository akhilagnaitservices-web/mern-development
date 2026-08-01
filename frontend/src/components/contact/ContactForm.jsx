import { useState, useCallback } from 'react'
import { sendContactMessage } from '../../services/contactService'

const SUBJECTS = [
    'Membership Enquiry',
    'Matrimony Enquiry',
    'Event Information',
    'Donation',
    'General Enquiry',
    'Complaint',
    'Other',
]

// Simple captcha generator
const generateCaptcha = () => {
    const chars = '0123456789'
    return Array.from({ length: 4 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join('')
}

const ContactForm = () => {
    const [form, setForm] = useState({
        full_name: '', email: '',
        phone_number: '', subject: '', message: '',
    })
    const [captcha,    setCaptcha]    = useState(generateCaptcha)
    const [captchaInput, setCaptchaInput] = useState('')
    const [loading,    setLoading]    = useState(false)
    const [submitted,  setSubmitted]  = useState(false)
    const [error,      setError]      = useState('')

    const refreshCaptcha = useCallback(() => {
        setCaptcha(generateCaptcha())
        setCaptchaInput('')
    }, [])

    const handleChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.full_name || !form.email || !form.subject || !form.message) {
            setError('Please fill in all required fields.')
            return
        }

        if (captchaInput !== captcha) {
            setError('Captcha does not match. Please try again.')
            refreshCaptcha()
            return
        }

        setLoading(true)
        try {
            const res = await sendContactMessage({
                full_name:    form.full_name,
                email:        form.email,
                phone_number: form.phone_number,
                subject:      form.subject,
                message:      form.message,
            })

            if (res.data?.success) {
                setSubmitted(true)
                setForm({ full_name: '', email: '', phone_number: '', subject: '', message: '' })
                refreshCaptcha()
            } else {
                setError(res.data?.message || 'Failed to send message.')
            }
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="contact-form-card">
            <h3 className="contact-form-title">Send Us a Message</h3>
            <div className="contact-form-divider" />

            {submitted && (
                <div className="form-success">
                     Your message has been sent! We'll respond within 24 hours.
                </div>
            )}

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                            type="text"
                            name="full_name"
                            className="form-input"
                            placeholder="Enter your full name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            name="phone_number"
                            className="form-input"
                            placeholder="Enter your phone number"
                            value={form.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Subject *</label>
                        <select
                            name="subject"
                            className="form-select"
                            value={form.subject}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a subject</option>
                            {SUBJECTS.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                        name="message"
                        className="form-textarea"
                        placeholder="Type your message here..."
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Captcha */}
                <div className="form-captcha">
                    <span className="form-captcha-code">{captcha}</span>
                    <button
                        type="button"
                        className="form-captcha-refresh"
                        onClick={refreshCaptcha}
                        title="Refresh captcha"
                    >
                        🔄
                    </button>
                    <input
                        type="text"
                        className="form-captcha-input"
                        placeholder="Enter captcha"
                        value={captchaInput}
                        onChange={e => setCaptchaInput(e.target.value)}
                        maxLength={4}
                    />
                </div>

                <button
                    type="submit"
                    className="form-submit-btn"
                    disabled={loading || submitted}
                >
                    {loading ? ' Sending...' : ' Send Message'}
                </button>

                <p className="form-privacy">
                     Your information is safe with us. We respect your privacy.
                </p>
            </form>
        </div>
    )
}

export default ContactForm