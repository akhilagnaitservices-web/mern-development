import { NavLink, Link } from "react-router-dom";

const DesktopMenu = ({ navLinks }) => {
    return (
        <ul className="navbar-links">

            {navLinks.map((link) => (
                <li key={link.path}>

                    <NavLink
                        to={link.path}
                        end={link.exact}
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        {link.label}

                        {link.dropdown && (
                            <span className="dropdown-arrow">
                                ▾
                            </span>
                        )}
                    </NavLink>

                    {link.dropdown && (
                        <ul className="navbar-dropdown">

                            {link.dropdown.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    )}

                </li>
            ))}

        </ul>
    );
};

export default DesktopMenu;