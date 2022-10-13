import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentUser.uid && "owner"
      } flex gap-5 mb-5`}
    >
      <div className="messageInfo flex flex-col text-gray-500 font-light text-sm">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="img"
          className="w-10 rounded-full object-cover"
        />
        <span>Just now</span>
      </div>
      <div className="messageContent max-w-[80%] flex flex-col gap-3">
        <p className="bg-white py-3 px-5 rounded-tl-none rounded-xl max-w-max">
          {message.text}
        </p>
        {message.img && <img src={message.img} alt="img" className="w-6/12" />}
      </div>
    </div>
  );
};

export default Message;
