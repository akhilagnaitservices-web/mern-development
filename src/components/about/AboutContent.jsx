import { Link } from 'react-router-dom'

const AboutContent = ({ about }) => {

    if (!about) return null

    return (
        <section className="who-we-are">

            <div className="container">

                <div className="who-we-are-inner">

                    <div className="who-we-are-img-wrap">

                        {about.about_image ? (
                            <img
                                src={about.about_image}
                                alt={about.about_title}
                                className="who-we-are-img"
                            />
                        ) : (
                            <div className="who-we-are-img-placeholder">
                                🏛️
                            </div>
                        )}

                    </div>

                    <div>

                        <p className="who-section-label center">
                            Who We Are
                        </p>

                        <h2 className="section-title">
                            {about.about_title}
                        </h2>
                        <div className="about-description">
                                <p>
                                    {about.description}
                                </p>
                        </div>

                        {about.button_name && (
                            <Link
                                to={about.button_link || '#'}
                                className="btn btn-primary"
                            >
                                {about.button_name}
                            </Link>
                        )}

                    </div>

                </div>

            </div>

        </section>
    )
}

export default AboutContent