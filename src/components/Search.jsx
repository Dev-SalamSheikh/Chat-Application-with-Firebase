import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // Search Function

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  // Handle Key Down Function
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // Handle Select Function
  const handleSelect = async () => {
    // Check whether the group (chat in firestore) exists, if not create new one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create chat in the chat collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // create user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setUser(null);
    setUserName("");
  };
  return (
    <div className="border-b">
      <div className="searchForm p-3">
        <input
          type="text"
          placeholder="Find a user...."
          className="bg-transparent tracking-wide text-white outline-none placeholder:text-white"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {err && <div className="text-chatColor text-sm">No User Found!</div>}
      {user && (
        <div
          className="userChat p-3 flex items-center gap-3 text-white cursor-pointer hover:bg-navbarBg duration-200"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="userChatInfo">
            <span className="text-lg font-medium">{user.displayName}</span>
            <p className="text-chatColor text-sm"></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
