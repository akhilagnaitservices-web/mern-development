import { Link } from "react-router-dom";

const Logo = ({ header, closeMenu }) => {

    const BASE_URL = "http://localhost:5000";

    const getUploadedUrl = (filePath) => {
    if (!filePath) return null;

    // Fix API returning undefined/uploads/...
    if (filePath.startsWith("undefined")) {
        return filePath.replace(
            "undefined",
            BASE_URL
        );
    }

    // Already full URL
    if (filePath.startsWith("http")) {
        return filePath;
    }

    // /uploads/...
    if (filePath.startsWith("/uploads")) {
        return `${BASE_URL}${filePath}`;
    }

    // site-header/logo.png
    return `${BASE_URL}/uploads/${filePath}`;
};
    return (
        <Link
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
        >
            {header?.logo ? (
                <>
                    <img
                        src={getUploadedUrl(header.logo)}
                        alt={header?.name || "VRKSS"}
                        className="navbar-logo-img"
                        onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                        }}
                    />

                    <div
                        className="navbar-logo-placeholder"
                        style={{ display: "none" }}
                    >
                        V
                    </div>
                </>
            ) : (
                <div className="navbar-logo-placeholder">
                    V
                </div>
            )}

            <div className="navbar-logo-text">

                <span className="navbar-logo-title">
                    {header?.name?.split(" ").slice(0, 2).join(" ") ||
                        "Vadiyaraju Kshatriya"}
                </span>

                <span className="navbar-logo-subtitle">
                    {header?.name?.split(" ").slice(2).join(" ") ||
                        "Seva Samiti"}
                </span>

                <span className="navbar-logo-tagline">
                    {header?.description ||
                        "Unity | Service | Culture | Progress"}
                </span>

            </div>
        </Link>
    );
};

export default Logo;