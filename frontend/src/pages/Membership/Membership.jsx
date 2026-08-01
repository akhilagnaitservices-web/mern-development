import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerMembership } from "../../services/membershipService";
import "../../styles/membership.css";

import {
    FaUsers,
    FaShieldAlt,
    FaGraduationCap,
    FaHandHoldingHeart,
    FaVoteYea,
    FaIdCard,
    FaFileAlt,
    FaHeadset
} from "react-icons/fa";

const Membership = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        full_name: "", father_husband_name: "", gothram: "", surname: "",
        gender: "", date_of_birth: "", mobile_number: "", email: "",
        address: "", city: "", state: "", pincode: "",
        password: "", confirm_password: "",
    })
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "mobile_number" || name === "pincode") {
            const digits = value.replace(/\D/g, "").slice(0, name === "mobile_number" ? 10 : 6)
            setForm((prev) => ({ ...prev, [name]: digits }))
        } else {
            setForm((prev) => ({ ...prev, [name]: value }))
        }
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.full_name || !form.father_husband_name || !form.gothram || !form.surname || !form.password) {
            setError("Please fill in all required fields.")
            return
        }

        if (form.password !== form.confirm_password) {
            setError("Passwords do not match.")
            return
        }

        if (form.mobile_number && form.mobile_number.length !== 10) {
            setError("Mobile Number must be 10 digits.")
            return
        }

        if (form.pincode && form.pincode.length !== 6) {
            setError("Pincode must be 6 digits.")
            return
        }

        setLoading(true)
        try {
            const data = new FormData()
            Object.entries(form).forEach(([key, value]) => {
                if (key !== "confirm_password") data.append(key, value)
            })
            if (photo) data.append("photo", photo)

            const res = await registerMembership(data)

            if (res.data?.success) {
                setSuccess(res.data.message || "Registration submitted successfully.")
                setTimeout(() => navigate("/login"), 1500)
            } else {
                setError(res.data?.message || "Registration failed.")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* <PageBanner page="membership" /> */}

            <div className="membership-banner">

              <div className="membership-banner-content">

                  <h1 className="membershipbanner">Membership Registration</h1>

                  <p>
                      Join Vadiyaraju Kshatriya Seva Samiti and become
                      a part of our growing community dedicated to
                      culture, unity, service, and future generations.
                  </p>

              </div>

          </div>
            <section className="membership-page">

                <div className="container">


                    {/* Plans */}

                    {/* <div className="section-title mt-60">
                        <h2>Membership Plans</h2>
                    </div>

                    <div className="plans-grid">

                        <div className="plan-card">
                            <h4>Basic Membership</h4>

                            <div className="price">
                                ₹500
                                <span>/ Year</span>
                            </div>

                            <ul>
                                <li>Community Updates</li>
                                <li>Event Participation</li>
                                <li>Digital Membership Card</li>
                                <li>Basic Support</li>
                            </ul>

                            <button>
                                Join Now
                            </button>
                        </div>

                        <div className="plan-card featured">

                            <span className="badge">
                                Most Popular
                            </span>

                            <h4>Premium Membership</h4>

                            <div className="price">
                                ₹1500
                                <span>/ Year</span>
                            </div>

                            <ul>
                                <li>All Basic Benefits</li>
                                <li>Priority Event Access</li>
                                <li>Welfare Support Eligibility</li>
                                <li>Matrimony Access</li>
                                <li>Voting Rights</li>
                            </ul>

                            <button>
                                Join Now
                            </button>

                        </div>

                        <div className="plan-card">
                            <h4>Lifetime Membership</h4>

                            <div className="price">
                                ₹5000
                                <span>/ One Time</span>
                            </div>

                            <ul>
                                <li>All Premium Benefits</li>
                                <li>Lifetime Validity</li>
                                <li>Special Recognition</li>
                                <li>Priority Support</li>
                                <li>Family Coverage</li>
                            </ul>

                            <button>
                                Join Now
                            </button>
                        </div>

                    </div> */}

                    {/* Registration */}

                    <div className="section-title mt-60">
                        <h2>Membership Registration</h2>
                    </div>

                    <div className="membership-layout">

                        <div className="membership-form">

                            {success && <p className="form-success">{success}</p>}
                            {error && <p className="form-error">{error}</p>}

                            <form onSubmit={handleSubmit}>

                                <div className="form-grid">

                                    <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name *" />
                                    <input name="father_husband_name" value={form.father_husband_name} onChange={handleChange} placeholder="Father / Husband Name *" />

                                    <input name="gothram" value={form.gothram} onChange={handleChange} placeholder="Gothram *" />
                                    <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname *" />

                                    <select name="gender" value={form.gender} onChange={handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <input name="date_of_birth" value={form.date_of_birth} onChange={handleChange} type="date" />

                                    <input name="mobile_number" value={form.mobile_number} onChange={handleChange} placeholder="Mobile Number" type="tel" inputMode="numeric" maxLength={10} />
                                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email ID" type="email" />

                                </div>

                                <textarea
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Address"
                                ></textarea>

                                <div className="form-grid mt-20">

                                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
                                    <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
                                    <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" type="text" inputMode="numeric" maxLength={6} />

                                </div>

                                <div className="form-grid mt-20">

                                    <input name="password" value={form.password} onChange={handleChange} placeholder="Password *" type="password" />
                                    <input name="confirm_password" value={form.confirm_password} onChange={handleChange} placeholder="Confirm Password *" type="password" />

                                </div>

                                <div className="upload-box">
                                    <label>Upload Photo</label>
                                    <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
                                </div>

                                <button
                                    className="submit-btn"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit Registration"}
                                </button>

                            </form>

                        </div>

                        <div className="membership-sidebar">

                            <div className="info-card">

                                <h4>
                                    <FaFileAlt />
                                    Required Documents
                                </h4>

                                <ul>
                                    <li>Passport Size Photo</li>
                                    <li>Aadhaar Card</li>
                                    <li>Address Proof</li>
                                    <li>Signature</li>
                                </ul>

                            </div>

                            <div className="info-card help-card">

                                <FaHeadset className="help-icon" />

                                <h4>Need Help?</h4>

                                <p>
                                    For membership assistance
                                    contact us.
                                </p>

                                <p>
                                    +91 9876543210
                                </p>

                                <p>
                                    info@vksssamiti.org
                                </p>

                            </div>

                        </div>

                    </div>

                                        {/* Benefits */}

                    <div className="section-title">
                        <h2>Membership Benefits</h2>
                    </div>

                    <div className="benefits-grid">

                        <div className="benefit-card">
                            <FaUsers />
                            <h4>Community Connection</h4>
                            <p>
                                Connect with thousands of
                                Vadiyaraju Kshatriya families.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <FaShieldAlt />
                            <h4>Exclusive Privileges</h4>
                            <p>
                                Access community programs
                                and welfare initiatives.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <FaGraduationCap />
                            <h4>Support Education</h4>
                            <p>
                                Contribute to educational
                                welfare programs.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <FaHandHoldingHeart />
                            <h4>Welfare Support</h4>
                            <p>
                                Be part of social and
                                emergency support.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <FaVoteYea />
                            <h4>Voting Rights</h4>
                            <p>
                                Participate in important
                                community decisions.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <FaIdCard />
                            <h4>Digital ID Card</h4>
                            <p>
                                Receive official member
                                identification.
                            </p>
                        </div>

                    </div>


                </div>

                

            </section>
        </>
    );
};

export default Membership;