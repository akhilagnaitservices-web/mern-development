import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHeader, getSocialMediaLinks } from '../../services/headerService'

import TopBar from './TopBar'
import Logo from './Logo'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

import '../../styles/navbar.css'

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

                        <Link
                            to="/login"
                            className="btn btn-outline-gold"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-secondary"
                        >
                            Register
                        </Link>

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