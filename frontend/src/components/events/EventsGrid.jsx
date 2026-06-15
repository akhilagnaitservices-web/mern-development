import { useState } from 'react'
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageHelper";

const formatDate = (dateStr) => {
    if (!dateStr) return { day: '--', month: '---', year: '----', full: '' }
    const d = new Date(dateStr)
    return {
        day:   d.getDate().toString().padStart(2, '0'),
        month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
        year:  d.getFullYear(),
        full:  d.toLocaleDateString('en-IN', {
            weekday: 'long', year: 'numeric',
            month: 'long', day: 'numeric'
        }),
    }
}

const EventCard = ({ event, onView }) => {
    const { day, month, year, full } = formatDate(event.event_date)

    return (
        <div className="event-page-card">
            <div className="event-page-img-wrap">
                {event.event_image ? (
                    <img
                        src={getImageUrl(event.event_image)}
                        alt={event.event_title}
                        className="event-page-img"
                        loading="lazy"
                    />
                ) : (
                    <div className="event-page-img-placeholder">🎉</div>
                )}

                {event.event_category && (
                    <span className="event-category-badge">
                        {event.event_category}
                    </span>
                )}

                <div className="event-page-date-badge">
                    <span className="event-page-date-day">{day}</span>
                    <span className="event-page-date-month">{month}</span>
                    <span className="event-page-date-year">{year}</span>
                </div>
            </div>

            <div className="event-page-body">
                <h3 className="event-page-title">{event.event_title}</h3>

                <div className="event-page-meta">
                    {full && (
                        <span className="event-page-meta-item">
                            <span className="event-page-meta-icon">📅</span>
                            {full}
                        </span>
                    )}
                    {(event.start_time || event.end_time) && (
                        <span className="event-page-meta-item">
                            <span className="event-page-meta-icon">🕐</span>
                            {event.start_time}
                            {event.end_time ? ` — ${event.end_time}` : ''}
                        </span>
                    )}
                    {event.venue_name && (
                        <span className="event-page-meta-item">
                            <span className="event-page-meta-icon">📍</span>
                            {event.venue_name}
                            {event.city ? `, ${event.city}` : ''}
                        </span>
                    )}
                    {event.organized_by && (
                        <span className="event-page-meta-item">
                            <span className="event-page-meta-icon">👥</span>
                            {event.organized_by}
                        </span>
                    )}
                </div>

                {event.short_description && (
                    <p className="event-page-desc">{event.short_description}</p>
                )}

                <Link
                    to={`/events/${event.event_id}`}
                    className="btn btn-primary"
                >
                    View Details
                </Link>
            </div>
        </div>
    )
}

const EventsGrid = ({ events, viewAllLabel }) => {
    const [selectedEvent, setSelectedEvent] = useState(null)

    if (!events.length) {
        return (
            <div className="events-empty">
                <p className="events-empty-icon">📅</p>
                <p>No events found.</p>
            </div>
        )
    }

    return (
        <>
            <div className="events-page-grid">
                {events.map(event => (
                    <EventCard
                        key={event.event_id}
                        event={event}
                        onView={setSelectedEvent}
                    />
                ))}
            </div>

            <div className="events-view-all-wrap">
                <button className="btn btn-outline">
                    {viewAllLabel || 'View All Events'} →
                </button>
            </div>

            

        </>
    )
}

export default EventsGrid