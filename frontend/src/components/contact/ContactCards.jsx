import { useState, useEffect } from 'react'
import { getContactInfo } from '../../services/contactService'

const ContactCards = () => {
    const [info,    setInfo]    = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getContactInfo()
            .then(res => {
                if (res.data?.success && res.data?.data) {
                setInfo(res.data.data)
            }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
            <div className="spinner" />
        </div>
    )

    if (!info) return null

    const cards = [
        {
            icon: '📍',
            label: 'Our Address',
            value: info.address,
            type: 'text',
        },
        {
            icon: '📞',
            label: 'Phone Numbers',
            value: info.primary_phone,
            secondary: info.secondary_phone,
            type: 'phone',
        },
        {
            icon: '✉️',
            label: 'Email Address',
            value: info.primary_email,
            secondary: info.secondary_email,
            type: 'email',
        },
        {
            icon: '🕐',
            label: 'Office Hours',
            value: info.office_hours,
            type: 'text',
        },
    ].filter(c => c.value)

    return (
        <>
            {/* Main Info Cards */}
            <div className="contact-cards-grid">
                {cards.map((card, i) => (
                    <div key={i} className="contact-info-card">
                        <div className="contact-info-icon">{card.icon}</div>
                        <div>
                            <p className="contact-info-label">{card.label}</p>
                            <p className="contact-info-value">
                                {card.type === 'phone' ? (
                                    <>
                                        <a href={`tel:${card.value}`}>{card.value}</a>
                                        {card.secondary && (
                                            <><br />
                                            <a href={`tel:${card.secondary}`}>{card.secondary}</a>
                                            </>
                                        )}
                                    </>
                                ) : card.type === 'email' ? (
                                    <>
                                        <a href={`mailto:${card.value}`}>{card.value}</a>
                                        {card.secondary && (
                                            <><br />
                                            <a href={`mailto:${card.secondary}`}>{card.secondary}</a>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    card.value
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Department Phones */}
            {(info.membership_phone || info.matrimony_phone || info.events_phone) && (
                <div className="contact-dept-section">
                    <h4 className="contact-dept-title">Department Contacts</h4>
                    <div className="contact-dept-grid">
                        {info.membership_phone && (
                            <a href={`tel:${info.membership_phone}`} className="contact-dept-card">
                                <span className="contact-dept-icon">👥</span>
                                <p className="contact-dept-label">Membership</p>
                                <p className="contact-dept-value">{info.membership_phone}</p>
                            </a>
                        )}
                        {info.matrimony_phone && (
                            <a href={`tel:${info.matrimony_phone}`} className="contact-dept-card">
                                <span className="contact-dept-icon">💍</span>
                                <p className="contact-dept-label">Matrimony</p>
                                <p className="contact-dept-value">{info.matrimony_phone}</p>
                            </a>
                        )}
                        {info.events_phone && (
                            <a href={`tel:${info.events_phone}`} className="contact-dept-card">
                                <span className="contact-dept-icon">🎉</span>
                                <p className="contact-dept-label">Events</p>
                                <p className="contact-dept-value">{info.events_phone}</p>
                            </a>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ContactCards