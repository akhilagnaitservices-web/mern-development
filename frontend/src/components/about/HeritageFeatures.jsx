
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

const HeritageFeatures = ({ features }) => {

    if (!features.length) return null

    return (
        <section className="proud-descendants">

            <div className="container">
                
                <p className="who-section-label">
                    Who We Are
                </p>

                <h2 className="section-title center">
                    The Proud Descendants of
                    Gajapati Kshatriyas
                </h2>

               

                <div className="heritage-grid">

                    {features.map(feature => (

                        <div
                            key={feature.id}
                            className="heritage-card"
                        >

                            <span className="heritage-icon">
                                <i className={feature.icon}></i>   
                            </span>

                            <h3 className="heritage-title">
                                {feature.title}
                            </h3>

                            <p className="heritage-desc">
                                {feature.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    )
}

export default HeritageFeatures