import { useState, useEffect } from 'react'

import {
    getBanners,
    getFlashNews,
    getPresidentMsg,
    getAboutSamiti,
    getQuickServices,
    getEvents,
    getGallery,
} from '../../services/homeService'

import HeroBanner from '../../components/Home/HeroBanner'
import FlashNews from '../../components/Home/FlashNews'
import PresidentMessage from '../../components/Home/PresidentMessage'
import AboutSamiti from '../../components/Home/AboutSamiti'
import QuickServices from '../../components/Home/QuickServices'
import UpcomingEvents from '../../components/Home/UpcomingEvents'
import GalleryPreview from '../../components/Home/GalleryPreview'

import '../../styles/home.css'

const Home = () => {
    const [banners, setBanners] = useState([])
    const [flashNews, setFlashNews] = useState([])
    const [president, setPresident] = useState(null)
    const [about, setAbout] = useState(null)
    const [services, setServices] = useState([])
    const [events, setEvents] = useState([])
    const [gallery, setGallery] = useState([])

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [b, f, p, a, s, e, g] = await Promise.all([
                    getBanners(),
                    getFlashNews(),
                    getPresidentMsg(),
                    getAboutSamiti(),
                    getQuickServices(),
                    getEvents(),
                    getGallery(),
                ])

                if (b.data?.success) setBanners(b.data.data || [])
                if (f.data?.success) setFlashNews(f.data.data || [])
                if (p.data?.success)
                    setPresident(p.data.data?.[0] || null)
                if (a.data?.success) setAbout(a.data.data || null)
                if (s.data?.success) setServices(s.data.data || [])
                if (e.data?.success) setEvents(e.data.data || [])
                if (g.data?.success) setGallery(g.data.data || [])
            } catch (err) {
                console.error('Home page fetch error:', err)
            }
        }

        fetchAll()
    }, [])

    return (
        <div className="home-page">
            <HeroBanner banners={banners} />
            <FlashNews news={flashNews} />
            <AboutSamiti data={about} />
            <PresidentMessage data={president} />
            <QuickServices services={services} />
            <UpcomingEvents events={events} />
            <GalleryPreview gallery={gallery} />
        </div>
    )
}

export default Home