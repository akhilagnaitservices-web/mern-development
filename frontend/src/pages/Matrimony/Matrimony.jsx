import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/matrimony.css";

import {
    FaHeart,
    FaShieldAlt,
    FaUserCheck,
    FaLock,
    FaHeadset,
    FaSearch,
    FaUserPlus,
    FaComments,
    FaRing,
    FaQuoteLeft,
    FaCheckCircle,
    FaMapMarkerAlt,
    FaBriefcase,
    FaChevronDown,
} from "react-icons/fa";

const FEATURES = [
    {
        icon: FaShieldAlt,
        title: "Verified Profiles",
        text: "Every profile is manually reviewed to keep our community genuine and trustworthy.",
    },
    {
        icon: FaUserCheck,
        title: "Community Focused",
        text: "Built exclusively for the Vadiyaraju Kshatriya community and its traditions.",
    },
    {
        icon: FaLock,
        title: "Privacy Protected",
        text: "Your contact details stay private until you choose to share them.",
    },
    {
        icon: FaHeadset,
        title: "Dedicated Support",
        text: "Our relationship team is available to guide you at every step.",
    },
];

const PROFILES = [
    {
        name: "Priya S.",
        age: 26,
        role: "Software Engineer",
        location: "Hyderabad, Telangana",
        gothra: "Kashyapa",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    },
    {
        name: "Arjun R.",
        age: 29,
        role: "Chartered Accountant",
        location: "Bengaluru, Karnataka",
        gothra: "Bharadwaja",
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
    },
    {
        name: "Meera K.",
        age: 27,
        role: "Doctor (MBBS)",
        location: "Vijayawada, AP",
        gothra: "Vasishta",
        img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop",
    },
    {
        name: "Karthik N.",
        age: 31,
        role: "Business Owner",
        location: "Chennai, Tamil Nadu",
        gothra: "Atreya",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    },
];

const STEPS = [
    { icon: FaUserPlus, title: "Create Profile", text: "Register and build a detailed, verified profile in minutes." },
    { icon: FaSearch, title: "Find Matches", text: "Search and filter profiles that match your preferences." },
    { icon: FaComments, title: "Connect Safely", text: "Start conversations securely within the platform." },
    { icon: FaRing, title: "Begin Your Journey", text: "Take the next step towards a lifelong partnership." },
];

const STORIES = [
    {
        names: "Ramesh & Lakshmi",
        text: "We found each other through this platform and instantly connected over shared values. Forever grateful to the Samiti for bringing our families together.",
        location: "Married in Hyderabad",
    },
    {
        names: "Suresh & Anitha",
        text: "The verified profiles gave our families confidence from day one. What started as a simple search ended in a beautiful wedding.",
        location: "Married in Vijayawada",
    },
    {
        names: "Vikram & Divya",
        text: "A trustworthy platform within our own community — it made the entire journey comfortable for both families.",
        location: "Married in Bengaluru",
    },
];

const PLANS = [
    {
        name: "Free",
        price: "₹0",
        period: "forever",
        features: ["Create profile", "Browse limited profiles", "Basic search filters", "Community support"],
        cta: "Get Started",
        highlight: false,
    },
    {
        name: "Premium",
        price: "₹1,999",
        period: "/ 3 months",
        features: ["Unlimited profile views", "Contact details access", "Advanced filters", "Priority support", "Profile highlighting"],
        cta: "Choose Premium",
        highlight: true,
    },
    {
        name: "Premium+",
        price: "₹3,999",
        period: "/ 6 months",
        features: ["Everything in Premium", "Dedicated relationship manager", "Verified badge", "Featured profile listing", "Personalized matchmaking"],
        cta: "Choose Premium+",
        highlight: false,
    },
];

const FAQS = [
    {
        q: "Is this Matrimony platform only for the Vadiyaraju Kshatriya community?",
        a: "Yes, this service is exclusively curated for members of the Vadiyaraju Kshatriya Seva Samiti community and their families.",
    },
    {
        q: "How are profiles verified?",
        a: "Every profile submitted goes through a manual review process by our team before being made visible to other members.",
    },
    {
        q: "Is my personal information kept private?",
        a: "Yes. Contact details and sensitive information are only shared with matches you personally approve.",
    },
    {
        q: "Can I upgrade my plan later?",
        a: "Absolutely. You can upgrade from Free to Premium or Premium+ at any time from your account.",
    },
];

