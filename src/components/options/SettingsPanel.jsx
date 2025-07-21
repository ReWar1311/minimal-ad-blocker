import React from "react";
import { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WebIcon from "@mui/icons-material/Language";
import emailjs from "@emailjs/browser";
import InsertCommentIcon from '@mui/icons-material/InsertComment';

// environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SettingsPanel = ({
  onResetStats,
  onResetRules,
  isBlocking,
  onToggleBlocking,
}) => {
  const [feedbackType, setFeedbackType] = useState("report-ad");
  const [feedbackText, setFeedbackText] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const subject =
        feedbackType === "report-ad"
          ? "AdBlock Extension: New Ad/Site Report"
          : "AdBlock Extension: Feature Request";

      // Prepare template parameters
      const templateParams = {
        subject: subject,
        type: feedbackType === "report-ad" ? "Ad/Site Report" : "Feature Request",
        name: userName || "Anonymous",
        email: userEmail || "No email provided",
        website: websiteUrl || "Not specified",
        message: feedbackText,
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitMessage("Thank you for your feedback!");
        // Reset form
        setFeedbackText("");
        setWebsiteUrl("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      setSubmitMessage("Error sending feedback. Please try again later.");
      console.error("Error sending feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2 className="panel-title">SETTINGS</h2>
        <p className="panel-subtitle">
          Configure system preferences and actions
        </p>
      </div>

      <div className="settings-section">
        <div className="setting-card">
          <div className="setting-header">
            <h3 className="setting-title">MASTER PROTECTION</h3>
          </div>
          <p className="setting-description">
            Enable or disable the entire protection system
          </p>
          <div className="setting-action">
            <button
              className={`toggle-action-button ${isBlocking ? "on" : "off"}`}
              onClick={onToggleBlocking}
            >
              {isBlocking ? "PROTECTION ON" : "PROTECTION OFF"}
            </button>
          </div>
        </div>

        <div className="setting-card">
          <div className="setting-header">
            <h3 className="setting-title">RESET STATISTICS</h3>
          </div>
          <p className="setting-description">
            Reset all blocking statistics to zero
          </p>
          <div className="setting-action">
            <button
              className="reset-button"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to reset all statistics?"
                  )
                ) {
                  onResetStats();
                }
              }}
            >
              RESET STATS
            </button>
          </div>
        </div>

        <div className="setting-card danger">
          <div className="setting-header">
            <h3 className="setting-title">FACTORY RESET</h3>
          </div>
          <p className="setting-description">
            Reset all rules and settings to default values
          </p>
          <div className="setting-action">
            <button
              className="danger-button"
              onClick={() => {
                if (
                  window.confirm(
                    "WARNING: This will delete all your custom rules and settings. Are you sure?"
                  )
                ) {
                  onResetRules();
                }
              }}
            >
              RESET ALL SETTINGS
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Section with Direct Email Form */}
      <div className="feedback-section">
        <div className="feedback-container">
          <div className="feedback-icon"><InsertCommentIcon /></div>
          <div className="feedback-content">
            <h3>Help Improve Protection</h3>
            <p>
              Found an ad that wasn't blocked? Want to suggest a new site for
              our blocklist?
            </p>

            <form className="feedback-form" onSubmit={handleSubmitFeedback}>
              <div className="feedback-type-selector">
                <label
                  className={`type-option ${
                    feedbackType === "report-ad" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="feedbackType"
                    value="report-ad"
                    checked={feedbackType === "report-ad"}
                    onChange={() => setFeedbackType("report-ad")}
                  />
                  <span className="option-label">Report Ad/Site</span>
                </label>
                <label
                  className={`type-option ${
                    feedbackType === "feature-request" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="feedbackType"
                    value="feature-request"
                    checked={feedbackType === "feature-request"}
                    onChange={() => setFeedbackType("feature-request")}
                  />
                  <span className="option-label">Suggest Feature</span>
                </label>
              </div>

              <div className="form-fields">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Your Name (optional)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="feedback-input half"
                  />
                  <input
                    type="email"
                    placeholder="Your Email (optional)"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="feedback-input half"
                  />
                </div>

                {feedbackType === "report-ad" && (
                  <input
                    type="url"
                    placeholder="Website URL where ad appears"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="feedback-input"
                  />
                )}

                <textarea
                  placeholder={
                    feedbackType === "report-ad"
                      ? "Describe the ad or tracker that wasn't blocked"
                      : "Describe your feature suggestion"
                  }
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="feedback-input feedback-textarea"
                  required
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-feedback-button"
                disabled={isSubmitting || !feedbackText}
              >
                {isSubmitting ? "Sending..." : "Submit Feedback"}
              </button>

              {submitMessage && (
                <div className="submit-message">{submitMessage}</div>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="about-section">
        <div className="about-header">
          <h3 className="section-title">ABOUT</h3>
        </div>
        <div className="about-content">
          <div>
            <p>
              <strong>Shield</strong> - Advanced Trackers and Ad-Blocking System
            </p>
            <p>Version: 3.0.0</p>
            <p>Engine: Declarative Net Request API</p>
            <p>Icons - Material Design Icons by Google</p>
            <p>Framework - React, Material UI</p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/ReWar1311/minimal-ad-blocker"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/ReWar1311/minimal-ad-blocker
              </a>
            </p>
            <br />
            <br />
          </div>
          <div>
            <h3>About the developer:</h3>
            <p>
              <strong>Author</strong> - Prashant Rewar
            </p>
            <a href="mailto:prashantrewariitd@gmail.com">
              <MailIcon className="contact-icon" />
            </a>
            <a
              href="https://github.com/ReWar1311"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="contact-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/prashant-rewar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="contact-icon" />
            </a>
            <a
              href="https://rewar1311.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WebIcon className="contact-icon" />
            </a>
            {/* <p><strong>Email</strong> - prashant.rewar@example.com</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
