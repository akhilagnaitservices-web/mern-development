import { Link } from 'react-router-dom'

const AboutHero = ({ title, subtitle, image }) => {
    return (
        <div className="page-banner">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="page-banner-img"
                />
            )}

            <div className="page-banner-overlay" />

            <div className="container">

                <div className="page-banner-content">

                    <div className="page-banner-breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>{title}</span>
                    </div>

                    <h1 className="page-banner-title">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="page-banner-subtitle">
                            {subtitle}
                        </p>
                    )}

                </div>

            </div>
        </div>
    )
}

export default AboutHero;