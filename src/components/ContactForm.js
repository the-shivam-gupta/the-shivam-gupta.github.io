"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [alert, setAlert] = useState(null);
  const panelRef = useRef(null);

  const FIELD_IDS = {
    "first-name": "firstName",
    "last-name": "lastName",
    "e-mail": "email",
    message: "message",
  };

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [FIELD_IDS[e.target.id]]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, message } = formData;
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if (!firstName || !lastName || !message) {
      setAlert({
        type: "error",
        text: "Ensure that all fields are filled out accurately.",
      });
    } else if (!email.match(emailRegex)) {
      setAlert({ type: "error", text: "The email entered is invalid." });
    } else {
      setAlert({
        type: "success",
        text: "Thanks for your message. I'll respond soon.",
      });
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setTimeout(() => setAlert(null), 3000);
    }
  }

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              panel.classList.add("contact-in-view");
              observer.unobserve(panel);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
      );
      observer.observe(panel);
      return () => observer.disconnect();
    } else {
      panel.classList.add("contact-in-view");
    }
  }, []);

  return (
    <section className="contact-container" id="contact">
      <div className="container contact-wrap">
        <div className="contact-panel" ref={panelRef}>
          <div className="contact-heading">
            <p className="contact-kicker">Get in touch</p>
            <h2 className="contact-title title">
              {"Contact".split("").map((l, i) => (
                <span className="letter" key={i}>
                  {l}
                </span>
              ))}
            </h2>
            <p className="contact-sub">
              Drop a note — I&apos;ll get back as soon as I can.
            </p>
          </div>

          {alert && (
            <div
              className={"alert is-" + alert.type}
              role="status"
              aria-live="polite"
            >
              {alert.text}
            </div>
          )}

          <form
            action=""
            method=""
            className="form"
            id="myForm"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <input
                type="text"
                name="first_name"
                id="first-name"
                placeholder="First name"
                autoComplete="off"
                value={formData.firstName}
                onChange={handleChange}
              />
              <label htmlFor="first-name">First name</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="last_name"
                id="last-name"
                placeholder="Last Name"
                autoComplete="off"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label htmlFor="last-name">Last name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="e-mail"
                id="e-mail"
                placeholder="e-mail"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="e-mail">Email</label>
            </div>

            <div className="textarea-group">
              <textarea
                name="message"
                id="message"
                rows="5"
                placeholder="Message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="message">Message</label>
            </div>

            <div className="button-area submit-btn">
              <button type="submit" id="showAlert">
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
