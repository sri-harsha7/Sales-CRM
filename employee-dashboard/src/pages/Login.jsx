import React, { useState } from "react";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../config/EmployeeContext";

const Login = () => {
  const nav = useNavigate();
  const { fetchLogin } = useEmployeeContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetchLogin({ email, password });

    if (result.success) {
      nav("/dashboard"); // navigate on successful login
    } else {
      alert(result.message || "Login failed");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <Header page="Login" />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Login to your Account</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
