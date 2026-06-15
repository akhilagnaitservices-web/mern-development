import { Link } from 'react-router-dom'
import {getImageUrl} from '../../utils/imageHelper'
const CommitteeMembers = ({ leaders }) => {

    if (!leaders.length) return null

    return (

        <section className="about-president">

            <div className="container">

                <h2 className="section-title center">
                    Our Leadership
                </h2>
                <div className="leadership-grid">

                    {leaders.map(leader => (

                        <div
                            key={leader.id}
                            className="leader-card"
                        >

                            {leader.profile_image ? (

                                <img
                                    src={getImageUrl(leader.profile_image)}
                                    alt={leader.full_name}
                                    className="leader-photo"
                                />

                            ) : (

                                <div className="leader-photo-placeholder">
                                    👤
                                </div>

                            )}

                            <p className="leader-name">
                                {leader.full_name}
                            </p>

                            <p className="leader-role">
                                {leader.designation}
                            </p>

                        </div>

                    ))}

                </div>


            </div>

        </section>

    )
}

export default CommitteeMembers