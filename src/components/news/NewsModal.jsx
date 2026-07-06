const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}

const NewsModal = ({ news, onClose }) => {
    if (!news) return null

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <div className="news-modal-backdrop" onClick={handleBackdrop}>
            <div className="news-modal">

                {/* Hero Image */}
                <div className="news-modal-hero">
                    {news.featured_image ? (
                        <img src={news.featured_image} alt={news.news_title} />
                    ) : (
                        <div style={{
                            width: '100%', height: '100%',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '5rem'
                        }}>📰</div>
                    )}
                    <div className="news-modal-hero-overlay" />
                    <button className="news-modal-close" onClick={onClose}>✕</button>
                    <div className="news-modal-hero-content">
                        {news.category_name && (
                            <span className="news-modal-category">{news.category_name}</span>
                        )}
                        <h2 className="news-modal-title">{news.news_title}</h2>
                    </div>
                </div>

                {/* Body */}
                <div className="news-modal-body">
                    <div className="news-modal-meta">
                        {news.news_date && (
                            <span className="news-modal-meta-item">
                                📅 {formatDate(news.news_date)}
                            </span>
                        )}
                        {news.author_name && (
                            <span className="news-modal-meta-item">
                                ✍️ {news.author_name}
                            </span>
                        )}
                        {news.view_count > 0 && (
                            <span className="news-modal-meta-item">
                                👁️ {news.view_count} views
                            </span>
                        )}
                        {news.popular_news === 'Yes' && (
                            <span className="news-modal-meta-item"
                                style={{ color: 'var(--secondary)', fontWeight: 600 }}>
                                🔥 Popular
                            </span>
                        )}
                    </div>

                    <div
                        className="news-modal-content"
                        dangerouslySetInnerHTML={{
                            __html: news.news_content || news.short_description || ''
                        }}
                    />
                </div>

            </div>
        </div>
    )
}

export default NewsModal