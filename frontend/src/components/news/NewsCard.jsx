const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
}

const NewsCard = ({ news, onRead }) => {
    return (
        <div className="news-card-horizontal">

    <div className="news-card-image">
        <img
            src={news.featured_image}
            alt={news.news_title}
        />
    </div>

    <div className="news-card-content">

        <span className="news-category">
            {news.category_name}
        </span>

        <h3>
            {news.news_title}
        </h3>

        <div className="news-meta">
            <span>
                📅 {formatDate(news.news_date)}
            </span>

            <span>
                👤 Admin
            </span>

            <span>
                👁 {news.view_count}
            </span>
        </div>

        <p>
            {news.short_description}
        </p>

        <button
            className="news-read-btn"
        >
            Read More →
        </button>

    </div>

</div>
    )
}

export default NewsCard