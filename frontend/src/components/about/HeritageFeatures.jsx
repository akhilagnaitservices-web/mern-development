import {
    FaShieldAlt,
    FaGopuram,
    FaScroll,
    FaUsers
} from "react-icons/fa";

const getFeatureIcon = (title) => {
    const icons = {
        "Warrior Heritage": <FaShieldAlt />,
        "Temple Guardians": <FaGopuram />,
        "Inscriptions & Proofs": <FaScroll />,
        "Cultural Unity": <FaUsers />,
    };

    return icons[title] || <FaShieldAlt />;
};

const HeritageFeatures = ({ features }) => {

    if (!features.length) return null

    return (
        <section className="proud-descendants">

            <div className="container">

                <p className="who-section-label">
                    Who We Are
                </p>

                <h2 className="section-title center">
                    The Proud Descendants of
                    Gajapati Kshatriyas
                </h2>

               

                <div className="heritage-grid">

                    {features.map(feature => (

                        <div
                            key={feature.id}
                            className="heritage-card"
                        >

                            <span className="heritage-icon">
                                {getFeatureIcon(feature.title)}
                            </span>

                            <h3 className="heritage-title">
                                {feature.title}
                            </h3>

                            <p className="heritage-desc">
                                {feature.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    )
}

export default HeritageFeatures