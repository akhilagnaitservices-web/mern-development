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

// ── Single Gothra Card ──
const GothraCard = ({ gothra }) => {

    const IconComponent =
        iconMap[gothra.icon];

    return (

        <div className="gothra-card">

            <div className="gothra-icon-wrap">

                {IconComponent ? (

                    <IconComponent
                    className="gothra-icon"
                        size={42}
                    />

                ) : (

                    <FaOm
                        className="gothra-icon"
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
                    />
                ))}
            </div>
        </>
    )
}

export default GothrasGrid