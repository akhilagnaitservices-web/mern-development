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

                        
                    </NavLink>

                </li>
            ))}

        </ul>
    );
};

export default DesktopMenu;