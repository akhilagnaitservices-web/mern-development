import { useState } from 'react'
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

const ContactForm = () => {
    const [form, setForm] = useState({
        full_name:    '',
        email:        '',
        phone_number: '',
        subject:      '',
        message:      '',
    })
    const [loading,   setLoading]   = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error,     setError]     = useState('')

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
                setForm({
                    full_name: '', email: '',
                    phone_number: '', subject: '', message: '',
                })
            } else {
                setError(res.data?.message || 'Failed to send message.')
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="contact-form-card">
            <h3 className="contact-form-title">Send Us a Message</h3>
            <p className="contact-form-subtitle">
                Fill out the form and we'll get back to you within 24 hours.
            </p>

            {submitted && (
                <div className="form-success">
                    ✅ Your message has been sent successfully!
                    We'll respond within 24 working hours.
                </div>
            )}

            {error && (
                <div className="form-error">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                            type="text"
                            name="full_name"
                            className="form-input"
                            placeholder="Your full name"
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
                            placeholder="your@email.com"
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
                            placeholder="+91 9876543210"
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
                        placeholder="Write your message here..."
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '14px', fontSize: 'var(--text-base)' }}
                    disabled={loading || submitted}
                >
                    {loading ? '⏳ Sending...' : '📨 Send Message'}
                </button>
            </form>
        </div>
    )
}

export default ContactForm