import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
 const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      setSuccess("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded mt-8"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
      {/* <div>
         <button onClick={() => loginWithRedirect()}>Log In By google</button>;
      </div> */}
    </>
  );
};

export default Login;
