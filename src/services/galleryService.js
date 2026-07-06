import api from "./api";

export const getGalleryCategories = () =>
    api.get("/gallery-categories");

// export const getGalleryAlbums = () =>
//     api.get("/gallery-albums");

export const getGalleryPhotos = () =>
    api.get("/gallery-photos");

export const getGalleryVideos = () =>
    api.get("/gallery-videos");

export const getGalleryBanner = () =>
    api.get("/page-banners/page/gallery");

export const getGalleryAlbums = () => {
    return api.get("/gallery-albums");
};