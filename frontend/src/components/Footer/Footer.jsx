import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHeader, getSocialMediaLinks, getFooterLinks } from '../../services/headerService'
import '../../styles/footer.css'

// Social platform icon abbreviations
const getPlatformIcon = (name) => {
    const icons = {
        facebook:  'Fb',
        instagram: 'In',
        youtube:   'Yt',
        twitter:   'Tw',
        linkedin:  'Li',
        whatsapp:  'Wa',
    }
    return icons[name?.toLowerCase()] || name?.charAt(0).toUpperCase()
}

const Footer = () => {
    const [header,       setHeader]       = useState(null)
    const [socialLinks,  setSocialLinks]  = useState([])
    const [footerLinks,  setFooterLinks]  = useState([])
    const [loading,      setLoading]      = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all 3 APIs in parallel — faster than one by one
                const [headerRes, socialRes, linksRes] = await Promise.all([
                    getHeader(),
                    getSocialMediaLinks(),
                    getFooterLinks(),
                ])

                if (headerRes.success)  setHeader(headerRes.data)
                if (socialRes.success)  setSocialLinks(socialRes.data)
                if (linksRes.success)   setFooterLinks(linksRes.data)

            } catch (error) {
                console.error('Footer data fetch error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <footer className="footer">
                <div className="footer-loading">Loading...</div>
            </footer>
        )
    }

    const BASE_URL = 'http://localhost:5000'

    const getUploadedUrl = (filePath) => {
        if (!filePath) return null
        if (filePath.startsWith('http')) return filePath
        if (filePath.startsWith('/')) return `${BASE_URL}${filePath}`
        return `${BASE_URL}/uploads/${filePath}`
    }

    // Fallback contact values when backend header is empty
    const fallback = {
        address: 'VRKSS Seva Samiti , hyderabad',
        phone: '+91-1234567890',
        email: 'info@vrkss.org',
        location: 'Hyderabad, Telangana, India',
    }

    return (
        <footer className="footer">
            <div className="container">

                {/* ── TOP SECTION ── */}
                <div className="footer-top">

                    {/* COLUMN 1 — Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            {header?.footer_logo ? (
                                <img
                                    src={getUploadedUrl(header.footer_logo)}
                                    alt={header?.name}
                                    className="footer-logo-img"
                                />
                            ) : (
                                <div className="footer-logo-placeholder">V</div>
                            )}
                            <div className="footer-logo-text">
                                <span className="footer-logo-title">
                                    {header?.name || 'VRKSS'}
                                </span>
                                <span className="footer-logo-subtitle">Seva Samiti</span>
                            </div>
                        </Link>

                        <p className="footer-tagline">
                            {header?.description || 'Unity | Service | Culture | Progress'}
                        </p>

                        <p className="footer-description">
                            Dedicated to preserving our rich cultural heritage and
                            building a stronger community through unity, education,
                            and social welfare.
                        </p>

                        {/* Social Media Icons */}
                        {socialLinks.length > 0 && (
                            <div className="footer-social">
                                {socialLinks.map(social => (
                                    <a
                                        key={social.id}
                                        href={social.platform_link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-link"
                                        title={social.platform_name}
                                    >
                                        {getPlatformIcon(social.platform_name)}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* COLUMN 2 — Quick Links */}
                    <div>
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-links-list">
                            {footerLinks.length > 0 ? (
                                footerLinks.map(link => (
                                    <li key={link.id}>
                                        <Link to={link.link_url}>
                                            {link.link_name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                // Fallback static links
                                ['Home','About Us','Events','Gallery','Membership','Contact'].map(item => (
                                    <li key={item}>
                                        <Link to={`/${item.toLowerCase().replace(' ', '-')}`}>
                                            {item}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* COLUMN 3 — Useful Links */}
                    <div>
                        <h4 className="footer-col-title">Useful Links</h4>
                        <ul className="footer-links-list">
                            <li><Link to="/membership">Membership Benefits</Link></li>
                            <li><Link to="/events">Upcoming Events</Link></li>
                            <li><Link to="/gallery">Photo Gallery</Link></li>
                            <li><Link to="/news">Latest News</Link></li>
                            <li><Link to="/contact">Get in Touch</Link></li>
                            <li><Link to="/register">Join Us</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 4 — Contact */}
                    <div>
                        <h4 className="footer-col-title">Contact Us</h4>
                        <ul className="footer-contact-list">
                            <li className="footer-contact-item">
                                <span className="footer-contact-icon">📍</span>
                                <span>{header?.address || fallback.address}</span>
                            </li>
                            <li className="footer-contact-item">
                                <span className="footer-contact-icon">📞</span>
                                <a href={`tel:${header?.phone_number || fallback.phone}`}>
                                    {header?.phone_number || fallback.phone}
                                </a>
                            </li>
                            <li className="footer-contact-item">
                                <span className="footer-contact-icon">✉️</span>
                                <a href={`mailto:${header?.email || fallback.email}`}>
                                    {header?.email || fallback.email}
                                </a>
                            </li>
                            <li className="footer-contact-item">
                                <span className="footer-contact-icon">🌍</span>
                                <span>{header?.location || fallback.location}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* ── BOTTOM BAR ── */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        {header?.copyright_text || `© ${new Date().getFullYear()} VRKSS. All Rights Reserved.`}
                    </p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Use</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer