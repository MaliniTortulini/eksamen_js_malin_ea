import { useEffect } from "react";
import homeBackground from "../assets/homeBackground.jpg";
import createAdmin from "../script/createAdminUser";

const Root = () => {
  useEffect(() => {
    createAdmin();
  }, []);
  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${homeBackground})` }}
      >
        <h1 className="text-[2rem] shadow-md p-2 bg-gray-600 bg-opacity-50 rounded-lg">
          Welcome to Easy CV!
        </h1>
      </div>
    </>
  );
};

export default Root;
