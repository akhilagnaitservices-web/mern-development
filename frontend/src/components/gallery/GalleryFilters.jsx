import {
    FaImages,
    FaCalendarAlt,
    FaUsers,
    FaPrayingHands,
    FaChild,
    FaTheaterMasks,
    FaVideo
} from "react-icons/fa";

const GalleryFilters = ({
    categories,
    activeFilter,
    setActiveFilter
}) => {

    const getCategoryIcon = (categoryName) => {

        switch (categoryName?.toLowerCase()) {

            case "events":
                return <FaCalendarAlt />;

            case "cultural programs":
                return <FaTheaterMasks />;

            case "community activities":
                return <FaUsers />;

            case "religious":
                return <FaPrayingHands />;

            case "youth activities":
                return <FaChild />;

            case "videos":
                return <FaVideo />;

            default:
                return <FaImages />;
        }

    };

    return (

        <div className="gallery-filter-tabs">

            <button
                className={`filter-btn ${
                    activeFilter === "All"
                        ? "active"
                        : ""
                }`}
                onClick={() =>
                    setActiveFilter("All")
                }
            >

                <FaImages />

                <span>
                    All Photos
                </span>

            </button>

            {categories.map((category) => (

                <button
                    key={category.category_id}
                    className={`filter-btn ${
                        activeFilter === category.category_id
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveFilter(
                            category.category_id
                        )
                    }
                >

                    {getCategoryIcon(
                        category.category_name
                    )}

                    <span>
                        {category.category_name}
                    </span>

                </button>

            ))}

        </div>

    );

};

export default GalleryFilters;