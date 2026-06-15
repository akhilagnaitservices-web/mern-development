import ContactHero    from '../../components/contact/ContactHero'
import ContactCards   from '../../components/contact/ContactCards'
import ContactForm    from '../../components/contact/ContactForm'
import ContactMap     from '../../components/contact/ContactMap'
import ContactSupport from '../../components/contact/ContactSupport'
import PageBanner from "../../components/PageBanner/PageBanner";
import '../../styles/contact.css'

const Contact = () => {
    return (
        <div className="contact-page">

         <PageBanner page="contact-us   " />

            {/* 2. Info Cards + Contact Form */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-grid">
                        <div>
                            <h2 className="section-title">Get In Touch</h2>
                            <div className=""
                                style={{ margin: '16px 0 32px', marginLeft: 0 }} />
                            <ContactCards />
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* 3. Support Options */}
            <section style={{
                background: 'var(--bg-main)',
                padding: 'var(--space-16) 0'
            }}>
                <div className="container">
                    <h2 className="section-title center">How Can We Help?</h2>
                    <ContactSupport />
                </div>
            </section>

            {/* 4. Google Map */}
            <section style={{
                padding: 'var(--space-16) 0',
                background: 'var(--bg-white)'
            }}>
                <div className="container">
                    <h2 className="section-title center">Find Us</h2>
                    <ContactMap />
                </div>
            </section>

        </div>
    )
}

export default Contact