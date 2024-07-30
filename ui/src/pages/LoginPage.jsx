import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    if (res.ok) {
      
      const data = await res.json();
      console.log(data);
      const userType = data.userType;
      if(data.userType==='employee'){
      toast.success(`Logged in as: ${userType}`);
      return navigate("/employee-dashboard");
      }
      else if(data.userType==='admin'){
        toast.success(`Logged in as: ${userType}`);
      return navigate("/admin-dashboard");

      }
    } else {
      toast.error("Please check your credentials");
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-full max-w-xs m-auto bg-blue-100 rounded p-5">
        <header></header>
        <form onSubmit={loginSubmit}>
          <div>
            <h1 className="block mb-3 text-blue-500 font-extrabold text-2xl">Login</h1>
          </div>
          <div>
            <label className="block mb-2 text-blue-500" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full h-8 p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-blue-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full h-8 p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            >
              Login
            </button>
          </div>
        </form>
        <footer>
          {/* <Link className="text-blue-700 hover:text-pink-700 text-sm float-left" to="#">
            Forgot Password?
          </Link> */}
          {/* <Link className="text-blue-700 hover:text-pink-700 text-sm float-right" to="/sign-up">
            Create Account
          </Link> */}
        </footer>
      </div>
    </div>
  );
};

const getUserType = () => {
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Authtoken"))
    ?.split("=")[1];

  const decoded = jwtDecode(authToken);
  const userType = decoded.userType;
  return userType;
};

export { LoginPage as default, getUserType };
