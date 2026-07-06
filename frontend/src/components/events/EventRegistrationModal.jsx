import { useState } from "react";
import { createPortal } from "react-dom";
import { registerForEvent } from "../../services/eventsService";

const EventRegistrationModal = ({ event, onClose }) => {

    const [form, setForm] = useState({
        full_name: "",
        mobile_number: "",
        email: "",
        members_count: 1,
        remarks: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await registerForEvent({

                event_id: event.event_id,

                full_name: form.full_name,

                mobile_number: form.mobile_number,

                email: form.email,

                members_count: form.members_count,

                remarks: form.remarks

            });

            if (res.data.success) {

                alert("Registration Successful");

                setForm({
                    full_name: "",
                    mobile_number: "",
                    email: "",
                    members_count: 1,
                    remarks: ""
                });

                onClose();

            }

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    const modalContent = (

        <div
            className="event-modal-overlay"
            onClick={(e) => {

                if (e.target === e.currentTarget)
                    onClose();

            }}
        >

            <div className="event-modal">

                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2>Register For Event</h2>

                <p className="event-register-title">
                    {event.event_title}
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="event-register-form"
                >

                    <div className="form-group">

                        <label>Full Name *</label>

                        <input
                            type="text"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Mobile Number *</label>

                       <input
                            type="tel"
                            name="mobile_number"
                            placeholder="Enter Mobile Number"
                            value={form.mobile_number}
                            maxLength={10}
                            required
                            onChange={(e) => {

                                const value = e.target.value.replace(/\D/g, "");

                                if (value.length <= 10) {
                                    setForm({
                                        ...form,
                                        mobile_number: value
                                    });
                                }

                            }}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter Email Address"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Family Members</label>

                        <input
                            type="number"
                            min="1"
                            name="members_count"
                            value={form.members_count}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Remarks</label>

                        <textarea
                            rows="4"
                            name="remarks"
                            value={form.remarks}
                            onChange={handleChange}
                            placeholder="Any remarks..."
                        />

                    </div>

                    <button
                        type="submit"
                        className="register-submit-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Submitting..."
                            : "Register Now"}

                    </button>

                </form>

            </div>

        </div>

    );

    return createPortal(
        modalContent,
        document.body
    );

};

export default EventRegistrationModal;