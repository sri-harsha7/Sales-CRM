import React from "react";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    nav("/dashboard");
  };
  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <Header page="Login"></Header>
      </div>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <h3>Login to your Account</h3>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
