import { useState, useEffect, useMemo } from 'react'
import GothrasHero   from '../../components/gothras/GothrasHero'
import GothrasFilter from '../../components/gothras/GothrasFilter'
import GothrasGrid   from '../../components/gothras/GothrasGrid'
import { getGothras } from '../../services/gothraService'
import PageBanner from "../../components/PageBanner/PageBanner";
import '../../styles/gothras.css'

const Gothras = () => {
    const [gothras,       setGothras]       = useState([])
    const [loading,       setLoading]       = useState(true)
    const [activeLetter,  setActiveLetter]  = useState('')
    const [search,        setSearch]        = useState('')

    useEffect(() => {
        // Fetch with backend filters
        const params = { status: 'active' }
        if (activeLetter) params.letter = activeLetter
        if (search)       params.search = search

        setLoading(true)
        getGothras(params)
            .then(res => {
                if (res.data?.success) setGothras(res.data.data || [])
            })
            .catch(err => console.error('Gothras error:', err))
            .finally(() => setLoading(false))
    }, [activeLetter, search])

    return (
        <div className="gothras-page">

            {/* 1. Page Banner */}
           <PageBanner page="gothras" />

            {/* 2. Intro */}
            <div className="gothras-intro">
                <div className="container">
                    <h2 className="section-title center">
                        Gothras Directory (Alphabetical Order)
                    </h2>
                    <p className="gothras-intro-text">
                        Gothras represent our ancient lineage and are a mark of our rich heritage.
                        Explore the list of Gothras in alphabetical order.
                    </p>
                </div>
            </div>

            {/* 3. Filter Bar */}
            <GothrasFilter
                activeLetter={activeLetter}
                setActiveLetter={setActiveLetter}
                search={search}
                setSearch={setSearch}
            />

            {/* 4. Gothras Grid */}
            <section className="gothras-section">
                <div className="container">
                    {loading ? (
                        <div style={{
                            textAlign: 'center',
                            padding: 'var(--space-20)'
                        }}>
                            <div className="spinner" />
                        </div>
                    ) : (
                        <GothrasGrid gothras={gothras} />
                    )}
                </div>
            </section>

        </div>
    )
}

export default Gothras