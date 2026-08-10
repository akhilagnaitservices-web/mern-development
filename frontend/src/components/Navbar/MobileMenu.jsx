import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { getChatUrl } from "../../services/chatService";
import { Icons } from "../../constants/icons";

const MATRIMONY_APP_URL = import.meta.env.VITE_MATRIMONY_APP_URL;

const MobileMenu = ({
    menuOpen,
    navLinks,
    aboutOpen,
    setAboutOpen,
    closeMenu,
}) => {

    const isLoggedIn = Boolean(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

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

                {isLoggedIn ? (

                    <>
                        <Link
                            to="/profile"
                            className="btn btn-outline-gold"
                            onClick={closeMenu}
                        >
                            <Icons.User size={16} strokeWidth={2} />
                            Profile
                        </Link>

                        <Link
                            to="/change-password"
                            className="btn btn-outline-gold"
                            onClick={closeMenu}
                        >
                            <Icons.KeyRound size={16} strokeWidth={2} />
                            Change Password
                        </Link>

                        <button
                            className="btn btn-outline-gold"
                            onClick={() => {
                                closeMenu()
                                const chatUrl = getChatUrl(user)
                                if (chatUrl) {
                                    window.open(chatUrl, '_blank', 'noopener,noreferrer')
                                }
                            }}
                        >
                            <Icons.MessageCircle size={16} strokeWidth={2} />
                            Chat
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                closeMenu()
                                logoutUser()
                            }}
                        >
                            <Icons.LogOut size={16} strokeWidth={2} />
                            Logout
                        </button>
                    </>

                ) : (

                    <>
                        <a
                            href="#"
                            className="btn btn-outline-gold"
                            onClick={(e) => {
                                e.preventDefault();
                                setLoginOpen(!loginOpen);
                            }}
                        >
                            Login {loginOpen ? "▲" : "▼"}
                        </a>

                        {loginOpen && (
                            <div className="navbar-mobile-sub-actions">
                                <Link to="/login" className="btn btn-outline-gold" onClick={closeMenu}>
                                    Membership Login
                                </Link>
                                <button
                                    className="btn btn-outline-gold"
                                    onClick={() => {
                                        closeMenu();
                                        if (MATRIMONY_APP_URL) {
                                            window.location.href = MATRIMONY_APP_URL;
                                        }
                                    }}
                                >
                                    Matrimony Login
                                </button>
                            </div>
                        )}

                        <a
                            href="#"
                            className="btn btn-secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                setRegisterOpen(!registerOpen);
                            }}
                        >
                            Register {registerOpen ? "▲" : "▼"}
                        </a>

                        {registerOpen && (
                            <div className="navbar-mobile-sub-actions">
                                <Link to="/membership" className="btn btn-secondary" onClick={closeMenu}>
                                    Membership Register
                                </Link>
                                <Link to="/matrimony/register" className="btn btn-secondary" onClick={closeMenu}>
                                    Matrimony Register
                                </Link>
                            </div>
                        )}
                    </>

                )}

            </div>
        </div>
    );
};

export default MobileMenu;