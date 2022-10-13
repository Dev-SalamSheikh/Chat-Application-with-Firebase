import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="bg-registerBg w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="lg:w-8/12 lg:h-[80%] w-11/12 h-[90%] flex rounded-md overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
