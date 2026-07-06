import { Link } from "react-router-dom";

const GalleryBanner = ({ banner }) => {
    return (
        <section
            className="page-banner"
            style={{
                backgroundImage: `url(${banner?.banner_image})`
            }}
        >
            <div className="page-banner-overlay"></div>

            <div className="container">
                <div className="page-banner-content">

                    <div className="page-banner-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>Gallery</span>
                    </div>

                    <h1>{banner?.banner_title}</h1>

                    <p>
                        {banner?.banner_subtitle}
                    </p>

                </div>
            </div>
        </section>
    );
};

export default GalleryBanner;