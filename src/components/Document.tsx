import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { deletePost, Post } from "../store/content";
import ContentList from "./ContentList";

const Document = () => {
  const selectPosts = createSelector(
    (state: { content: { posts: Post[] } }) => state.content.posts,
    (posts) => posts
  );
  const posts = useSelector(selectPosts);

  return (
    <>
      <div className=" w-screen flex flex-col justify-center items-center">
        <div
          className={`w-4/5 h-[500px] justify-center items-center ${
            posts.length !== 0 && "overflow-y-scroll"
          }`}
        >
          <ContentList />
        </div>
      </div>
    </>
  );
};

export default Document;
