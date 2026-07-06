import { useState, useEffect, useMemo } from "react";

import EventsFilter from "../../components/events/EventsFilter";
import EventsGrid from "../../components/events/EventsGrid";
import PastEvents from "../../components/events/PastEvents";
import EventNewsletter from "../../components/events/EventNewsletter";
import PageBanner from "../../components/PageBanner/PageBanner";

import { getMainEvents } from "../../services/eventsService";

import "../../styles/events.css";

const Events = () => {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [activeFilter, setActiveFilter] = useState("");

    const [search, setSearch] = useState("");

    // LOAD EVENTS ONLY ONCE
    useEffect(() => {

        setLoading(true);

        getMainEvents()

            .then((res) => {

                console.log(
                    "EVENTS API",
                    res.data
                );

                if (res.data?.success) {

                    setEvents(
                        res.data.data || []
                    );

                }

            })

            .catch((err) => {

                console.error(
                    "Events Error:",
                    err
                );

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    // DYNAMIC CATEGORIES
    const categories = useMemo(() => {

        const uniqueCategories = [

            ...new Set(

                events
                    .map(
                        event =>
                            event.event_category
                    )
                    .filter(Boolean)

            )

        ];

        return [

            {
                label: "All Events",
                value: ""
            },

            ...uniqueCategories.map(
                category => ({

                    label: category,
                    value: category

                })
            )

        ];

    }, [events]);

    // FRONTEND FILTERING
    const filteredEvents = useMemo(() => {

        return events.filter(
            event => {

                const matchesCategory =

                    !activeFilter ||

                    event.event_category ===
                    activeFilter;

                const matchesSearch =

                    !search ||

                    event.event_title
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );

                return (
                    matchesCategory &&
                    matchesSearch
                );

            }
        );

    }, [
        events,
        activeFilter,
        search
    ]);

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    // UPCOMING EVENTS
    const upcomingEvents = useMemo(() => {

        return filteredEvents.filter(

            event =>

                !event.event_date ||

                new Date(
                    event.event_date
                ) >= today

        );

    }, [filteredEvents]);

    // PAST EVENTS
    const pastEvents = useMemo(() => {

        return filteredEvents.filter(

            event =>

                event.event_date &&

                new Date(
                    event.event_date
                ) < today

        );

    }, [filteredEvents]);

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

    return (

        <div className="events-page">

            <PageBanner page="events" />

            <EventsFilter

                categories={categories}

                activeFilter={activeFilter}

                setActiveFilter={setActiveFilter}

                search={search}

                setSearch={setSearch}

            />

            <section className="events-section-block">

                <div className="container">

                    <h2 className="section-title center">
                        Upcoming Events
                    </h2>

                    <EventsGrid

                        events={upcomingEvents} 

                        viewAllLabel="View All Upcoming Events"

                    />
                    

                </div>

            </section>

            <PastEvents
                events={pastEvents}
            />

            <EventNewsletter />

        </div>

    );

};

export default Events;