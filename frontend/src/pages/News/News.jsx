import { useState, useEffect, useRef } from 'react'
import NewsFilter from '../../components/news/NewsFilter'
import NewsCard from '../../components/news/NewsCard'
import NewsSidebar from '../../components/news/NewsSidebar'
import NewsModal from '../../components/news/NewsModal'
import PageBanner from "../../components/PageBanner/PageBanner";

import {
    getNews,
    getNewsCategories,
} from '../../services/newsService'

import '../../styles/news.css'

const ITEMS_PER_PAGE = 5

const News = () => {

    const [news, setNews] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const [activeCategory, setActiveCategory] = useState('')
    const [search, setSearch] = useState('')
    const [selectedNews, setSelectedNews] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)

    const newsSectionRef = useRef(null)

    useEffect(() => {

        const params = {
            status: 'Published'
        }

        if (activeCategory)
            params.category_id = activeCategory

        if (search)
            params.search = search

        setLoading(true)

        Promise.all([
            getNews(params),
            getNewsCategories({
                status: 'Active'
            })
        ])
            .then(([newsRes, catRes]) => {

                if (newsRes.data?.success) {

                    const sorted = (newsRes.data.data || [])
                        .slice()
                        .sort((a, b) => {

                            const orderA =
                                a.display_order ?? Infinity

                            const orderB =
                                b.display_order ?? Infinity

                            if (orderA !== orderB)
                                return orderA - orderB

                            return (
                                new Date(b.news_date) -
                                new Date(a.news_date)
                            )

                        })

                    setNews(sorted)

                }

                if (catRes.data?.success)
                    setCategories(
                        catRes.data.data || []
                    )

            })
            .catch(err => {

                console.error(
                    'News error:',
                    err
                )

            })
            .finally(() => {

                setLoading(false)

            })

    }, [activeCategory, search])

    useEffect(() => {

        setCurrentPage(1)

    }, [activeCategory, search])

    const handlePageChange = (page) => {

        setCurrentPage(page)

        setTimeout(() => {

            newsSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })

        }, 100)

    }

    const totalPages = Math.ceil(
        news.length / ITEMS_PER_PAGE
    )

    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE

    const currentNews =
        news.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        )

    return (

        <div className="news-page">

            <PageBanner page="news" />

            <NewsFilter
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                search={search}
                setSearch={setSearch}
            />

            <section className="news-layout">

                <div className="container">

                    <div className="news-layout-inner">

                        <div ref={newsSectionRef}>

                            {loading ? (

                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '80px'
                                    }}
                                >
                                    <div className="spinner" />
                                </div>

                            ) : news.length > 0 ? (

                                <>

                                    <div className="news-grid">

                                        {currentNews.map(item => (

                                            <NewsCard
                                                key={item.news_id}
                                                news={item}
                                                onRead={setSelectedNews}
                                            />

                                        ))}

                                    </div>

                                    {totalPages > 1 && (

                                        <div className="news-pagination">

                                            <button
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage - 1
                                                    )
                                                }
                                            >
                                                Previous
                                            </button>

                                            {Array.from(
                                                { length: totalPages },
                                                (_, index) => (

                                                    <button
                                                        key={index}
                                                        className={
                                                            currentPage === index + 1
                                                                ? 'active'
                                                                : ''
                                                        }
                                                        onClick={() =>
                                                            handlePageChange(
                                                                index + 1
                                                            )
                                                        }
                                                    >
                                                        {index + 1}
                                                    </button>

                                                )
                                            )}

                                            <button
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage + 1
                                                    )
                                                }
                                            >
                                                Next
                                            </button>

                                        </div>

                                    )}

                                </>

                            ) : (

                                <div className="news-empty">

                                    <p
                                        style={{
                                            fontSize: '3rem'
                                        }}
                                    >
                                        📰
                                    </p>

                                    <p>
                                        No news found.
                                    </p>

                                </div>

                            )}

                        </div>

                        <NewsSidebar
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            onRead={setSelectedNews}
                        />

                    </div>

                </div>

            </section>

            {selectedNews && (

                <NewsModal
                    news={selectedNews}
                    onClose={() =>
                        setSelectedNews(null)
                    }
                />

            )}

        </div>

    )

}

export default News