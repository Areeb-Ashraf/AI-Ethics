import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authManager } from "../firebase";
import googleLogo from "../google.png";
import eyeIcon from "../eye.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../styles/account.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const Alert = withReactContent(Swal);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Alert.fire({
        title: "Please enter both email and password.",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
      });
      return;
    }
    try {
      const isRegistered = await authManager.isUserRegistered(email);
      if (!isRegistered) {
        Alert.fire({
          title: "User not registered. Please sign up.",
          confirmButtonText: "OK",
          confirmButtonColor: "#0056D1",
        });
        return;
      }
      await authManager.logInWithEmailAndPassword(email, password);
      // alert('Login successful!');
      Alert.fire({
        title: "Login successful!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoggedIn(true);
          navigate("/dashboard");
        }
      });
    } catch (err) {
      Alert.fire({
        title: "Oops...",
        icon: "error",
        text: "Login failed",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
        footer: err.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authManager.loginWithGoogle();
      Alert.fire({
        title: "Google login successful!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoggedIn(true);
          navigate("/dashboard");
        }
      });
    } catch (err) {
      console.error("Google login failed:", err.message);
      Alert.fire({
        title: "Oops...",
        icon: "error",
        text: "Google login failed",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
        footer: err.message,
      });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.fire({
        title: "Please enter your email address to reset your password.",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
      });
      return;
    }
    try {
      await authManager.sendPasswordReset(email);
      Alert.fire({
        title:
          "If an account with that email exists, a password reset link has been sent.",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
      });
    } catch (err) {
      console.error("Password reset failed:", err.message);
      Alert.fire({
        title: "Error sending password reset email",
        confirmButtonText: "OK",
        confirmButtonColor: "#0056D1",
        footer: err.message,
      });
    }
  };

  return (
    <div className="account-container">
      <div className="top-right-link">
        <Link to="/welcome">Back to Welcome</Link>
      </div>
      <div className="text-container">
        <div className="text-title">Master AI with ethical integrity</div>
        <div className="text-description">
          Step into the future of technology by learning how to build AI systems
          that are fair, transparent, and accountable. Join us and become a
          leader in responsible AI development.
        </div>
      </div>
      <div className="input-container">
        <div className="form-header">Log in</div>
        <div className="form-sub-text">
          Need an account? <Link to="/signup">Sign up</Link>
        </div>
        <form className="form-container column" onSubmit={handleLogin}>
          <label className="label email">
            Email
            <input
              type="text"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="label">
            Password
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
              />
              <img
                src={eyeIcon}
                alt="Toggle password visibility"
                className="toggle-password-visibility"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            </div>
          </label>

          <div className="button-container">
            <button id="submit-button" type="submit">
              Log in
            </button>
            <button id="google-login-button" onClick={handleGoogleLogin}>
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              Google Login
            </button>
            <button id="forgot-password-button" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
