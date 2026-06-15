const BASE_URL = "http://localhost:5000";

export const getImageUrl = (url) => {
    if (!url) return null;

    // API returning undefined/uploads/...
    if (url.startsWith("undefined")) {
        return url.replace("undefined", BASE_URL);
    }

    // Already full URL
    if (url.startsWith("http")) {
        return url;
    }

    // Relative uploads path
    if (url.startsWith("/uploads")) {
        return `${BASE_URL}${url}`;
    }

    return url;
};