import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHeader, getSocialMediaLinks } from '../../services/headerService'
import { logoutUser } from '../../services/authService'
import { getChatUrl } from '../../services/chatService'
import { Icons } from '../../constants/icons'

import TopBar from './TopBar'
import Logo from './Logo'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

import '../../styles/navbar.css'

const MATRIMONY_APP_URL = import.meta.env.VITE_MATRIMONY_APP_URL

const navLinks = [
    {
        label: 'Home',
        path: '/',
        exact: true
    },
    {
        label: 'About Us',
        path: '/about',
        exact: true
    },
    { label: 'Gothras',
        path: '/gothras',
        exact: true
     },
    {
        label: 'Membership',
        path: '/membership',
        exact: true
    },
    {
        label: 'Matrimony',
        path: '/matrimony',
        exact: true
    },
    { 
        label: 'News',
        path: '/news',
        exact: true 
    
    },
    {
        label: 'Events',
        path: '/events',
        exact: true
    },
    {
        label: 'Gallery',
        path: '/gallery',
        exact: true
    },
    {
        label: 'Contact Us',
        path: '/contact',
        exact: true
    }
]

const Navbar = () => {

    const [header, setHeader] = useState(null)
    const [socials, setSocials] = useState([])
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [aboutOpen, setAboutOpen] = useState(false)

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const isLoggedIn = Boolean(token)

    // Fetch Header Data
    useEffect(() => {

        const fetchData = async () => {

            try {

                const [
                    headerRes,
                    socialRes
                ] = await Promise.all([
                    getHeader(),
                    getSocialMediaLinks()
                ])

                console.log('HEADER DATA:', headerRes)
                console.log('SOCIAL MEDIA LINKS:', socialRes)

                if (headerRes?.success) {
                    setHeader(headerRes.data)
                }

                if (socialRes?.success) {
                    setSocials(socialRes.data)
                }

            } catch (err) {

                console.error(
                    'Navbar fetch error:',
                    err
                )

            }

        }

        fetchData()

    }, [])

    // Scroll Detection
    useEffect(() => {

        const onScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener(
            'scroll',
            onScroll
        )

        return () => {
            window.removeEventListener(
                'scroll',
                onScroll
            )
        }

    }, [])

    // Lock body when mobile menu opens
    useEffect(() => {

        document.body.style.overflow =
            menuOpen ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }

    }, [menuOpen])

    const closeMenu = () => {

        setMenuOpen(false)
        setAboutOpen(false)

    }

    return (
        <>

            {/* TOP BAR */}

            <TopBar
                header={header}
                socials={socials}
            />

            {/* MAIN NAVBAR */}

            <nav
                className={`navbar ${
                    scrolled ? 'scrolled' : ''
                }`}
            >

                <div className="navbar-inner">

                    <Logo
                        header={header}
                        closeMenu={closeMenu}
                    />

                    <DesktopMenu
                        navLinks={navLinks}
                    />

                    {/* DESKTOP BUTTONS */}

                    <div className="navbar-actions">

                        {isLoggedIn ? (

                            <div className="navbar-profile">

                                <button className="navbar-profile-toggle">
                                    <Icons.User
                                        size={16}
                                        strokeWidth={2}
                                        className="navbar-profile-icon"
                                    />
                                    {user.full_name || 'My Account'}
                                    <Icons.ChevronDown
                                        size={14}
                                        strokeWidth={2}
                                        className="dropdown-arrow"
                                    />
                                </button>

                                <ul className="navbar-dropdown">

                                    <li>
                                        <Link to="/profile">
                                            <Icons.User size={15} strokeWidth={2} />
                                            Profile
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/change-password">
                                            <Icons.KeyRound size={15} strokeWidth={2} />
                                            Change Password
                                        </Link>
                                    </li>

                                    <li><hr className="navbar-dropdown-divider" /></li>

                                    <li>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const chatUrl = getChatUrl(user)
                                                if (chatUrl) {
                                                    window.location.href = chatUrl
                                                }
                                            }}
                                        >
                                            <Icons.MessageCircle size={15} strokeWidth={2} />
                                            Chat
                                        </a>
                                    </li>

                                    <li><hr className="navbar-dropdown-divider" /></li>

                                    <li>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                logoutUser()
                                            }}
                                        >
                                            <Icons.LogOut size={15} strokeWidth={2} />
                                            Logout
                                        </a>
                                    </li>

                                </ul>

                            </div>

                        ) : (

                            <>
                                <div className="navbar-auth-dropdown navbar-auth-dropdown--login">

                                    <button className="btn btn-outline-gold">
                                        Login
                                        <Icons.ChevronDown
                                            size={14}
                                            strokeWidth={2}
                                            className="dropdown-arrow"
                                        />
                                    </button>

                                    <ul className="navbar-dropdown">
                                        <li>
                                            <Link to="/login">Membership Login</Link>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if (MATRIMONY_APP_URL) {
                                                        window.location.href = MATRIMONY_APP_URL
                                                    }
                                                }}
                                            >
                                                Matrimony Login
                                            </a>
                                        </li>
                                    </ul>

                                </div>

                                <div className="navbar-auth-dropdown navbar-auth-dropdown--register">

                                    <button className="btn btn-secondary">
                                        Register
                                        <Icons.ChevronDown
                                            size={14}
                                            strokeWidth={2}
                                            className="dropdown-arrow"
                                        />
                                    </button>

                                    <ul className="navbar-dropdown">
                                        <li>
                                            <Link to="/membership">Membership Register</Link>
                                        </li>
                                        <li>
                                            <Link to="/matrimony/register">Matrimony Register</Link>
                                        </li>
                                    </ul>

                                </div>
                            </>

                        )}

                    </div>

                    {/* HAMBURGER */}

                    <button
                        className={`navbar-hamburger ${
                            menuOpen ? 'open' : ''
                        }`}
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        aria-label="Toggle menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                </div>

            </nav>

            {/* MOBILE MENU */}

            <MobileMenu
                menuOpen={menuOpen}
                navLinks={navLinks}
                aboutOpen={aboutOpen}
                setAboutOpen={setAboutOpen}
                closeMenu={closeMenu}
            />

        </>
    )
}

export default Navbar