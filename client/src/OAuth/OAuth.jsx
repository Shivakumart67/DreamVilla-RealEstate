import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const handleGoogleAuth = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await axios
        .post(
          "/api/auth/google",
          {
            username: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          toast.success("Sign In Successfull");
          dispatch(signInSuccess(data));
          navigate("/");
        });
    } catch ({ response }) {
      toast.error("Something Wents Wrong");
      dispatch(signInFailure(response.data.message));
    }
  };
  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="bg-red-700 p-3 rounded-lg text-white uppercase hover:opacity-90"
      disabled={loading}
    >
      {loading ? <>Logging With Google.....</> : <>Continue With Google</>}
    </button>
  );
}

export default OAuth;
