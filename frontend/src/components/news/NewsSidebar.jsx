import { useState, useEffect } from 'react'
import { getNews, getNewsCategories } from '../../services/newsService'

import {
    FaNewspaper,
    FaUsers,
    FaCalendarAlt,
    FaBullhorn,
    FaLandmark,
    FaUserGraduate,
    FaUniversity
} from "react-icons/fa";
const getCategoryIcon = (categoryName) => {

    switch (categoryName?.toLowerCase()) {

        case "political news":
            return <FaUniversity />;

        case "community news":
            return <FaUsers />;

        case "events & programs":
            return <FaCalendarAlt />;

        case "announcements":
            return <FaBullhorn />;

        case "heritage":
            return <FaLandmark />;

        case "youth":
            return <FaUserGraduate />;

        default:
            return <FaNewspaper />;
    }
};
const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
}

const NewsSidebar = ({ activeCategory, setActiveCategory, onRead }) => {
const [popular, setPopular] = useState([])
const [categories, setCategories] = useState([])
const [allNews, setAllNews] = useState([])
 useEffect(() => {
    Promise.all([
        getNews({ status: 'Published' }),
        getNewsCategories({ status: 'Active' }),
    ])
    .then(([newsRes, catRes]) => {

        console.log("Categories Response:", catRes.data);

        if (newsRes.data?.success) {

            const newsData = newsRes.data.data || [];

            setAllNews(newsData);

            const pop = newsData
                .filter(n => n.popular_news === 'Yes')
                .slice(0, 5);

            setPopular(pop);
        }

        if (catRes.data?.success) {
            setCategories(catRes.data.data || []);
        }
    })
    .catch(console.error);
}, []);

    return (
        <div className="news-sidebar">

            {/* Popular News */}
            {popular.length > 0 && (
                <div className="news-sidebar-card">
                    <h4 className="news-sidebar-title"> Popular News</h4>
                    <div className="popular-news-list">
                        {popular.map((news, index) => (
                            <div
                                key={news.news_id}
                                className="popular-news-item"
                                onClick={() => onRead(news)}
                            >
                                {/* <span className="popular-news-number">
                                    {index + 1}
                                </span> */}
                                {news.featured_image ? (
                                    <img
                                        src={news.featured_image}
                                        alt={news.news_title}
                                        className="popular-news-img"
                                    />
                                ) : (
                                    <div className="popular-news-img-placeholder">
                                        📰
                                    </div>
                                )}
                                <div>
                                    <p className="popular-news-title">
                                        {news.news_title}
                                    </p>

                                    <p className="popular-news-date">
                                        {formatDate(news.news_date)}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            )}

            {/* Categories */}
            {categories.length > 0 && (
                <div className="news-sidebar-card">

                    <h4 className="news-sidebar-title">
                        Categories
                    </h4>

                    <div className="news-cat-list">

                        {/* All News */}
                        <button
                            className={`news-cat-item ${
                                activeCategory === '' ? 'active' : ''
                            }`}
                            onClick={() => setActiveCategory('')}
                        >
                            <div className="news-cat-left">
                                <span className="news-cat-icon">📰</span>
                                <span>All News</span>
                            </div>

                            <div className="news-cat-right">
                                <span className="news-cat-count">
                                    {allNews.length}
                                </span>
                                <span className="news-cat-arrow">›</span>
                            </div>
                        </button>

                        {/* Categories */}
                        {categories
                            .filter(cat => cat.category_name !== "All")
                            .map(cat => {

                                const newsCount = allNews.filter(
                                    news =>
                                        String(news.category_id) ===
                                        String(cat.category_id)
                                ).length

                                return (
                                    <button
                                        key={cat.category_id}
                                        className={`news-cat-item ${
                                            String(activeCategory) ===
                                            String(cat.category_id)
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setActiveCategory(cat.category_id)
                                        }
                                    >
                                        <div className="news-cat-left">
                                            <span className="news-cat-icon">
                                                {getCategoryIcon(cat.category_name)}
                                            </span>

                                            <span>
                                                {cat.category_name}
                                            </span>
                                        </div>

                                        <div className="news-cat-right">
                                            <span className="news-cat-count">
                                                {newsCount}
                                            </span>

                                            <span className="news-cat-arrow">
                                                ›
                                            </span>
                                        </div>
                                    </button>
                                )
                            })}
                    </div>
                </div>
            )}
            <div className="news-sidebar-card newsletter-card">

            <div className="newsletter-icon">
                ✉️
            </div>

            <h4>Stay Updated</h4>

            <p>
                Subscribe to our newsletter
                to get the latest political
                news and updates.
            </p>

            <input
                type="email"
                placeholder="Enter your email address"
            />

            <button>
                Subscribe
            </button>

        </div>
        </div>
    )
}

export default NewsSidebar