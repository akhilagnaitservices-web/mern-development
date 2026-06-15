import { useState } from "react";
import { registerForEvent } from "../../services/eventsService";

const EventRegistrationModal = ({
    event,
    onClose
}) => {

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone_number: ""
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
            e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await registerForEvent({

                event_id:
                event.event_id,

                full_name:
                form.full_name,

                email:
                form.email,

                phone_number:
                form.phone_number

            });

            alert(
                "Registration Successful"
            );

            onClose();

        } catch (error) {

            alert(
                "Failed to register"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="event-modal-overlay">

            <div className="event-modal">

                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2>
                    Register For Event
                </h2>

                <p>
                    {event.event_title}
                </p>

                <form onSubmit={handleSubmit} className="event-register-form">

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Mobile Number *</label>
                            <input
                                type="tel"
                                name="phone_number"
                                placeholder="Enter mobile number"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <select name="gender">
                                <option value="">Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                            />
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                            />
                        </div>

                        <div className="form-group">
                            <label>Membership ID</label>
                            <input
                                type="text"
                                name="membership_id"
                                placeholder="Optional"
                            />
                        </div>

                        <div className="form-group">
                            <label>Family Members Attending</label>
                            <input
                                type="number"
                                name="members_count"
                                placeholder="0"
                            />
                        </div>

                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            rows="4"
                            name="message"
                            placeholder="Any special requirements..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-submit-btn"
                    >
                        Register For Event
                    </button>

                </form>

            </div>

        </div>

    );

};

export default EventRegistrationModal;