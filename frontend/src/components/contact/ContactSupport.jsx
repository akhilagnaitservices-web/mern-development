import { useState, useEffect } from 'react'
import { getContactInfo } from '../../services/contactService'

const ContactSupport = () => {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        getContactInfo()
            .then(res => {
                if (res.data?.success && res.data?.data) {
                    setInfo(res.data.data)
                }
            })
            .catch(() => {})
    }, [])

    const deptCards = [
        {
            icon: '👥',
            label: 'Membership Enquiries',
            value: info?.membership_phone || '+91 9876543210',
            href: `tel:${info?.membership_phone || '+919876543210'}`,
        },
        {
            icon: '💍',
            label: 'Matrimony Support',
            value: info?.matrimony_phone || '+91 9123456789',
            href: `tel:${info?.matrimony_phone || '+919123456789'}`,
        },
        {
            icon: '🎉',
            label: 'Event & Programmes',
            value: info?.events_phone || '+91 9988776655',
            href: `tel:${info?.events_phone || '+919988776655'}`,
        },
    ]

    return (
        <section className="contact-dept-section">
            <div className="container">
                <h2 className="section-title center">
                    We are just a call away!
                </h2>
                <div  />
                <p className="contact-dept-subtitle">
                    For urgent assistance, feel free to reach us directly.
                </p>
                <div className="contact-dept-grid">
                    {deptCards.map((card, i) => (
                        <a
                            key={i}
                            href={card.href}
                            className="contact-dept-card"
                        >
                            <div className="contact-dept-icon-wrap">
                                <span style={{ fontSize: '1.8rem' }}>{card.icon}</span>
                            </div>
                            <p className="contact-dept-label">{card.label}</p>
                            <p className="contact-dept-value">{card.value}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ContactSupport