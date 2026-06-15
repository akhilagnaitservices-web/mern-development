    import { useState, useEffect, useCallback } from 'react'
    import { Link } from 'react-router-dom'
    import { getImageUrl } from "../../utils/imageHelper";

    const HeroBanner = ({ banners }) => {
        const [current, setCurrent] = useState(0)

        const next = useCallback(() => {
            setCurrent((c) => (c + 1) % banners.length)
        }, [banners.length])

        const prev = () => {
            setCurrent((c) => (c - 1 + banners.length) % banners.length)
        }

        useEffect(() => {
            if (banners.length <= 1) return

            const timer = setInterval(next, 5000)

            return () => clearInterval(timer)
        }, [next, banners.length])

        if (!banners.length) {
            return (
                <section className="hero">
                    <div className="hero-skeleton" />
                </section>
            )
        }
    // console.log("BANNERS", banners);
        return (
            <section className="hero">
                {banners.map((banner, i) => (
                    <div
                        key={banner.id}
                        className={`hero-slide ${i === current ? 'active' : ''}`}
                    >
                        {banner.banner_image ? (
                        <img
                                src={getImageUrl(banner.banner_image)}
                                alt={banner.banner_title}
                                className="hero-img"
                            />
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background:
                                        'linear-gradient(135deg,#2C1810 0%,#7A1F1F 50%,#2C1810 100%)',
                                }}
                            />
                        )}

                        <div className="hero-overlay" />

                        <div className="hero-content">
                            <p className="hero-welcome">Welcome to</p>

                            <h1 className="hero-title">
                                {banner.banner_title
                                    ?.split(' ')
                                    .slice(0, 2)
                                    .join(' ')}{' '}
                                <span>
                                    {banner.banner_title
                                        ?.split(' ')
                                        .slice(2)
                                        .join(' ')}
                                </span>
                            </h1>

                            {banner.banner_subtitle && (
                                <p className="hero-subtitle">
                                    {banner.banner_subtitle}
                                </p>
                            )}

                            <div className="hero-buttons">
                                {banner.button1_name && (
                                    <Link
                                        to={
                                            banner.button1_link || '/membership'
                                        }
                                        className="btn btn-secondary"
                                    >
                                        {banner.button1_name}
                                    </Link>
                                )}

                                {banner.button2_name && (
                                    <Link
                                        to={banner.button2_link || '/about'}
                                        className="btn btn-outline"
                                    >
                                        {banner.button2_name}
                                    </Link>
                                )}

                                {banner.button3_name && (
                                    <Link
                                        to={banner.button3_link || '/register'}
                                        className="btn btn-outline-gold"
                                    >
                                        {banner.button3_name}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {banners.length > 1 && (
                    <>
                        <button
                            className="hero-arrow hero-arrow-left"
                            onClick={prev}
                        >
                            ‹
                        </button>

                        <button
                            className="hero-arrow hero-arrow-right"
                            onClick={next}
                        >
                            ›
                        </button>

                        <div className="hero-dots">
                            {banners.map((_, i) => (
                                <button
                                    key={i}
                                    className={`hero-dot ${
                                        i === current ? 'active' : ''
                                    }`}
                                    onClick={() => setCurrent(i)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </section>
        )
    }

    export default HeroBanner