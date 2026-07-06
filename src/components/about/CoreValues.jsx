import 'remixicon/fonts/remixicon.css'
const FALLBACK_ICONS = {
    'warrior':      'ri-shield-fill',
    'temple':       'ri-building-fill',
    'inscription':  'ri-file-text-fill',
    'cultural':     'ri-group-fill',
    'unity':        'ri-group-fill',
    'heritage':     'ri-ancient-gate-fill',
}
  const getFallbackIcon = (title = '') => {
    const lower = title.toLowerCase()
    for (const [key, icon] of Object.entries(FALLBACK_ICONS)) {
        if (lower.includes(key)) return icon
    }
    return 'ri-star-fill'
}  
    const CoreValues = ({ values }) => {

        const getFallbackIcon = (title = '') => {
            const lower = title.toLowerCase()
            for (const [key, icon] of Object.entries(FALLBACK_ICONS)) {
                if (lower.includes(key)) return icon
            }
            return 'ri-star-fill'
        }
        if (!values.length) return null

        return (

            <section className="core-values">

                <div className="container">

                    <h2 className="section-title center">
                        Our Core Values
                    </h2>

                    <div className="core-values-grid">

                        {values.map(value => (

                            <div
                                key={value.id}
                                className="core-value-card"
                            >

                                <div className="core-value-icon">
                                   <i className={value.icon}></i>
                                </div>

                                <h3 className="core-value-title">
                                    {value.title}
                                </h3>

                                <p className="core-value-desc">
                                    {value.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

        )
    }

    export default CoreValues