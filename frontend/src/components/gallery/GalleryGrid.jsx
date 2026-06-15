const GalleryGrid = ({ photos, openLightbox, albumTitle, onBack }) => {
    if (!photos.length) return (
        <div className="gallery-empty">
            <span className="gallery-empty-icon">🖼️</span>
            <p>No photos in this album yet.</p>
            {onBack && (
                <button
                    className="btn btn-outline"
                    style={{ marginTop: '16px' }}
                    onClick={onBack}
                >
                    ← Back to Albums
                </button>
            )}
        </div>
    )

    return (
        <div>
            {/* Album header with back button */}
            {albumTitle && (
                <div className="gallery-photos-header">
                    <div>
                        <h2 className="gallery-section-title">
                            📸 {albumTitle}
                        </h2>
                        <p style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-muted)',
                            marginTop: '4px'
                        }}>
                            {photos.length} photo{photos.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    {onBack && (
                        <button
                            className="gallery-back-btn"
                            onClick={onBack}
                        >
                            ← Back to Albums
                        </button>
                    )}
                </div>
            )}

            <div className="gallery-masonry">
                {photos.map((photo, index) => (
                    <div
                        key={photo.photo_id}
                        className="gallery-masonry-item"
                        onClick={() => openLightbox(photo, index)}
                    >
                        {photo.photo_image ? (
                            <img
                                src={photo.photo_image}
                                alt={photo.image_alt_tag || photo.photo_title || ''}
                                className="gallery-masonry-img"
                                loading="lazy"
                            />
                        ) : (
                            <div className="gallery-masonry-placeholder">🖼️</div>
                        )}

                        <div className="gallery-masonry-overlay">
                            <span className="gallery-overlay-icon">🔍</span>
                            {photo.photo_title && (
                                <p className="gallery-overlay-title">
                                    {photo.photo_title}
                                </p>
                            )}
                        </div>

                        {photo.featured_photo === 'yes' && (
                            <span className="gallery-featured-badge">⭐ Featured</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GalleryGrid