import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios
        .post("http://localhost:4000/api/auth/signup", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(()=>{
          setLoading(false)
          toast.success('User Created Successfully')
          navigate('/signin')
        });
    } catch (error) {
      setLoading(false);
      toast.error('Something Wents Wrong')
      console.error(error);
    }
  };

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
          disabled = {loading}
          className="bg-stone-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {
            loading ? (
              <center>

              <RotatingLines
                strokeColor="gray "
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
              </center>
            ) : <>Sign Up</>
          }

        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700 hover:cursor-pointer mt">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
