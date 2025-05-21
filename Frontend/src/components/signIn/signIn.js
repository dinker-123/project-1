import React, { useState } from 'react';
import style from "../signIn/signIn.module.css";
import { Link } from 'react-router-dom';

function Sign() {
  const [data, setData] = useState({ name: "", password: "", confirmPass: "" });

  const handleData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: data.name, password: data.password })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to sign up");
        return res.text();
      })
      .then((msg) => alert(msg))
      .catch((err) => alert("Error: " + err.message));
  };

  return (
    <div className={style.register}>
      <div className={style["col-1"]}>
        <h3>Sign In</h3>
        <span>Register and enjoy the service</span>

        <form id="form" className={style.signForm} onSubmit={handleSubmit}>
          <input
            type="email"
            id="name"
            placeholder="Username"
            required
            onChange={handleData}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={handleData}
          />
          <input
            type="password"
            id="confirmPass"
            placeholder="Confirm Password"
            required
            onChange={handleData}
          />
          <div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>

          <Link to="/Login"><p className={style.p}>Login In</p></Link>
        </form>
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default Sign;
