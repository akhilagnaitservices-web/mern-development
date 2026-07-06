import {
    useState,
    useEffect,
    useMemo
} from "react";

import {
    getGalleryCategories,
    getGalleryAlbums,
    getGalleryPhotos,
    getGalleryBanner
} from "../../services/galleryService";

import GalleryFilters from "../../components/gallery/GalleryFilters";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";
import GalleryAlbums from "../../components/gallery/GalleryAlbums";
import PageBanner from "../../components/PageBanner/PageBanner";

import "../../styles/gallery.css";

const Gallery = () => {

    const [banner, setBanner] = useState(null);

    const [categories, setCategories] = useState([]);

    const [albums, setAlbums] = useState([]);

    const [photos, setPhotos] = useState([]);

    const [activeFilter, setActiveFilter] =
        useState("All");

    const [selectedAlbum, setSelectedAlbum] =
        useState(null);

    const [lightbox, setLightbox] =
        useState(null);

    const [lightboxIndex, setLightboxIndex] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        Promise.all([
            getGalleryBanner(),
            getGalleryCategories(),
            getGalleryAlbums(),
            getGalleryPhotos()
        ])
            .then(
                ([
                    bannerRes,
                    catsRes,
                    albumsRes,
                    photosRes
                ]) => {

                    setBanner(
                        bannerRes?.data?.data || null
                    );

                    setCategories(
                        catsRes?.data?.data || []
                    );

                    setAlbums(
                        albumsRes?.data?.data || []
                    );

                    setPhotos(
                        photosRes?.data?.data || []
                    );
                }
            )
            .catch(console.error)
            .finally(() => setLoading(false));

    }, []);

    // FILTER ALBUMS BY CATEGORY
    const filteredAlbums = useMemo(() => {

        if (activeFilter === "All") {
            return albums;
        }

        return albums.filter(
            album =>
                String(album.category_id) ===
                String(activeFilter)
        );

    }, [albums, activeFilter]);

    // FILTER PHOTOS
    const filteredPhotos = useMemo(() => {

        let filtered = photos;

        if (activeFilter !== "All") {

            const albumIds = filteredAlbums.map(
                album => album.album_id
            );

            filtered = filtered.filter(
                photo =>
                    albumIds.includes(
                        photo.album_id
                    )
            );
        }

        if (selectedAlbum) {

            filtered = filtered.filter(
                photo =>
                    String(photo.album_id) ===
                    String(selectedAlbum)
            );
        }

        return filtered;

    }, [
        photos,
        activeFilter,
        selectedAlbum,
        filteredAlbums
    ]);

    const handleFilterChange = (filter) => {

        setActiveFilter(filter);

        // Reset album selection
        setSelectedAlbum(null);

    };

    const openLightbox =
        (photo, index) => {

            setLightbox(photo);

            setLightboxIndex(index);

        };

    const prevImage = () => {

        const newIndex =
            (
                lightboxIndex - 1 +
                filteredPhotos.length
            ) %
            filteredPhotos.length;

        setLightboxIndex(newIndex);

        setLightbox(
            filteredPhotos[newIndex]
        );

    };

    const nextImage = () => {

        const newIndex =
            (
                lightboxIndex + 1
            ) %
            filteredPhotos.length;

        setLightboxIndex(newIndex);

        setLightbox(
            filteredPhotos[newIndex]
        );

    };

    return (
        <>
            <PageBanner page="gallery" />

            <section className="gallery-filters">
                <div className="container">

                    <GalleryFilters
                        categories={categories}
                        activeFilter={activeFilter}
                        setActiveFilter={handleFilterChange}
                    />

                </div>
            </section>

            <section className="gallery-page-section">

                <div className="container">

                    {loading ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "50px"
                            }}
                        >
                            Loading...
                        </div>
                    ) : (
                        <>
                            {/* Show Albums */}
                               <GalleryAlbums
                                    albums={filteredAlbums}
                                    selectedAlbum={selectedAlbum}
                                    setSelectedAlbum={setSelectedAlbum}
                                />

                                <GalleryGrid
                                    photos={filteredPhotos}
                                    openLightbox={openLightbox}
                                    albumTitle={
                                        selectedAlbum
                                            ? albums.find(
                                                album =>
                                                    String(album.album_id) ===
                                                    String(selectedAlbum)
                                            )?.album_title
                                            : ""
                                    }
                                    onBack={
                                        selectedAlbum
                                            ? () => setSelectedAlbum(null)
                                            : null
                                    }
                                />

                            </>
                        )}

                </div>

            </section>

            <GalleryLightbox
                photo={lightbox}
                close={() =>
                    setLightbox(null)
                }
                prev={prevImage}
                next={nextImage}
                current={lightboxIndex}
                total={filteredPhotos.length}
            />

        </>
    );
};

export default Gallery;