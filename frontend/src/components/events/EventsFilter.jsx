const EventsFilter = ({
    categories,
    activeFilter,
    setActiveFilter,
    search,
    setSearch
}) => {

    return (

        <div className="events-filters">

            <div className="container">

                <div className="events-filters-inner">

                    <div className="events-filter-tabs">

                        {categories.map((cat) => (

                            <button

                                key={cat.value}

                                className={`filter-tab ${
                                    activeFilter === cat.value
                                        ? "active"
                                        : ""
                                }`}

                                onClick={() =>
                                    setActiveFilter(cat.value)
                                }

                            >

                                {cat.label}

                            </button>

                        ))}

                    </div>

                    <div className="events-search">

                        <span className="events-search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search Events..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>

            </div>

        </div>

    );

};

export default EventsFilter;