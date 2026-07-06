import { Link } from "react-router-dom";

import {
    FaUsers,
    FaHeart,
    FaCalendarAlt,
    FaBookOpen
} from "react-icons/fa";

const QuickServices = ({ services }) => {

    if (!services.length) return null;

    const getIcon = (serviceName) => {

        const name = serviceName?.toLowerCase();

        if (name.includes("membership")) {
            return <FaUsers size={34} />;
        }

        if (name.includes("matrimony")) {
            return <FaHeart size={34} />;
        }

        if (name.includes("event")) {
            return <FaCalendarAlt size={34} />;
        }

        if (
            name.includes("gothra") ||
            name.includes("gotra")
        ) {
            return <FaBookOpen size={34} />;
        }

        return <FaUsers size={34} />;
    };

    return (

        <section className="quick-services">

            <div className="container">

                <h2
                    className="section-title center"
                    style={{
                        color: "var(--text-light)"
                    }}
                >
                    Quick Services
                </h2>

                <div className="services-grid">

                    {services.map((service) => (

                        <Link
                            key={service.id}
                            to={service.redirect_url || "#"}
                            className="service-card"
                        >

                            <div className="service-icon">

                                {getIcon(
                                    service.service_name
                                )}

                            </div>

                            <p className="service-name">
                                {service.service_name}
                            </p>

                            {service.short_description && (

                                <p className="service-desc">
                                    {service.short_description}
                                </p>

                            )}

                            <span className="service-link">
                                View More →
                            </span>

                        </Link>

                    ))}

                </div>

            </div>

        </section>

    );
};

export default QuickServices;