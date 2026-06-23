import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLeadershipMembers } from '../../services/aboutService'

const Leadership = () => {
    const [leaders, setLeaders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getLeadershipMembers()
            .then(res => {
                if (res.data?.success) setLeaders(res.data.data || [])
            })
            .catch(err => console.error('Leadership error:', err))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="spinner" />
        </div>
    )

    if (!leaders.length) return null

    // First member is the president — featured separately
    const president = leaders[0]
    const otherMembers = leaders.slice(1)

    return (
        <section className="leadership" id="leadership">
            <div className="container">

                <h2 className="section-title center">Our Leadership</h2>
                <div className="gold-divider" />

                {/* ── Featured President ── */}
                <div className="leadership-president">
                    <div className="leadership-president-photo">
                        {president.profile_image ? (
                            <img
                                src={president.profile_image}
                                alt={president.full_name}
                                className="leadership-president-img"
                            />
                        ) : (
                            <div className="leadership-president-placeholder">
                                👤
                            </div>
                        )}
                        <div className="leadership-president-badge">
                            <span>⭐</span>
                        </div>
                    </div>
                    <div className="leadership-president-info">
                        <span className="who-section-label">Our Leader</span>
                        <h3 className="leadership-president-name">
                            {president.full_name}
                        </h3>
                        <p className="leadership-president-role">
                            {president.designation}
                        </p>
                        <div className="gold-divider"
                            style={{ margin: '16px 0', marginLeft: 0, width: '60px' }}
                        />
                        <p style={{
                            fontSize: 'var(--text-base)',
                            color: 'var(--text-medium)',
                            lineHeight: 1.8
                        }}>
                            Leading our community with vision, dedication and commitment
                            to preserving our rich Kshatriya heritage while building
                            a stronger and more unified community for future generations.
                        </p>
                    </div>
                </div>

                {/* ── Other Members Grid ── */}
                {otherMembers.length > 0 && (
                    <>
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--text-2xl)',
                            color: 'var(--primary)',
                            textAlign: 'center',
                            margin: 'var(--space-12) 0 var(--space-8)'
                        }}>
                            Executive Committee
                        </h3>
                        <div className="leadership-grid">
                            {otherMembers.map(member => (
                                <div key={member.id} className="leader-card">
                                    {member.profile_image ? (
                                        <img
                                            src={member.profile_image}
                                            alt={member.full_name}
                                            className="leader-photo"
                                        />
                                    ) : (
                                        <div className="leader-photo-placeholder">
                                            👤
                                        </div>
                                    )}
                                    <p className="leader-name">{member.full_name}</p>
                                    <p className="leader-role">{member.designation}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}

export default Leadership