import { useEffect } from 'react'

const GalleryLightbox = ({
    photo,
    close,
    prev,
    next,
    current,
    total
}) => {

    if (!photo) return null

    useEffect(() => {

        const onKey = (e) => {

            if (e.key === 'Escape') {
                close()
            }

            if (e.key === 'ArrowLeft') {
                prev()
            }

            if (e.key === 'ArrowRight') {
                next()
            }

        }

        window.addEventListener('keydown', onKey)

        return () =>
            window.removeEventListener(
                'keydown',
                onKey
            )

    }, [photo])

    return (

        <div
            className="lightbox"
            onClick={(e) =>
                e.target === e.currentTarget &&
                close()
            }
        >

            <div className="lightbox-content">

                <button
                    className="lightbox-close"
                    onClick={close}
                >
                    ✕
                </button>

                <button
                    className="lightbox-arrow lightbox-arrow-left"
                    onClick={prev}
                >
                    ‹
                </button>

                <div className="lightbox-image-wrapper">

                    {photo.photo_image ? (

                        <img
                            src={photo.photo_image}
                            alt={
                                photo.image_alt_tag ||
                                photo.photo_title ||
                                ''
                            }
                            className="lightbox-img"
                        />

                    ) : (

                        <div className="lightbox-placeholder">
                            🖼️
                        </div>

                    )}

                    {photo.photo_title && (

                        <div className="lightbox-caption">
                            {photo.photo_title}
                        </div>

                    )}

                    {total > 0 && (

                        <div className="lightbox-counter">
                            {current + 1} / {total}
                        </div>

                    )}

                </div>

                <button
                    className="lightbox-arrow lightbox-arrow-right"
                    onClick={next}
                >
                    ›
                </button>

            </div>

        </div>

    )
}

export default GalleryLightbox