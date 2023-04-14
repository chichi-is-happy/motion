import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Post } from "../store/content";
import YouTubeIframe from "./YoutubeIframe";

const ContentList = () => {
  const selectPosts = createSelector(
    (state: { content: { posts: Post[] } }) => state.content.posts,
    (posts) => posts
  );

  // const selectPreviewImage = useSelector(
  //   (state: { image: { previewImage: string | null } }) =>
  //     state.image.previewImage || undefined // null이 아닌 경우에만 값을 반환하도록 undefined로 대체
  // );

  // const selectImage = useSelector(
  //   (state: { image: { image: File | null } }) => state.image.image || undefined // null이 아닌 경우에만 값을 반환하도록 undefined로 대체
  // );

  const posts = useSelector(selectPosts);
  console.log("포스트들", posts);

  return (
    <>
      <div className="w-full">
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>
              <div className="flex p-5 m-3 border rounded-lg">
                {/* 이미지 */}
                {post.imageUrl ? (
                  <img className="w-1/5 mr-5" src={post.imageUrl} alt="cat" />
                ) : null}
                {post.videoUrl ? (
                  <>
                    {/* <iframe
                      title="YouTube video player"
                      className="w-full h-96"
                      src={`https://www.youtube.com/embed/${post.videoUrl}`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    /> */}
                    <YouTubeIframe url={post.videoUrl} />
                  </>
                ) : null}
                {post.task === true ? (
                  <>
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="w-4 h-4 mr-3 accent-pink-200 bg-gray-100 border-gray-300 rounded focus:ring-red-100 focus:ring-2"
                    />
                  </>
                ) : null}
                <div className="flex flex-col w-4/5">
                  {/* 제목 */}
                  <h2 className="text-xl">{post.title}</h2>
                  {/* 내용 */}

                  <div className="w-full text-gray-500">{post.content}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {posts.length === 0 ? (
        <>
          <div className="flex items-center justify-center text-gray-500 ">
            등록된 포스트가 없습니다.
          </div>
        </>
      ) : (
        <div />
      )}
    </>
  );
};

export default ContentList;
