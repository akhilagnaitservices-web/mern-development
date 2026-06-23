import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaClock
} from "react-icons/fa";

import { getContactInfo } from "../../services/contactService";
import {
    getEventDetails
} from "../../services/eventsService";

import PageBanner from "../../components/PageBanner/PageBanner";

import EventRegistrationModal
from "../../components/events/EventRegistrationModal";

import "../../styles/eventDetails.css";

const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

};

const EventDetails = () => {

    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [contactInfo, setContactInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRegister,setShowRegister] = useState(false);

    useEffect(() => {

    setLoading(true);

    Promise.all([
        getEventDetails(id),
        getContactInfo()
    ])

    .then(([eventRes, contactRes]) => {

        console.log("EVENT DETAILS", eventRes);
        console.log("CONTACT INFO", contactRes);

        if (eventRes?.success) {

            setEvent(
                eventRes.event
            );

            setGallery(
                eventRes.gallery || []
            );

        }

        if (
            contactRes?.data?.success
        ) {

            setContactInfo(
                contactRes.data.data
            );

        }

    })

    .catch((err) => {

        console.error(err);

    })

    .finally(() => {

        setLoading(false);

    });

}, [id]);

    if (loading) {

        return (

            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                <div className="spinner"></div>

            </div>

        );

    }

    if (!event) {

        return (

            <h2
                style={{
                    textAlign: "center",
                    padding: "100px 0"
                }}
            >
                Event not found
            </h2>

        );

    }

    return (

        <>

            <PageBanner page="events" />

            <section className="event-details-section">

                <div className="container">

                    <div className="event-details-layout">

                        {/* LEFT CONTENT */}

                        <div className="event-main-content">

                            <img
                                src={event.event_image}
                                alt={event.event_title}
                                className="event-main-image"
                            />

                            <span className="event-category-badge">

                                {event.event_category}

                            </span>

                            <h1 className="event-title">

                                {event.event_title}

                            </h1>

                            <p className="event-short-description">

                                {event.short_description}

                            </p>

                            <div className="event-info-grid">

                                <div className="event-info-box">

                                    <h4>Date</h4>

                                    <p>
                                        {formatDate(
                                            event.event_date
                                        )}
                                    </p>

                                </div>

                                <div className="event-info-box">

                                    <h4>Organized By</h4>

                                    <p>
                                        {event.organized_by}
                                    </p>

                                </div>

                                <div className="event-info-box">

                                    <h4>Time</h4>

                                    <p>

                                        {event.start_time}

                                        {" - "}

                                        {event.end_time}

                                    </p>

                                </div>

                                <div className="event-info-box">

                                    <h4>Event Type</h4>

                                    <p>
                                        {event.event_type}
                                    </p>

                                </div>

                                <div className="event-info-box">

                                    <h4>Venue</h4>

                                    <p>

                                        {event.venue_name}

                                        {event.city &&
                                            `, ${event.city}`}

                                    </p>

                                </div>

                                <div className="event-info-box">

                                    <h4>Category</h4>

                                    <p>
                                        {event.event_category}
                                    </p>

                                </div>

                            </div>

                            <div className="event-about-section">

                                <h2>
                                    About Event
                                </h2>

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                        event.event_description
                                    }}
                                />

                            </div>

                            {gallery.length > 0 && (

                                <div className="event-gallery-section">

                                    <h2>
                                        Event Highlights
                                    </h2>

                                    <div className="event-gallery-grid">

                                        {gallery.map((photo) => (

                                            <img
                                                key={
                                                    photo.gallery_id
                                                }
                                                src={
                                                    photo.photo_image
                                                }
                                                alt=""
                                                className="event-gallery-image"
                                            />

                                        ))}

                                    </div>

                                </div>

                            )}

                        </div>

                        {/* SIDEBAR */}

                        <aside className="event-sidebar">

                            <div className="event-sidebar-card">

                                <h3>
                                    Event At A Glance
                                </h3>

                                <ul>

                                    <li>
                                        📅 {formatDate(
                                            event.event_date
                                        )}
                                    </li>

                                    <li>
                                        🕐 {event.start_time}
                                    </li>

                                    <li>
                                        📍 {event.venue_name}
                                    </li>

                                    <li>
                                        👥 {event.organized_by}
                                    </li>

                                    <li>
                                        🏷️ {event.event_type}
                                    </li>

                                </ul>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        setShowRegister(true)
                                    }
                                >
                                    Register Now
                                </button>
                                {
                                    showRegister && (

                                        <EventRegistrationModal

                                            event={event}

                                            onClose={() =>
                                                setShowRegister(false)
                                            }

                                        />

                                    )
                                }
                            </div>

                           <div className="event-sidebar-card">

                                <h3>
                                    Contact For Queries
                                </h3>

                                <p>
                                     <FaPhoneAlt className="query-icon" />

                                      {contactInfo?.primary_phone}
                                </p>

                                <p>
                                    <FaEnvelope className="query-icon" />
                                    {contactInfo?.primary_email}
                                </p>

                                <p>
                                    <FaClock className="query-icon" />
                                    {contactInfo?.office_hours}
                                </p>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>

        </>

    );

};

export default EventDetails;