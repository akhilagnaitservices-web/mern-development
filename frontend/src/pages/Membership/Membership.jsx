import PageBanner from "../../components/PageBanner/PageBanner";
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

                    {/* Plans */}

                    <div className="section-title mt-60">
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

                    </div>

                    {/* Registration */}

                    <div className="section-title mt-60">
                        <h2>Membership Registration</h2>
                    </div>

                    <div className="membership-layout">

                        <div className="membership-form">

                            <form>

                                <div className="form-grid">

                                    <input placeholder="Full Name *" />
                                    <input placeholder="Father / Husband Name *" />

                                    <input placeholder="Gothram *" />
                                    <input placeholder="Surname / Inti Peru *" />

                                    <select>
                                        <option>Select Gender</option>
                                    </select>

                                    <input placeholder="Date Of Birth" type="date" />

                                    <input placeholder="Mobile Number" />
                                    <input placeholder="Email ID" />

                                </div>

                                <textarea
                                    rows="4"
                                    placeholder="Address"
                                ></textarea>

                                <div className="form-grid mt-20">

                                    <input placeholder="City" />
                                    <input placeholder="State" />
                                    <input placeholder="Pincode" />

                                </div>

                                <div className="upload-box">
                                    <label>Upload Photo</label>
                                    <input type="file" />
                                </div>

                                <button
                                    className="submit-btn"
                                    type="submit"
                                >
                                    Submit Registration
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

                </div>

            </section>
        </>
    );
};

export default Membership;