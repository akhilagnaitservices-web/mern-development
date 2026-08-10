import { Link } from "react-router-dom";
import { Megaphone } from "lucide-react";

const FlashNews = ({ news }) => {

    if (!news?.length) return null;

    return (

        <section className="flash-news-bar">

            <div className="container">

                <div className="flash-news-wrapper">

                    <div className="flash-news-label">

                        <Megaphone size={16} />

                        <span>
                            FLASH NEWS
                        </span>

                    </div>

                    <div className="flash-news-ticker">

                        <div className="flash-news-track">

                            {[...news, ...news].map(
                                (item, index) => (

                                    <Link
                                        key={index}
                                        to={`/news?slug=${item.news_slug}`}
                                        className="flash-news-item"
                                    >
                                        {item.news_title}
                                    </Link>

                                )
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default FlashNews;