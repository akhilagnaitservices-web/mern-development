import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import NewsSidebar from '../../components/news/NewsSidebar'
import PageBanner from "../../components/PageBanner/PageBanner";

import {
    getNewsBySlug,
    getNewsById,
    getNews,
} from '../../services/newsService'

import '../../styles/news.css'
import '../../styles/newsdetails.css'
const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}

const NewsDetails = () => {
    const { slug } = useParams()
    const [news, setNews] = useState(null)
    const [relatedNews, setRelatedNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!slug) return

        setLoading(true)
        setNotFound(false)

        getNewsBySlug(slug)
            .then(res => {
                if (res.data?.success && res.data?.data) {
                    setNews(res.data.data)
                    
                    // Fetch related news
                    getNews({
                        status: 'Published',
                        category_id: res.data.data.category_id
                    })
                        .then(r => {
                            if (r.data?.success) {
                                const filtered = (r.data.data || [])
                                    .filter(n => n.news_slug !== slug)
                                    .slice(0, 3)
                                setRelatedNews(filtered)
                            }
                        })
                        .catch(() => {})
                } else {
                    setNotFound(true)
                }
            })
            .catch(err => {
                console.error('Error fetching news:', err)
                setNotFound(true)
            })
            .finally(() => setLoading(false))

    }, [slug])

    if (loading) return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="spinner" />
        </div>
    )

    if (notFound || !news) return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            textAlign: 'center',
            padding: '40px'
        }}>
            <span style={{ fontSize: '4rem' }}>📰</span>
            <h2 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--primary)',
                fontSize: 'var(--text-3xl)'
            }}>
                News Not Found
            </h2>
            <p style={{ color: 'var(--text-medium)' }}>
                The article you are looking for does not exist.
            </p>
            <Link to="/news" className="btn btn-primary">
                ← Back to News
            </Link>
        </div>
    )

    return (
        <div className="news-detail-page">

            {/* Hero Section */}
            <PageBanner page="news" title={news.news_title} />
            

            {/* Main Content */}
            <section className="news-layout">
                <div className="container">
                    <div className="news-layout-inner" >

                        {/* Left - Article Content */}
                        <div className="news-content">

                            {news.featured_image && (
                                <img 
                                    src={news.featured_image} 
                                    alt={news.news_title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        marginBottom: '32px'
                                    }}
                                />
                            )}

                            {news.short_description && (
                                <p className="news-short-description">
                                    {news.short_description}
                                </p>
                            )}

                            {news.news_content && (
                                <div className="news-full-content">
                                    {news.news_content}
                                </div>
                            )}

                            {/* Related News */}
                            {relatedNews.length > 0 && (
                                <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '2px solid #e5e7eb' }}>
                                    <h3 style={{
                                        fontSize: 'var(--text-2xl)',
                                        fontFamily: 'var(--font-heading)',
                                        marginBottom: '24px',
                                        color: 'var(--primary)'
                                    }}>
                                        📰 Related News
                                    </h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                        gap: '24px'
                                    }}>
                                        {relatedNews.map(item => (
                                            <Link
                                                key={item.news_id}
                                                to={`/news/slug/${item.news_slug}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)'
                                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                                                    e.currentTarget.style.transform = 'translateY(0)'
                                                }}
                                            >
                                                {item.featured_image && (
                                                    <img
                                                        src={item.featured_image}
                                                        alt={item.news_title}
                                                        style={{
                                                            width: '100%',
                                                            height: '180px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                )}
                                                <div style={{ padding: '16px' }}>
                                                    <h4 style={{
                                                        fontSize: 'var(--text-sm)',
                                                        color: 'var(--primary)',
                                                        marginBottom: '8px',
                                                        fontWeight: '600'
                                                    }}>
                                                        {item.category_name}
                                                    </h4>
                                                    <h5 style={{
                                                        fontSize: 'var(--text-base)',
                                                        fontFamily: 'var(--font-heading)',
                                                        marginBottom: '8px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}>
                                                        {item.news_title}
                                                    </h5>
                                                    <p style={{
                                                        fontSize: 'var(--text-xs)',
                                                        color: 'var(--text-medium)'
                                                    }}>
                                                        {formatDate(item.news_date)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                        {/* Right - Sidebar */}
                            <NewsSidebar />
                    </div>
                </div>
            </section>

        </div>
    )

}

export default NewsDetails