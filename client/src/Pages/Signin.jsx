import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOST } from "../apiPath.js";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`/api/auth/signin`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        toast.success("Login Successfull");
        setLoading(false);
        navigate("/");
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
        setLoading(false);
      });
  };

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
          {loading ? (
            <center>
              <RotatingLines
                strokeColor="gray "
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            </center>
          ) : (
            <>Sign In</>
          )}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Create an Account?</p>
        <Link to="/signup">
          <span className="text-blue-700 hover:cursor-pointer mt">Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
