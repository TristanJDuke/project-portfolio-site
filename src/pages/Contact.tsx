import { useState, useEffect } from "react";

export default function Contact() {
    document.title = "Contact | Portfolio";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formStatus, setFormStatus] = useState<"idle" | "saved" | "submitted">("idle");

    useEffect(() => {
        const savedDraft = localStorage.getItem("contactDraft");
        if (savedDraft) {
            setFormData(JSON.parse(savedDraft));
            setFormStatus("saved");
        }
    }, []);

    useEffect(() => {
        if (formStatus !== "submitted") {
            localStorage.setItem("contactDraft", JSON.stringify(formData));
        }
    }, [formData, formStatus]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        const nameRegex = /^[A-Za-zÀ-ÿ' -]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const subjectRegex = /^[A-Za-z\s]+$/;
        const messageRegex = /^[^<>]*$/;

        if (!nameRegex.test(formData.name)) newErrors.name = "Invalid name.";
        if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email.";
        if (!subjectRegex.test(formData.subject)) newErrors.subject = "Subject should be letters only.";
        if (!messageRegex.test(formData.message)) newErrors.message = "Message contains disallowed characters.";
        if (!formData.consent) newErrors.consent = "You must accept the consent to proceed.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const messageToSend = { ...formData, date: new Date().toISOString() };

        try {
            const res = await fetch("http://localhost:3001/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageToSend),
            });

            if (!res.ok) throw new Error("Failed to submit message");

            setFormStatus("submitted");
            localStorage.removeItem("contactDraft");
            setFormData({ name: "", email: "", subject: "", message: "", consent: false });
        } catch (err) {
            alert("Error submitting the message.");
            console.error(err);
        }
    };


    return (
        <div className="container mt-4">
            <h2>Contact Me</h2>

            {formStatus === "saved" && (
                <p className="text-info">Draft loaded from previous session.</p>
            )}
            {formStatus === "submitted" && (
                <p className="text-success">Message submitted successfully!</p>
            )}

            <div className="themed-container">
                <form onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            name="name"
                            type="text"
                            className={`form-control themed-input ${errors.name ? "is-invalid" : ""}`}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            name="email"
                            type="email"
                            className={`form-control themed-input ${errors.email ? "is-invalid" : ""}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Subject */}
                    <div className="mb-3">
                        <label className="form-label">Subject:</label>
                        <input
                            name="subject"
                            type="text"
                            className={`form-control themed-input ${errors.subject ? "is-invalid" : ""}`}
                            value={formData.subject}
                            onChange={handleChange}
                        />
                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>

                    {/* Message */}
                    <div className="mb-3">
                        <label className="form-label">Message:</label>
                        <textarea
                            name="message"
                            rows={4}
                            className={`form-control themed-input ${errors.message ? "is-invalid" : ""}`}
                            value={formData.message}
                            onChange={handleChange}
                        />
                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>

                    {/* Consent Checkbox */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            name="consent"
                            className={`form-check-input themed-input ${errors.consent ? "is-invalid" : ""}`}
                            checked={formData.consent}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">
                            I consent to be contacted and understand my data will be stored securely.
                        </label>
                        {errors.consent && <div className="invalid-feedback">{errors.consent}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );

}
