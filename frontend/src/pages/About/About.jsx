import { useState, useEffect } from 'react'
import PageBanner from '../../components/PageBanner/PageBanner'
import AboutContent from '../../components/about/AboutContent'
import HeritageFeatures from '../../components/about/HeritageFeatures'
import Statistics from '../../components/about/Statistics'
import CoreValues from '../../components/about/CoreValues'
import CommitteeMembers from '../../components/about/CommitteeMembers'
import Leadership from '../../components/about/Leadership'
import {
    getAboutSamiti,
    getPresidentMsg,
    getHeritageFeatures,
    getCoreValues,
    getLeadershipMembers,
} from '../../services/aboutService'
import '../../styles/about.css'

const About = () => {
    const [about, setAbout] = useState(null)
    const [leaders, setLeaders] = useState([])
    const [features, setFeatures] = useState([])
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aboutRes, presidentRes, featureRes, valuesRes, leadersRes] =
                    await Promise.allSettled([
                        getAboutSamiti(),
                        getPresidentMsg(),
                        getHeritageFeatures(),
                        getCoreValues(),
                        getLeadershipMembers(),
                    ])

                if (aboutRes.status === 'fulfilled' && aboutRes.value.data?.success)
                    setAbout(aboutRes.value.data.data || null)

                if (presidentRes.status === 'fulfilled' && presidentRes.value.data?.success)
                    setLeaders(presidentRes.value.data.data || [])

                if (featureRes.status === 'fulfilled' && featureRes.value.data?.success)
                    setFeatures(featureRes.value.data.data || [])

                if (valuesRes.status === 'fulfilled' && valuesRes.value.data?.success)
                    setValues(valuesRes.value.data.data || [])

                // Leadership members overrides president data if available
                if (leadersRes.status === 'fulfilled' && leadersRes.value.data?.success)
                    setLeaders(leadersRes.value.data.data || [])

            } catch (error) {
                console.error('About page error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="spinner" />
            </div>
        )
    }

    return (
        <div className="about-page">

            {/* 1. Page Banner */}
            <PageBanner page="about-us" />
            {/* <PageBanner
                pageName="about"
                title="About Us"
                subtitle="Know More About Our Legacy, Values & Vision"
            /> */}

            {/* 2. About Content — vision, mission, objectives */}
            <AboutContent about={about} />

            {/* 3. Heritage Features */}
            <HeritageFeatures features={features} />

            {/* 4. Statistics */}
            <Statistics about={about} />

            {/* 5. Core Values */}
            <CoreValues values={values} />

            {/* 6. Leadership Members */}


            {/* 7. Committee Members */}
            <CommitteeMembers leaders={leaders} />

        </div>
    )
}

export default About