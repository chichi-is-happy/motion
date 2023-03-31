import React, { useState } from "react";

const Document = () => {
  // post, setPost
  // title, setTitle
  // content, setContent

  return (
    <>
      <div className="flex overflow-y-scroll h-3/5 w-screen justify-center items-center">
        <div className="w-4/5 flex flex-col justify-center items-center">
          <div>본문</div>
          <div>본문</div>
          <div>본문</div>
          <div>본문</div>
        </div>
      </div>
    </>
  );
};

export default Document;
