import { useState, useEffect } from 'react'
import { getContactInfo } from '../../services/contactService'
import { getSocialMediaLinks } from '../../services/headerService'

const getSocialIcon = (name) => {
    const icons = {
        facebook: 'f', instagram: '◎', youtube: '▶',
        whatsapp: 'W', twitter: 'X', linkedin: 'in',
    }
    return icons[name?.toLowerCase()] || name?.charAt(0)?.toUpperCase()
}

const ContactSupport = () => {
    const [info,    setInfo]    = useState(null)
    const [socials, setSocials] = useState([])

    useEffect(() => {
        Promise.all([getContactInfo(), getSocialMediaLinks()])
            .then(([infoRes, socialRes]) => {
                if (infoRes.data?.success && infoRes.data?.data) {
                    setInfo(infoRes.data.data)
                }
                if (socialRes.data?.success) {
                    setSocials(socialRes.data.data || [])
                }
            })
            .catch(() => {})
    }, [])

    const cards = [
        {
            icon: '📞',
            title: 'Call Us',
            text: info?.office_hours || 'Monday - Saturday: 9:00 AM - 6:00 PM',
            action: info?.primary_phone
                ? <a href={`tel:${info.primary_phone}`} className="btn btn-primary" style={{ marginTop: '16px' }}>
                    Call Now
                  </a>
                : null,
        },
        {
            icon: '✉️',
            title: 'Email Us',
            text: 'Send us an email and we will respond within 24 working hours.',
            action: info?.primary_email
                ? <a href={`mailto:${info.primary_email}`} className="btn btn-outline" style={{ marginTop: '16px' }}>
                    Send Email
                  </a>
                : null,
        },
        {
            icon: '🌐',
            title: 'Follow Us',
            text: 'Stay connected on social media for latest updates and announcements.',
            action: socials.length > 0
                ? <div className="contact-social-links" style={{ marginTop: '16px' }}>
                    {socials.map(s => (
                        <a
                            key={s.id}
                            href={s.platform_link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-social-link"
                            title={s.platform_name}
                        >
                            {getSocialIcon(s.platform_name)}
                        </a>
                    ))}
                  </div>
                : null,
        },
    ]

    return (
        <div className="contact-support">
            {cards.map((card, i) => (
                <div key={i} className="contact-support-card">
                    <span className="contact-support-icon">{card.icon}</span>
                    <h4 className="contact-support-title">{card.title}</h4>
                    <p className="contact-support-text">{card.text}</p>
                    {card.action}
                </div>
            ))}
        </div>
    )
}

export default ContactSupport