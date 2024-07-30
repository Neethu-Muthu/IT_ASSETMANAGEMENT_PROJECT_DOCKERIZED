import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("admin");
  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (res.ok) {
      toast.success(`Signup success`);
      navigate("/login");
    } else {
      toast.error(`Please check the input data`);
      navigate("/sign-up");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const userDetails = {
      userName,
      password,
      email,
      userType
    };

    signupSubmit(userDetails);
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-full max-w-xs m-auto bg-blue-100 rounded p-5">
        <header></header>
        <form onSubmit={submitForm}>
          <div>
            <h1 className="block mb-2 text-blue-500 font-extrabold text-2xl">
              Signup
            </h1>
          </div>
          <div>
            <label className="block mb-2 text-blue-500" htmlFor="username">
              Username
            </label>
            <input
              className="w-full h-8 p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-3 text-blue-500" htmlFor="email">
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
          <div className="mb-4">
            <label className="block mb-2 text-blue-500" htmlFor="userType">
              Role
            </label>
            <select
              id="userType"
              name="userType"
              className="border-b-2 border-indigo-500 w-full h-8 p-2 text-indigo-700 outline-none focus:bg-gray-300"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
          
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>
        <footer>
          {/* <Link className="text-blue-700 hover:text-pink-700 text-sm float-left" to="#">
            Forgot Password?
          </Link> */}
          <Link className="text-blue-700 hover:text-pink-700 text-sm float-right" to="/login">
            Login
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default SignupPage;
