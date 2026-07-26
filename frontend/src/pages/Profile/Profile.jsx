import { useState, useEffect } from 'react'
import { getMyProfile } from '../../services/authService'
import { Icons } from '../../constants/icons'
import '../../styles/profile.css'

const formatDateTime = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })
}

const prettyRole = (role) => {
    if (!role) return '-'
    return role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const Profile = () => {

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchProfile = async () => {
            try {
                const res = await getMyProfile()
                if (res.data?.success) {
                    setProfile(res.data.data)
                } else {
                    setError(res.data?.message || 'Failed to load profile.')
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load profile.')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()

    }, [])

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-card">

                    <div className="profile-avatar">
                        <Icons.User size={32} strokeWidth={2} />
                    </div>

                    <h2 className="profile-title">
                        {profile?.full_name || 'My Profile'}
                    </h2>
                    <div className="gold-divider" />

                    {loading && <p className="profile-text">Loading profile...</p>}
                    {error && <p className="profile-text profile-error">{error}</p>}

                    {profile && (
                        <ul className="profile-info-list">
                            <li className="profile-info-row">
                                <span className="profile-info-label">User ID</span>
                                <span className="profile-info-value">{profile.user_id}</span>
                            </li>
                            <li className="profile-info-row">
                                <span className="profile-info-label">Full Name</span>
                                <span className="profile-info-value">{profile.full_name}</span>
                            </li>
                            <li className="profile-info-row">
                                <span className="profile-info-label">Username</span>
                                <span className="profile-info-value">{profile.username}</span>
                            </li>
                            <li className="profile-info-row">
                                <span className="profile-info-label">Email</span>
                                <span className="profile-info-value">{profile.email}</span>
                            </li>
                            <li className="profile-info-row">
                                <span className="profile-info-label">Phone Number</span>
                                <span className="profile-info-value">{profile.phone_number || '-'}</span>
                            </li>
                            <li className="profile-info-row">
                                <span className="profile-info-label">Role</span>
                                <span className="profile-info-value">{prettyRole(profile.role)}</span>
                            </li>
                            <li className="profile-info-row">
                                <span className="profile-info-label">Status</span>
                                <span className="profile-info-value">{profile.status}</span>
                            </li>
                            <li className="profile-info-row">
                                <span className="profile-info-label">Joined On</span>
                                <span className="profile-info-value">{formatDateTime(profile.created_at)}</span>
                            </li>
                            <li className="profile-info-row">
                                <span className="profile-info-label">Last Login</span>
                                <span className="profile-info-value">{formatDateTime(profile.last_login)}</span>
                            </li>
                        </ul>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Profile
