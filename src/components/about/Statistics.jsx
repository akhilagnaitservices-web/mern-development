import {
    FaEye,
    FaBullseye,
    FaUsers
} from "react-icons/fa";

const Statistics = ({ about }) => {

    if (!about) return null;

    const items = [
        {
            title: "Our Vision",
            text: about.vision,
            icon: <FaEye />
        },
        {
            title: "Our Mission",
            text: about.mission,
            icon: <FaBullseye />
        },
        {
            title: "Our Objectives",
            text: about.objectives,
            icon: <FaUsers />
        }
    ].filter(item => item.text);

    return (

        <section className="vmo-section">

            <div className="container">

                <div className="section-heading">

                    <h2 className="section-title center">
                        Our Vision Mission & Objectives
                    </h2>

                    <div className="section-divider">
                        {/* <span></span>
                        <span></span>
                        <span></span> */}
                    </div>

                </div>

                <div className="vmo-grid">

                    {items.map((item, index) => (

                        <div
                            className="vmo-item"
                            key={index}
                        >

                            <div className="vmo-icon">

                                {item.icon}

                            </div>

                            <div className="vmo-content">

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.text}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

};

export default Statistics;