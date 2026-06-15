import { Link } from 'react-router-dom'
import { getImageUrl } from "../../utils/imageHelper";
const AboutContent = ({ about }) => {

    if (!about) return null

    return (
        <section className="who-we-are">

            <div className="container">

                <div className="who-we-are-inner">

                    <div className="who-we-are-img-wrap">

                        {about.about_image ? (
                            <img
                                src={getImageUrl(about.about_image)}
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

                        <p className="who-section-label">
                            Who We Are
                        </p>

                        <h2 className="section-title">
                            {about.about_title}
                        </h2>

                        <p className="who-we-are-text">
                            {about.about_subtitle}
                        </p>

                        <p className="who-we-are-text">
                            {about.vision}
                        </p>

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