import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {
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
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          Sign in
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Create an Account?</p>
        <Link to = '/signup'>
        <span className="text-blue-700 hover:cursor-pointer mt">Sign up</span>
        </Link> 
      </div>
    </div>
  );
}

export default Signin;
