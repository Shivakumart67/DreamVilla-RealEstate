import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { RotatingLines } from "react-loader-spinner";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    await axios
      .post(`/api/auth/signin`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        toast.success("Login Successfull");
        dispatch(signInSuccess(data));
        navigate("/");
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
        dispatch(signInFailure(response.data.message));
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
