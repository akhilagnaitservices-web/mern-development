import { useState, useEffect } from 'react'
import { getContactInfo } from '../../services/contactService'

const DEFAULT_MAP = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3173522617!2d78.24323045!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"

const ContactMap = () => {
    const [mapUrl, setMapUrl] = useState(null)
    const [address, setAddress] = useState('')

    useEffect(() => {
        getContactInfo()
            .then(res => {
                if (res.data?.success && res.data?.data) {
                    const info = res.data.data
                    if (info.google_map_url) setMapUrl(info.google_map_url)
                    if (info.address) setAddress(info.address)
                }
            })
            .catch(() => {})
    }, [])

    return (
        <div>
            {address && (
                <div className="contact-map-address">
                    <span>📍</span>
                    <p>{address}</p>
                </div>
            )}
            <div className="contact-map">
                <iframe
                    src={mapUrl || DEFAULT_MAP}
                    title="VRKSS Office Location"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    )
}

export default ContactMap