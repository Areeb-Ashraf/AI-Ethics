import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authManager } from "../firebase";
import "../styles/account.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const Alert = withReactContent(Swal);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      Alert.fire({
        title: "Please enter your email address.",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
      });
      return;
    }

    try {
      await authManager.sendPasswordReset(email);
      Alert.fire({
        title: "Success!",
        text: "If an account exists with this email, you will receive a password reset link.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/profile");
        }
      });
    } catch (err) {
      Alert.fire({
        title: "Error",
        text: "Failed to send password reset email",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
        footer: err.message,
      });
    }
  };

  return (
    <div className="account-container">
      <div className="top-right-link">
        <Link to="/profile">Back to Profile</Link>
      </div>
      <div className="text-container">
        <div className="text-title">Reset Your Password</div>
        <div className="text-description">
          Enter your email address below and we'll send you instructions to reset your password.
        </div>
      </div>
      <div className="input-container">
        <div className="form-header">Password Reset</div>
        <form className="form-container column" onSubmit={handleResetPassword}>
          <label className="label email">
            Email
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="button-container">
            <button id="submit-button" type="submit">
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
