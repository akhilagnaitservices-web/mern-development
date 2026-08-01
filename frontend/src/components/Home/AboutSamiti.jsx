import { Link } from "react-router-dom";
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
                                src={data.about_image}
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

                        <div className="about-description">
                                <p>
                                    {data.description}
                                </p>
                        </div>

                        <Link to="/about" className="btn btn-primary">
                            Read More
                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default AboutSamiti;