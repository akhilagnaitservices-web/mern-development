const NewsFilter = ({ categories, activeCategory, setActiveCategory, search, setSearch }) => {
    return (
        <div className="news-filters">
            <div className="container">
                <div className="news-filters-inner">
                    <div className="news-filter-tabs">
                        <button
                            className={`filter-tab ${activeCategory === '' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('')}
                        >
                            All News
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.category_id}
                                className={`filter-tab ${activeCategory === cat.category_id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.category_id)}
                            >
                                {cat.category_name}
                            </button>
                        ))}
                    </div>
                    <div className="events-search">
                        <span className="events-search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search news..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsFilter