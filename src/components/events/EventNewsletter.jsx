import { useState } from 'react'

const EventNewsletter = () => {
    const [email,     setEmail]     = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        setSubscribed(true)
        setEmail('')
    }

    return (
        <div className="events-newsletter">
            <div className="container">
                <div className="events-newsletter-inner">
                    <div className="events-newsletter-left">
                        <span className="events-newsletter-icon">✉️</span>
                        <div>
                            <p className="events-newsletter-title">Never Miss an Event!</p>
                            <p className="events-newsletter-subtitle">
                                Subscribe to get updates about our upcoming events and programs.
                            </p>
                        </div>
                    </div>
                    {subscribed ? (
                        <p style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: 'var(--text-lg)' }}>
                            ✅ Subscribed successfully!
                        </p>
                    ) : (
                        <form className="events-newsletter-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="events-newsletter-input"
                                required
                            />
                            <button type="submit" className="btn btn-secondary">
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EventNewsletter