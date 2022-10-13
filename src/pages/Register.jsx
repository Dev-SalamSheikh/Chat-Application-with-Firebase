import React, { useState } from "react";
import AvatarImage from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            setError(true);
          }
        });
      });
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="formContainer bg-registerBg h-screen w-full flex items-center justify-center">
      <div className="formWrapper bg-white py-5 px-16 rounded-md flex flex-col gap-3 items-center">
        <span className="logo text-logoColor font-bold text-2xl">
          UDBSS Chat
        </span>
        <span className="tilte text-logoColor text-xs">Register</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display Name..."
            className="p-4 border-b-inputBorder border border-x-0 border-t-0 placeholder:text-placeholder outline-none"
          />
          <input
            type="email"
            placeholder="Enter a Valid Email..."
            className="p-4 border-b-inputBorder border border-x-0 border-t-0 placeholder:text-placeholder outline-none"
          />
          <input
            type="Password"
            placeholder="Password..."
            className="p-4 border-b-inputBorder border border-x-0 border-t-0 placeholder:text-placeholder outline-none"
          />
          <input type="file" id="file" className="hidden" />
          <label
            htmlFor="file"
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src={AvatarImage} alt="avatar_image" className="w-8" />
            <span className="text-xs text-avatarUpload">Add an avatar</span>
          </label>
          <button className="bg-buttonBg text-white p-3 font-bold cursor-pointer">
            Sign up
          </button>
          {error && <span>Something went wrong</span>}
        </form>
        <p className="text-logoColor text-xs mt-3">
          You do have a account? <NavLink to="/login">Login Here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
