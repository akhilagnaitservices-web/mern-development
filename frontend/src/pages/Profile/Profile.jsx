import { useState, useEffect } from 'react'
import { getMyProfile, updateMyProfile } from '../../services/authService'
import { Icons } from '../../constants/icons'
import '../../styles/profile.css'
import '../../styles/auth.css'

const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

const FIELDS = [
    { key: 'full_name', label: 'Full Name', editable: true, required: true },
    { key: 'father_husband_name', label: "Father/Husband Name", editable: true, required: true },
    { key: 'gothram', label: 'Gothram', editable: true, required: true },
    { key: 'surname', label: 'Surname', editable: true, required: true },
    { key: 'gender', label: 'Gender', editable: true },
    { key: 'date_of_birth', label: 'Date of Birth', editable: true, type: 'date' },
    { key: 'mobile_number', label: 'Mobile Number', editable: true },
    { key: 'email', label: 'Email', editable: true, type: 'email' },
    { key: 'address', label: 'Address', editable: true },
    { key: 'city', label: 'City', editable: true },
    { key: 'state', label: 'State', editable: true },
    { key: 'pincode', label: 'Pincode', editable: true },
    { key: 'member_id', label: 'Member ID', editable: false },
    { key: 'status', label: 'Status', editable: false },
]

const Profile = () => {

    const [profile, setProfile] = useState(null)
    const [form, setForm] = useState(null)
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const loadProfile = async () => {
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

    useEffect(() => {
        loadProfile()
    }, [])

    const startEdit = () => {
        setForm({ ...profile, date_of_birth: profile.date_of_birth ? profile.date_of_birth.slice(0, 10) : '' })
        setError('')
        setSuccessMessage('')
        setEditing(true)
    }

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError('')
        try {
            const res = await updateMyProfile(form)
            if (res.data?.success) {
                setSuccessMessage('Profile updated successfully.')
                setEditing(false)
                await loadProfile()
            } else {
                setError(res.data?.message || 'Failed to update profile.')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-card">

                    <div className="profile-banner">
                        <div className="profile-avatar">
                            <Icons.User size={40} strokeWidth={2} />
                        </div>
                        <h2 className="profile-title">
                            {profile?.full_name || 'My Profile'}
                        </h2>
                        {profile?.status && <span className="profile-badge">{profile.status}</span>}
                    </div>

                    <div className="profile-body">
                        {loading && <p className="profile-text">Loading profile...</p>}
                        {error && <p className="profile-text profile-error">{error}</p>}
                        {successMessage && <p className="profile-text">{successMessage}</p>}

                        {profile && !editing && (
                            <>
                                <ul className="profile-info-list">
                                    {FIELDS.map((f) => (
                                        <li className="profile-info-row" key={f.key}>
                                            <span className="profile-info-label">{f.label}</span>
                                            <span className="profile-info-value">
                                                {f.type === 'date' ? formatDate(profile[f.key]) : (profile[f.key] || '-')}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="profile-actions">
                                    <button type="button" className="btn btn-primary" onClick={startEdit}>
                                        Edit Profile
                                    </button>
                                </div>
                            </>
                        )}

                        {form && editing && (
                            <form onSubmit={handleSave} className="profile-form">
                                {FIELDS.filter((f) => f.editable).map((f) => (
                                    <div className="auth-group" key={f.key}>
                                        <label className="auth-label">{f.label}{f.required ? ' *' : ''}</label>
                                        <input
                                            type={f.type || 'text'}
                                            name={f.key}
                                            className="auth-input"
                                            value={form[f.key] || ''}
                                            onChange={handleChange}
                                            required={f.required}
                                        />
                                    </div>
                                ))}
                                <div className="profile-form-actions">
                                    <button type="submit" className="btn btn-primary" disabled={saving}>
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button type="button" className="btn btn-outline" onClick={() => setEditing(false)} disabled={saving}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
