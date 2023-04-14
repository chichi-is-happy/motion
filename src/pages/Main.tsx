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
      <div className="flex flex-col items-center  h-screen">
        <div className="h-1/5">
          <Header />
        </div>
        <div className="w-4/5 {posts.length === 0 ? null : overflow-y-scroll}">
          <Document />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Main;
