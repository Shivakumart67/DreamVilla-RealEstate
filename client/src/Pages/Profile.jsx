import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef(null);

  const uploadImage = (file) => {
    if (file) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          setFileError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFormData({ ...formData, avatar: url });
            setFileError(false);
          });
        }
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserStart());
    const res = axios
      .post(`/api/user/update/${currentUser._id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        dispatch(updateUserSuccess(data));
        toast.success("Profile Updated Successfully");
      })
      .catch(({ response }) => {
        dispatch(updateUserFailure(response.data.message));
        toast.error(response.data.message);
      });
  };

  const deleteUser = () => {
    dispatch(deleteUserStart());
    axios
      .delete(`/api/user/delete/${currentUser._id}`)
      .then(() => {
        dispatch(deleteUserSuccess());
      })
      .catch(({ response }) => {
        dispatch(deleteUserFailure(response.data.message));
        toast.error(response.data.message);
      });
  };

  const userSignOut = async () => {
    await axios
      .get("/api/auth/signout")
      .then(() => {
        toast.success("User Logged Out Successfully");
        dispatch(deleteUserSuccess());
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
        dispatch(deleteUserFailure(response.data.message));
      });
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h4 className="text-3xl font-semibold text-center my-1">Profile</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <input
          onChange={(e) => {
            uploadImage(e.target.files[0]);
          }}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          className="rounded-full w-28 h-28 object-cover self-center cursor-pointer"
          src={formData.avatar || currentUser.avatar}
          alt={currentUser.username}
          onClick={() => fileRef.current.click()}
        />
        {fileError ? (
          <span className="text-sm text-center text-red-500-600">
            Error While uploading File {`(Image must be > 2 mb)`}
          </span>
        ) : uploadProgress > 0 && uploadProgress < 100 ? (
          <span className="text-sm text-center text-yellow-500">{`Image Uploading ${uploadProgress} %`}</span>
        ) : uploadProgress === 100 ? (
          <span className="text-sm text-center text-green-600">
            Image Uploaded Successfully
          </span>
        ) : (
          <></>
        )}
        <input
          className="p-2 border  rounded-lg outline-none"
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          className="p-2 border  rounded-lg outline-none"
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          className="p-2 border  rounded-lg outline-none"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 p-2 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-70"
        >
          {loading ? (
            <center>
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            </center>
          ) : (
            <>Update</>
          )}
        </button>
      </form>
      <div className="flex justify-between my-3">
        <span
          onClick={deleteUser}
          className="text-red-600 font-semibold cursor-pointer hover:opacity-90"
        >
          Delete Account
        </span>
        <span
          onClick={userSignOut}
          className="text-red-600 font-semibold cursor-pointer hover:opacity-90"
        >
          SignOut
        </span>
      </div>
    </div>
  );
}

export default Profile;
