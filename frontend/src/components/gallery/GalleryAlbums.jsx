import { FaImages, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { getImageUrl } from "../../utils/imageHelper";

const GalleryAlbums = ({
    albums,
    setSelectedAlbum
}) => {

    if (!albums?.length) return null;

    return (

        <section className="gallery-albums-section">

            <div className="container">

                <h2 className="section-title center">
                    Photo Albums
                </h2>

                <div className="gallery-albums-grid">

                    {albums.map(album => (

                        <div
                            key={album.album_id}
                            className="gallery-album-card"
                            onClick={() =>
                                setSelectedAlbum(album.album_id)
                            }
                        >

                            <div className="gallery-album-image">

                                <img
                                    src={getImageUrl(album.album_cover_image)}
                                    alt={album.album_title}
                                />

                            </div>

                            <div className="gallery-album-content">

                                <h3>
                                    {album.album_title}
                                </h3>

                                {/* {album.event_date && (

                                    <p>

                                        <FaCalendarAlt />

                                        {album.event_date}

                                    </p>

                                )}

                                {album.location && (

                                    <p>

                                        <FaMapMarkerAlt />

                                        {album.location}

                                    </p>

                                )} */}

                                {/* <button
                                    className="album-view-btn"
                                >

                                    <FaImages />

                                    View Album

                                </button> */}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

};

export default GalleryAlbums;