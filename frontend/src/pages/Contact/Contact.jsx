import ContactCards   from '../../components/contact/ContactCards'
import ContactForm    from '../../components/contact/ContactForm'
import ContactMap     from '../../components/contact/ContactMap'
import ContactSupport from '../../components/contact/ContactSupport'
import PageBanner     from '../../components/PageBanner/PageBanner'
import '../../styles/contact.css'

const Contact = () => {
    return (
        <div className="contact-page">

            {/* 1. Page Banner */}
            <PageBanner page="contact-us" />

            {/* 2. Top Info Cards */}
            <section className="contact-top-section">
                <div className="container">
                    <h2 className="section-title center">Get In Touch</h2>
                
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--text-medium)',
                        marginTop: 'var(--space-3)'
                    }}>
                        We'd love to hear from you
                    </p>
                    <ContactCards />
                </div>
            </section>

            {/* 3. Form + Map */}
            <section className="contact-main-section">
                <div className="container">
                    <div className="contact-main-grid">
                        <ContactForm />
                        <ContactMap />
                    </div>
                </div>
            </section>

            {/* 4. Department Contacts */}
            <ContactSupport />

        </div>
    )
}

export default Contact