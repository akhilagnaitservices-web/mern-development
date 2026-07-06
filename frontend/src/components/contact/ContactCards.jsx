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
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <div className="spinner" />
        </div>
    )

    if (!info) return null

    const cards = [
        {
            icon: '📍',
            title: 'Visit Us',
            value: info.address,
            type: 'text',
        },
        {
            icon: '📞',
            title: 'Call Us',
            value: info.primary_phone,
            secondary: info.secondary_phone,
            type: 'phone',
        },
        {
            icon: '✉️',
            title: 'Email Us',
            value: info.primary_email,
            secondary: info.secondary_email,
            type: 'email',
        },
        {
            icon: '🕐',
            title: 'Office Hours',
            value: info.office_hours,
            type: 'text',
        },
    ].filter(c => c.value)

    return (
        <div className="contact-top-cards">
            {cards.map((card, i) => (
                <div key={i} className="contact-top-card">
                    <div className="contact-top-card-icon">
                        {card.icon}
                    </div>
                    <h3 className="contact-top-card-title">{card.title}</h3>
                    <div className="contact-top-card-value">
                        {card.type === 'phone' ? (
                            <>
                                <a href={`tel:${card.value}`}>{card.value}</a>
                                {card.secondary && (
                                    <a href={`tel:${card.secondary}`}>{card.secondary}</a>
                                )}
                            </>
                        ) : card.type === 'email' ? (
                            <>
                                <a href={`mailto:${card.value}`}>{card.value}</a>
                                {card.secondary && (
                                    <a href={`mailto:${card.secondary}`}>{card.secondary}</a>
                                )}
                            </>
                        ) : (
                            <p>{card.value}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContactCards