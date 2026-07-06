import { Link } from "react-router-dom";

const Logo = ({ header, closeMenu }) => {

    return (
        <Link
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
        >
            {header?.logo ? (
                <>
                    <img
                        src={header.logo}
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

            

            </div>
        </Link>
    );
};

export default Logo;