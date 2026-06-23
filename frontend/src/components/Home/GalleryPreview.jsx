import { Link } from 'react-router-dom'
const GalleryPreview = ({ gallery = [] }) => {
    const items = Array.isArray(gallery) ? gallery.slice(0, 7) : []
    const hasItems = items.length > 0

    return (
        <section className="gallery-preview">
            <div className="container">
                <h2 className="section-title center" style={{ color: 'var(--text-light)' }}>
                    Gallery Preview
                </h2>

                {hasItems ? (
                    <div className="gallery-grid">
                        {items.map(item => (
                            <div key={item.id} className="gallery-item">
                                {item.gallery_image ? (
                                    <img src={item.gallery_image} alt={item.image_title || ''} />
                                ) : (
                                    <div className="gallery-item-placeholder">🖼️</div>
                                )}
                                <div className="gallery-item-overlay">
                                    <span>🔍</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="gallery-empty" style={{ color: 'var(--text-light)', textAlign: 'center', padding: '32px 0' }}>
                        No gallery items are available right now.
                    </div>
                )}

                <div className="gallery-view-all">
                    <Link to="/gallery" className="btn btn-outline-gold">View Full Gallery</Link>
                </div>
            </div>
        </section>
    )
}

export default GalleryPreview