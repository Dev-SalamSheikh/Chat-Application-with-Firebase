import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo h-16 flex items-center justify-between bg-logoColor p-3 text-chatColor">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons flex gap-3">
          <img src={Cam} alt="cam" className="h-6 cursor-pointer" />
          <img src={Add} alt="add" className="h-6 cursor-pointer" />
          <img src={More} alt="more" className="h-6 cursor-pointer" />
        </div>
      </div>
      {/* Message Component Calling */}
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
