import {
    FaEye,
    FaHandsHelping,
    FaLandmark
} from "react-icons/fa";

const Statistics = ({ about }) => {

    if (!about) return null

    const items = [
    {
    title: 'Our Vision',
    text: about.vision,
    icon: <FaEye />
    },
    {
        title: 'Our Mission',
        text: about.mission,
        icon: <FaHandsHelping />
    },
    {
        title: 'Our Objectives',
        text: about.objectives,
        icon: <FaLandmark />
    }
    ].filter(item => item.text);

    return (

        <section className="vmo-section">

            <div className="container">

                <h2 className="section-title center">
                    Our Vision Mission & Objectives
                </h2>

                <div className="vmo-grid">

                    {items.map((item,index)=>(

                        <div
                            key={index}
                            className="vmo-card"
                        >

                            <div className="vmo-icon">
                                {item.icon}
                            </div>

                            <h3>
                                {item.title}
                            </h3>

                            <p>
                                {item.text}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    )
}

export default Statistics