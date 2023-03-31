import React, { useState } from "react";

const Header = () => {
  return (
    <>
      <div className="flex overflow-y-scroll w-screen h-1/5 justify-center items-center ">
        <div className=" w-4/5">
          <div className="flex flex-row-reverse bg-gradient-to-r  items-center from-purple-500 via-pink-500 to-red-500 text-white">
            <h2 className="text-lg font-bold mb-3 mr-8 ">MOTION</h2>
          </div>
          <div className="flex flex-row justify-end">
            <button className="w-24 h-10 text-sm  mr-4 text-gray-400 rounded-lg">
              IMAGE
            </button>
            <button className="w-24 h-10 text-sm  mr-4 text-gray-400 rounded-lg">
              VIDEO
            </button>
            <button className="w-24 h-10 text-sm mr-4 text-gray-400 rounded-lg">
              NOTE
            </button>
            <button className="w-24 h-10 text-sm  text-gray-400 rounded-lg">
              TASK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
