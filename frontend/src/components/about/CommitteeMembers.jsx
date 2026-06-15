import { Link } from 'react-router-dom'

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

                            {leader.president_photo ? (

                                <img
                                    src={leader.president_photo}
                                    alt={leader.president_name}
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

                <div className="leadership-view-all">

                    <Link
                        to="/membership"
                        className="btn btn-outline"
                    >
                        View All Committee Members
                    </Link>

                </div>

            </div>

        </section>

    )
}

export default CommitteeMembers