    import {
    FaHandsHelping,
    FaUsers,
    FaBalanceScale,
    FaHeart,
    FaBookOpen,
    FaShieldAlt,
    FaStar
} from "react-icons/fa";
    
    const CoreValues = ({ values }) => {

        const getCoreValueIcon = (title) => {

    const icons = {
        "Unity": <FaUsers />,
        "Service": <FaHandsHelping />,
        "Integrity": <FaBalanceScale />,
        "Respect": <FaHeart />,
        "Education": <FaBookOpen />,
        "Heritage": <FaShieldAlt />,
        "Excellence": <FaStar />
    };

    return icons[title] || <FaStar />;
};
        if (!values.length) return null

        return (

            <section className="core-values">

                <div className="container">

                    <h2 className="section-title center">
                        Our Core Values
                    </h2>

                    <div className="core-values-grid">

                        {values.map(value => (

                            <div
                                key={value.id}
                                className="core-value-card"
                            >

                                <div className="core-value-icon">
                                    {getCoreValueIcon(value.title)}
                                </div>

                                <h3 className="core-value-title">
                                    {value.title}
                                </h3>

                                <p className="core-value-desc">
                                    {value.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

        )
    }

    export default CoreValues