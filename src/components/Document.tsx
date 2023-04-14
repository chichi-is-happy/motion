import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../store/content";
import ContentList from "./ContentList";

const Document = () => {
  return (
    <>
      <div className="flex flex-col h-60vh justify-center items-center">
        <ContentList />
      </div>
    </>
  );
};

export default Document;
