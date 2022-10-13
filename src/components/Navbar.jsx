import { signOut } from "firebase/auth";
import { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex items-center bg-navbarBg h-16 p-3 justify-between text-navbartext">
      <span className="logo font-bold hidden md:block">UDBSS Chat</span>
      <div className="flex gap-3 items-center justify-center">
        <img
          src={currentUser.photoURL}
          alt="avatar"
          className="h-6 w-6 bg-navbartext rounded-full object-cover"
        />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="bg-logoColor text-navbartext text-[10px] cursor-pointer px-2 py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
