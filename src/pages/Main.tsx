import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Post } from "../store/content";
import Header from "../components/Header";
import Document from "../components/Document";
import Footer from "../components/Footer";

const Main = () => {
  const selectPosts = createSelector(
    (state: { content: { posts: Post[] } }) => state.content.posts,
    (posts) => posts
  );
  const posts = useSelector(selectPosts);

  return (
    <>
      <div className="flex flex-col items-center ">
        <div>
          <Header />
        </div>
        <div className="flex items-center justify-center">
          <Document />
        </div>
        <div className="flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Main;