const Matrimony = () => {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <div className="matrimony-page">

            {/* HERO */}
            <section className="matri-hero">
                <div className="matri-hero-overlay" />
                <div className="container matri-hero-content">
                    <span className="matri-hero-badge">Vadiyaraju Kshatriya Matrimony</span>
                    <h1>Where Two Families Become One</h1>
                    <p>
                        A trusted matrimonial platform built for our community — helping you find a
                        life partner who shares your values, traditions, and dreams.
                    </p>
                    <div className="matri-hero-actions">
                        <Link to="/matrimony/register" className="btn btn-primary">Register Free</Link>
                        <a href="#search" className="btn btn-outline-gold">Find a Partner</a>
                    </div>
                </div>
            </section>

            {/* QUICK SEARCH */}
            <section id="search" className="matri-search-section">
                <div className="container">
                    <div className="matri-search-card">
                        <div className="matri-search-grid">
                            <div className="matri-search-field">
                                <label>Looking For</label>
                                <select defaultValue="">
                                    <option value="" disabled>Select Gender</option>
                                    <option>Bride</option>
                                    <option>Groom</option>
                                </select>
                            </div>
                            <div className="matri-search-field">
                                <label>Age Range</label>
                                <select defaultValue="">
                                    <option value="" disabled>Select Age</option>
                                    <option>21 - 25</option>
                                    <option>26 - 30</option>
                                    <option>31 - 35</option>
                                    <option>36+</option>
                                </select>
                            </div>
                            <div className="matri-search-field">
                                <label>Religion</label>
                                <select defaultValue="">
                                    <option value="" disabled>Select Religion</option>
                                    <option>Hindu</option>
                                </select>
                            </div>
                            <div className="matri-search-field">
                                <label>Gothram</label>
                                <select defaultValue="">
                                    <option value="" disabled>Select Gothram</option>
                                    <option>Kashyapa</option>
                                    <option>Bharadwaja</option>
                                    <option>Vasishta</option>
                                    <option>Atreya</option>
                                </select>
                            </div>
                            <div className="matri-search-field">
                                <label>Mother Tongue</label>
                                <select defaultValue="">
                                    <option value="" disabled>Select Language</option>
                                    <option>Telugu</option>
                                    <option>Hindi</option>
                                    <option>Tamil</option>
                                    <option>Kannada</option>
                                </select>
                            </div>
                            <div className="matri-search-field">
                                <label>Profession</label>
                                <select defaultValue="">
                                    <option value="" disabled>Select Profession</option>
                                    <option>Engineer</option>
                                    <option>Doctor</option>
                                    <option>Business</option>
                                    <option>Government Employee</option>
                                </select>
                            </div>
                            <div className="matri-search-field">
                                <label>Location</label>
                                <select defaultValue="">
                                    <option value="" disabled>Select Location</option>
                                    <option>Hyderabad</option>
                                    <option>Vijayawada</option>
                                    <option>Bengaluru</option>
                                    <option>Chennai</option>
                                </select>
                            </div>
                            <div className="matri-search-field matri-search-btn-wrap">
                                <Link to="/matrimony/register" className="btn btn-primary matri-search-btn">
                                    <FaSearch /> Search Profiles
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="section matri-why">
                <div className="container">
                    <h2 className="section-title center">Why Choose Our Matrimony</h2>
                    <p className="section-subtitle center">
                        A platform built on trust, community values, and genuine connections.
                    </p>
                    <div className="matri-features-grid">
                        {FEATURES.map((f) => (
                            <div className="matri-feature-card" key={f.title}>
                                <div className="matri-feature-icon"><f.icon /></div>
                                <h4>{f.title}</h4>
                                <p>{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED PROFILES */}
            <section className="section matri-profiles-section">
                <div className="container">
                    <h2 className="section-title center">Featured Profiles</h2>
                    <p className="section-subtitle center">
                        A glimpse of verified members looking for their life partner.
                    </p>
                    <div className="matri-profiles-grid">
                        {PROFILES.map((p) => (
                            <div className="matri-profile-card" key={p.name}>
                                <div className="matri-profile-img-wrap">
                                    <img src={p.img} alt={p.name} />
                                    <span className="matri-verified-badge"><FaCheckCircle /> Verified</span>
                                </div>
                                <div className="matri-profile-info">
                                    <h4>{p.name}, {p.age}</h4>
                                    <p className="matri-profile-role"><FaBriefcase /> {p.role}</p>
                                    <p className="matri-profile-location"><FaMapMarkerAlt /> {p.location}</p>
                                    <span className="matri-gothra-tag">{p.gothra} Gothra</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="matri-profiles-cta">
                        <Link to="/matrimony/register" className="btn btn-outline">View All Profiles</Link>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="section matri-steps-section">
                <div className="container">
                    <h2 className="section-title center">How It Works</h2>
                    <p className="section-subtitle center">
                        Your journey to finding a life partner in four simple steps.
                    </p>
                    <div className="matri-steps-grid">
                        {STEPS.map((s, i) => (
                            <div className="matri-step-card" key={s.title}>
                                <div className="matri-step-number">{i + 1}</div>
                                <div className="matri-step-icon"><s.icon /></div>
                                <h4>{s.title}</h4>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUCCESS STORIES */}
            <section className="section matri-stories-section">
                <div className="container">
                    <h2 className="section-title center light">Success Stories</h2>
                    <p className="section-subtitle center light">
                        Real couples, real journeys, brought together through our community.
                    </p>
                    <div className="matri-stories-grid">
                        {STORIES.map((s) => (
                            <div className="matri-story-card" key={s.names}>
                                <FaQuoteLeft className="matri-quote-icon" />
                                <p>{s.text}</p>
                                <h5>{s.names}</h5>
                                <span>{s.location}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MEMBERSHIP PLANS */}


            {/* FAQ */}
            <section className="section matri-faq-section">
                <div className="container matri-faq-container">
                    <h2 className="section-title center">Frequently Asked Questions</h2>
                    <div className="matri-faq-list">
                        {FAQS.map((f, i) => (
                            <div className={`matri-faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
                                <button
                                    className="matri-faq-question"
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                >
                                    {f.q}
                                    <FaChevronDown className="matri-faq-arrow" />
                                </button>
                                {openFaq === i && <p className="matri-faq-answer">{f.a}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="matri-final-cta">
                <div className="container matri-final-cta-content">
                    <FaHeart className="matri-final-cta-icon" />
                    <h2>Begin Your Journey Towards a Happy Marriage</h2>
                    <p>Join thousands of families who trust us to help them find the perfect match.</p>
                    <Link to="/matrimony/register" className="btn btn-secondary">Register Now — It's Free</Link>
                </div>
            </section>

        </div>
    );
};

export default Matrimony;
