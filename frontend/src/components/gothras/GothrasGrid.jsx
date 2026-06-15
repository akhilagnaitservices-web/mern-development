import { useState } from 'react'
import {
    FaMountainSun,
    FaBookOpen,
    FaStar,
    FaScaleBalanced,
    FaLeaf,
    FaShieldHalved,
    FaCrown,
    FaScroll,
    FaOm,
    FaHandsPraying,
    FaToriiGate,
    FaLightbulb,
    FaLandmark
} from "react-icons/fa6";
// Default icons based on letter
const iconMap = {

    "fa-mountain-sun": FaMountainSun,

    "fa-book-open": FaBookOpen,

    "fa-star": FaStar,

    "fa-scale-balanced": FaScaleBalanced,

    "fa-leaf": FaLeaf,

    "fa-shield-halved": FaShieldHalved,

    "fa-crown": FaCrown,

    "fa-scroll": FaScroll,

    "fa-om": FaOm,

    "fa-hands-praying": FaHandsPraying,

    "fa-torii-gate": FaToriiGate,

    "fa-lightbulb": FaLightbulb,

    "fa-landmark": FaLandmark

};
const getDefaultIcon = (name) => {
    const icons = {
        A: '🌅', B: '📚', C: '⚡', D: '🌿', G: '🌟',
        H: '🏔️', K: '👑', M: '🌙', P: '🔱', S: '☀️',
        V: '🦅', Y: '🎯',
    }
    const firstLetter = name?.charAt(0)?.toUpperCase()
    return icons[firstLetter] || '🔱'
}

// ── Gothra Detail Modal ──
const GothraModal = ({ gothra, onClose }) => {
    if (!gothra) return null

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div className="gothra-modal-backdrop" onClick={handleBackdrop}>
            <div className="gothra-modal">

                <div className="gothra-modal-header">
                    <button className="gothra-modal-close" onClick={onClose}>✕</button>
                    <span className="gothra-modal-icon">
                        {gothra.icon || getDefaultIcon(gothra.gothra_name)}
                    </span>
                    <h2 className="gothra-modal-name">{gothra.gothra_name}</h2>
                    <span className="gothra-modal-badge">
                        Alphabetical: {gothra.alphabetical_letter}
                    </span>
                </div>

                <div className="gothra-modal-body">
                    {gothra.short_description && (
                        <p className="gothra-modal-desc">{gothra.short_description}</p>
                    )}

                    <div className="gothra-modal-info">
                        <div className="gothra-modal-info-item">
                            <p className="gothra-modal-info-label">Gothra Name</p>
                            <p className="gothra-modal-info-value">{gothra.gothra_name}</p>
                        </div>
                        <div className="gothra-modal-info-item">
                            <p className="gothra-modal-info-label">First Letter</p>
                            <p className="gothra-modal-info-value">{gothra.alphabetical_letter}</p>
                        </div>
                    </div>

                    {/* <button
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '24px' }}
                        onClick={onClose}
                    >
                        Close
                    </button> */}
                </div>

            </div>
        </div>
    )
}

// ── Single Gothra Card ──
const GothraCard = ({ gothra, onView }) => {

    const IconComponent =
        iconMap[gothra.icon];

    return (

        <div
            className="gothra-card"
            onClick={() => onView(gothra)}
        >

            <div className="gothra-icon-wrap">

                {IconComponent ? (

                    <IconComponent
                        size={42}
                    />

                ) : (

                    <FaOm
                        size={42}
                    />

                )}

            </div>

            <span className="gothra-letter-badge">
                {gothra.alphabetical_letter}
            </span>

            <h3 className="gothra-name">
                {gothra.gothra_name}
            </h3>

            {gothra.short_description && (

                <p className="gothra-desc">
                    {gothra.short_description}
                </p>

            )}

            {/* <button className="gothra-view-link">
                View Details →
            </button> */}

        </div>

    );
};

// ── Main Grid Component ──
const GothrasGrid = ({ gothras }) => {
    const [selected, setSelected] = useState(null)

    if (!gothras.length) {
        return (
            <div className="gothras-grid">
                <div className="gothras-empty">
                    <span className="gothras-empty-icon">🔍</span>
                    <p>No Gothras found matching your search.</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <p className="gothras-count">
                Showing <strong>{gothras.length}</strong> Gothra{gothras.length !== 1 ? 's' : ''}
            </p>

            <div className="gothras-grid">
                {gothras.map(gothra => (
                    <GothraCard
                        key={gothra.id}
                        gothra={gothra}
                        onView={setSelected}
                    />
                ))}
            </div>

            {selected && (
                <GothraModal
                    gothra={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    )
}

export default GothrasGrid