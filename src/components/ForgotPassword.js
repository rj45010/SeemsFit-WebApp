import React, { useState } from "react";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
      console.error(err.message);
    }
  };

  return (
    <section className="gradient-background-login">
      <div className="container vh-100 pt-4">
        <div className="login_form">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: "2rem" }}>
              <div className="card-body p-5">
                <h3>Forgot Password</h3>
                <form onSubmit={handlePasswordReset}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-outline-light btn-lg px-4 me-md-2"
                    >
                      Send Reset Email
                    </button>
                  </div>
                  {message && <p className="text-success mt-3">{message}</p>}
                  {error && <p className="text-danger mt-3">{error}</p>}
                </form>
                <p className="text-center text-muted mt-5 mb-0">
                  Remember your password?{" "}
                  <a href="/login" className="fw-bold text-body">
                    <u>Login here</u>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
