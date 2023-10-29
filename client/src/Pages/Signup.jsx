import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({});

    const handleInput = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();
    }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl my-7 text-center text-stone-700">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Username"
          className="p-3 focus:outline-none border rounded-lg"
          id="username"
          onChange={handleInput}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 focus:outline-none border rounded-lg"
          id="email"
          onChange={handleInput}
        />
        <input
          type="Password"
          placeholder="Password"
          className="p-3 focus:outline-none border rounded-lg"
          id="password"
          onChange={handleInput}
        />
        <button
          type="submit"
          className="bg-stone-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to = '/signin'>
        <span className="text-blue-700 hover:cursor-pointer mt">Sign In</span>
        </Link> 
      </div>
    </div>
  );
}

export default Signup;
