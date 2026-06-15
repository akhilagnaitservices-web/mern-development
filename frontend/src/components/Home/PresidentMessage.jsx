import { Link } from 'react-router-dom'
 import { getImageUrl } from "../../utils/imageHelper";
const PresidentMessage = ({ data }) => {
    if (!data) return null

    return (
        <section className="president">
            <div className="container">
                <div className="president-inner">
                    <div className="president-photo-wrap">
                        {data.president_photo ? (
                            <img
                                src={getImageUrl(data.president_photo)}
                                alt={data.president_name}
                                className="president-photo"
                            />
                        ) : (
                            <div className="president-photo-placeholder">👤</div>
                        )}
                        <div>
                            <p className="president-name">{data.president_name}</p>
                            <p className="president-designation">{data.designation}</p>
                           
                        </div>
                    </div>

                    <div className="president-content">
                        <h2 className="section-title">
                            {data.message_title || 'President Message'}
                        </h2>
                    
                        <div style={{ margin: '16px 0 24px' }} />
                        <p className="president-message-text">
                            {data.message_description}
                        </p>
                        {data.button_name && (
                            <Link
                                to={data.button_link || '/about'}
                                className="btn btn-primary"
                            >
                                {data.button_name}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PresidentMessage