import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sdlj");
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
        />
        <input
          className="p-2 border  rounded-lg outline-none"
          type="email"
          placeholder="email"
          id="email"
        />
        <input
          className="p-2 border  rounded-lg outline-none"
          type="password"
          placeholder="password"
          id="password"
        />
        <button
          type="submit"
          className="bg-green-600 p-2 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-70"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between my-3">
        <span className="text-red-600 font-semibold cursor-pointer hover:opacity-90">
          Delete Account
        </span>
        <span className="text-red-600 font-semibold cursor-pointer hover:opacity-90">
          SignOut
        </span>
      </div>
    </div>
  );
}

export default Profile;
