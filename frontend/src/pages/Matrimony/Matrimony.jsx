import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/matrimony.css";
import {
    FaUserTie,
    FaCalendarAlt,
    FaLock,
    FaQuoteLeft,
    FaChevronDown,
    FaCheckCircle,
    FaUsers,
    FaThumbsUp,
} from "react-icons/fa";

const STATS = [
    { icon: FaUserTie, title: "Top Consultants", text: "Will manage your profile." },
    { icon: FaCalendarAlt, title: "20+ Years", text: "20+ years of matchmaking expertise, finding your ideal match." },
    { icon: FaThumbsUp, title: "1.6 LAKH+ VIPs", text: "1.6 LAKH+ VIPs have entrusted us to find their perfect match." },
    { icon: FaLock, title: "100% Privacy", text: "You have the choice of keeping your profile info 100% confidential and discreet." },
];

const STORIES = [
    {
        names: "Priya & Arjun",
        img: "/images/Inspiring4.jpg",
        tag: "Family Approved",
        text: "We found each other through a process that felt respectful to both families.",
    },
    {
        names: "Meera & Karthik",
        img: "/images/Inspiring2.jpg",
        tag: "Trusted Match",
        text: "A trusted community platform that helped us connect with confidence.",
    },
    {
        names: "Sravya & Kiran",
        img: "/images/Inspiring3.jpg",
        tag: "Community Blessing",
        text: "The introductions were genuine, private, and guided with care at every step.",
    },

];

const FAQS = [
    { q: "Is this only for the Vadiyaraju Kshatriya community?", a: "Yes, this service is exclusively for our community and their families." },
    { q: "How are profiles verified?", a: "Each profile is manually reviewed before it becomes visible to eligible families." },
    { q: "Is my information kept private?", a: "Yes. Personal details are shared only with matches you approve." },
];

const PROCESS = [
    "Create a complete family-approved profile",
    "Consultants review and verify the details",
    "Receive suitable introductions with privacy control",
];

const REVIEWS = [
    { name: "Srinivas Family", text: "The team guided us with patience and introduced profiles that matched our expectations." },
    { name: "Lakshmi & Ramesh", text: "A dignified and private process. Both families felt comfortable from the first call." },
    { name: "Anitha Family", text: "Profiles were genuine, communication was clear, and the support was very personal." },
    { name: "Kiran & Sravya", text: "We found the right connection through VRKSS and are thankful for the community support." },
];

const Matrimony = () => {
    const [openFaq, setOpenFaq] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setReviewIndex((current) => (current + 1) % REVIEWS.length);
        }, 3500);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="matrimony-page">
            <section className="matri-hero">
                <div className="matri-hero__overlay" />
                <div className="container matri-hero__grid">
                    <div className="matri-hero__content">
                        {/* <span className="matri-eyebrow">Vadiyaraju Kshatriya Matrimony</span> */}
                        <h1>Find a match rooted in family, trust, and tradition.</h1>
                        <p>
                            A premium community matrimony experience with genuine profiles,
                            guided introductions, and privacy at every step.
                        </p>
                        <div className="matri-hero__actions">
                            <Link to="/matrimony/register" className="matri-btn matri-btn--primary">Register Free</Link>
                            {/* <a href="#faq" className="matri-btn matri-btn--secondary">Learn More</a> */}
                        </div>
                    </div>

               
                </div>
            </section>

            <section className="matri-section matri-section--raised">
                <div className="container">
                    <h2 className="matri-advantage-title">The Advantages</h2>
                    <div className="matri-stats">
                        {STATS.map((s) => (
                            <article className="matri-stat-card" key={s.title}>
                                <span className="matri-icon"><s.icon /></span>
                                <h4>{s.title}</h4>
                                <p>{s.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="matri-section">
                <div className="container">
                    <div className="matri-section-header">
                        <span className="matri-kicker">Success Stories</span>
                        <h2>Inspiring Stories</h2>
                        <p>Real connections shaped through community values and thoughtful introductions.</p>
                    </div>
                    <div className="matri-story-grid">
                        {STORIES.map((s) => (
                            <article className="matri-story-card" key={s.names}>
                                <div className="matri-story-card__image">
                                    <img src={s.img} alt={s.names} />
                                </div>
                                <div className="matri-story-card__body">
                                    <span>{s.tag}</span>
                                    <h4>{s.names}</h4>
                                    <FaQuoteLeft className="matri-story-card__quote" />
                                    <p>{s.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="matri-testimonial">
                <div className="container matri-testimonial__inner">
                    <FaQuoteLeft className="matri-quote-icon" />
                    <h3>What Our Customers Say</h3>
                    <p className="matri-review-text">"{REVIEWS[reviewIndex].text}"</p>
                    <strong className="matri-review-name">{REVIEWS[reviewIndex].name}</strong>
                    <div className="matri-review-dots" aria-label="Review slider">
                        {REVIEWS.map((review, index) => (
                            <button
                                className={reviewIndex === index ? "active" : ""}
                                key={review.name}
                                type="button"
                                aria-label={`Show review ${index + 1}`}
                                onClick={() => setReviewIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="matri-section matri-experience">
                <div className="container matri-experience__grid">
                    <div className="matri-experience__content">
                        <span className="matri-kicker">The VRKSS Experience</span>
                        <h2>A graceful process for an important family decision.</h2>
                        <p>
                            With years of community trust, we help families discover suitable
                            matches while respecting privacy, tradition, and personal choice.
                        </p>
                        <div className="matri-process">
                            {PROCESS.map((item, index) => (
                                <div className="matri-process__item" key={item}>
                                    <span>{index + 1}</span>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <img
                        src="/images/matrimony_experience.png"
                        alt="Families celebrating a wedding"
                    />
                </div>
            </section>

            <section id="faq" className="matri-section matri-faq">
                <div className="container matri-faq__inner">
                    <div className="matri-section-header">
                        <span className="matri-kicker">Questions</span>
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    {FAQS.map((f, i) => {
                        const isOpen = openFaq === i;

                        return (
                            <article className={`matri-faq__item ${isOpen ? "is-open" : ""}`} key={f.q}>
                                <button
                                    className="matri-faq__question"
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                                >
                                    <span>{f.q}</span>
                                    <FaChevronDown />
                                </button>
                                {isOpen && <p className="matri-faq__answer">{f.a}</p>}
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Matrimony;
