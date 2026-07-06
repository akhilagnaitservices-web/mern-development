import { NavLink, Link } from "react-router-dom";

const MobileMenu = ({
    menuOpen,
    navLinks,
    aboutOpen,
    setAboutOpen,
    closeMenu,
}) => {

    return (
        <div
            className={`navbar-mobile ${
                menuOpen ? "open" : ""
            }`}
        >
            <ul className="navbar-mobile-links">

                {navLinks.map((link) => (
                    <li key={link.path}>

                        {link.dropdown ? (
                            <>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setAboutOpen(!aboutOpen);
                                    }}
                                >
                                    {link.label}
                                    {" "}
                                    {aboutOpen ? "▲" : "▼"}
                                </a>

                                {aboutOpen && (
                                    <ul className="navbar-mobile-sub">

                                        {link.dropdown.map((item) => (
                                            <li key={item.path}>
                                                <Link
                                                    to={item.path}
                                                    onClick={closeMenu}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>
                                )}

                            </>
                        ) : (
                            <NavLink
                                to={link.path}
                                end={link.exact}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                                onClick={closeMenu}
                            >
                                {link.label}
                            </NavLink>
                        )}

                    </li>
                ))}

            </ul>

            <div className="navbar-mobile-actions">

                <Link
                    to="/login"
                    className="btn btn-outline-gold"
                    onClick={closeMenu}
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="btn btn-secondary"
                    onClick={closeMenu}
                >
                    Register
                </Link>

            </div>
        </div>
    );
};

export default MobileMenu;