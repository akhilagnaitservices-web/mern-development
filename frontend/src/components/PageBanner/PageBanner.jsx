import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/pageBanner.css";
import { getImageUrl } from "../../utils/imageHelper";
    
const PageBanner = ({ page }) => {

    const [banner, setBanner] = useState(null);

    useEffect(() => {

        if (!page) return;

        api
            .get(`/page-banners/page/${page}`)
            .then((res) => {

                console.log("PAGE BANNER", res.data);

                if (res.data?.success) {
                    setBanner(res.data.data);
                }

            })
            .catch(console.error);

    }, [page]);

    return (

        <section
            className="page-banner"
            style={{
                backgroundImage: banner?.banner_image
                    ? `url(${getImageUrl(banner.banner_image)})`
                    : "none"
            }}
        >

            <div className="page-banner-overlay"></div>

            <div className="container">

                <div className="page-banner-content">

                    <div className="breadcrumb">

                        <Link to="/">
                            Home
                        </Link>

                        <span>›</span>

                        <span>
                            {banner?.banner_title || page}
                        </span>

                    </div>

                    <h1 className="page-banner-title">
                        {banner?.banner_title || page}
                    </h1>

                    {banner?.banner_subtitle && (
                        <p className="page-banner-subtitle">
                            {banner.banner_subtitle}
                        </p>
                    )}

                </div>

            </div>

        </section>

    );

};

export default PageBanner;