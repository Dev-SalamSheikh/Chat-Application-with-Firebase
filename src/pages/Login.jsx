import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        navigate("/")
      );
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="formContainer bg-registerBg h-1/2 lg:h-screen flex items-center justify-center">
      <div className="formWrapper bg-white py-5 px-16 rounded-md flex flex-col gap-3 items-center">
        <span className="logo text-logoColor font-bold text-2xl">
          UDBSS Chat
        </span>
        <span className="tilte text-logoColor text-xs">Login</span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email Address"
            className="p-4 border-b-inputBorder border border-x-0 border-t-0 placeholder:text-placeholder outline-none"
          />
          <input
            type="Password"
            placeholder="Your Password"
            className="p-4 border-b-inputBorder border border-x-0 border-t-0 placeholder:text-placeholder outline-none"
          />

          <button className="bg-buttonBg text-white p-3 font-bold cursor-pointer">
            Sign in
          </button>
          {error && <p>Something went wrong</p>}
        </form>
        <p className="text-logoColor text-xs mt-3">
          You don't have a account? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
