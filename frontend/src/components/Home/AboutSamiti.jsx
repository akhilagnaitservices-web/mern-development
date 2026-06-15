import { Link } from "react-router-dom";
 import { getImageUrl } from "../../utils/imageHelper";
const AboutSamiti = ({ data }) => {

    if (!data) return null;
console.log(data.about_image);
    return (

        <section className="about-samiti">

            <div className="container">

                <div className="about-samiti-inner">

                    <div className="about-samiti-image-wrap">

                        {data.about_image ? (

                            <img
                                src={getImageUrl(data.about_image)}
                                alt={data.about_title}
                                className="about-samiti-img"
                            />

                        ) : (

                            <div className="about-samiti-img-placeholder">
                                🏛️
                            </div>

                        )}

                    </div>

                    <div className="about-samiti-content">

                        <h2 className="section-title">
                            {data.about_title}
                        </h2>

                        {data.about_subtitle && (

                            <p className="section-subtitle">
                                {data.about_subtitle}
                            </p>

                        )}

                        <div className="about-description">

                            {data.about_description && (

                                <p>
                                    {data.about_description}
                                </p>

                            )}

                            {!data.about_description && (

                                <>
                                    <p>{data.vision}</p>

                                    <p style={{ marginTop: "20px" }}>
                                        {data.mission}
                                    </p>

                                    <p style={{ marginTop: "20px" }}>
                                        {data.objectives}
                                    </p>
                                </>

                            )}

                        </div>

                        {data.button_name && (

                            <Link
                                to={data.button_link || "/about"}
                                className="btn btn-primary"
                            >
                                {data.button_name}
                            </Link>

                        )}

                    </div>

                </div>

            </div>

        </section>

    );

};

export default AboutSamiti;