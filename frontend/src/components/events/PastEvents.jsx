import { useNavigate } from "react-router-dom";
const formatDate = (dateStr) => {

    if (!dateStr) {

        return {
            day: "--",
            month: "---",
            year: "----",
            full: ""
        };

    }

    const d = new Date(dateStr);

    return {

        day: d.getDate().toString().padStart(2, "0"),

        month: d.toLocaleString(
            "default",
            { month: "short" }
        ).toUpperCase(),

        year: d.getFullYear(),

        full: d.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        )

    };

};

const PastEvents = ({ events }) => {

    const navigate = useNavigate();

    if (!events.length) return null;

    return (

        <section className="events-section-block">

            <div className="container">

                <h2 className="section-title center">
                    Past Events
                </h2>

                <div className="events-page-grid">

                    {events.slice(0, 12).map((event) => {

                        const {
                            day,
                            month,
                            year,
                            full
                        } = formatDate(
                            event.event_date
                        );

                        return (

                            <div
                                key={event.event_id}
                                className="event-page-card"
                            >

                                <div className="event-page-img-wrap">

                                    {event.event_image ? (

                                        <img
                                            src={
                                                event.event_image
                                            }
                                            alt={event.event_title}
                                            className="event-page-img"
                                        />

                                    ) : (

                                        <div className="event-page-img-placeholder">
                                            🎉
                                        </div>

                                    )}

                                    {event.event_category && (

                                        <span className="event-category-badge">

                                            {event.event_category}

                                        </span>

                                    )}

                                    <div className="event-page-date-badge">

                                        <span className="event-page-date-day">
                                            {day}
                                        </span>

                                        <span className="event-page-date-month">
                                            {month}
                                        </span>

                                        <span className="event-page-date-year">
                                            {year}
                                        </span>

                                    </div>

                                </div>

                                <div className="event-page-body">

                                    <h3 className="event-page-title">
                                        {event.event_title}
                                    </h3>

                                    <div className="event-page-meta">

                                        <span className="event-page-meta-item">
                                            📅 {full}
                                        </span>

                                        {event.venue_name && (

                                            <span className="event-page-meta-item">

                                                📍 {event.venue_name}

                                                {event.city
                                                    ? `, ${event.city}`
                                                    : ""}

                                            </span>

                                        )}

                                    </div>

                                    {event.short_description && (

                                        <p className="event-page-desc">

                                            {event.short_description}

                                        </p>

                                    )}

                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate(
                                                `/events/${event.event_id}`
                                            )
                                        }
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );

};

export default PastEvents;