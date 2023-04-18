import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { deletePost, Post, postList } from "../store/content";
import YouTubeIframe from "./YoutubeIframe";

const ContentList = () => {
  // 드래그 이벤트를 처리하는 함수
  // 이벤트 객체의 dataTransfer 프로퍼티에 id를 text/plain 형태로 저장
  // 이렇게 하면 드래그된 아이템을 드랍할 때 id를 전달할 수 있다
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, id: string) => {
    event.dataTransfer.setData("text/plain", id);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // 드롭 이벤트를 처리하는 함수
  // 드롭 대상 요소에서 호출됨. onDrop 이벤트 핸들러를 등록하면 해당 요소 위에 드래그된 아이템이 등록될 때 이 함수가 호출된다
  // 매개변수로 이벤트 객체와 index를 받는다
  // index : 드롭 대상 요소에서 해당 아이템이 드롭된 위치의 인덱스를 나타냄
  // index를 이용해 드롭된 아이템을 원하는 위치에 삽입 가능
  // event.dataTransfer.getData("text/plain"): 드래그 이벤트가 발생했을 때 설정한 데이터를 가져옴
  // state의 items에서 id와, 드래그 이벤트에서 설정한 데이터의 id가 같은 것을 찾아서
  // item배열에서 item의 id와 일치하지 않는 것을 찾아 newItems를 만든 뒤
  // index 위치에 0개 요소를 삭제하고 item 요소를 추가
  // setItems 함수를 호출, items 배열을 newItems로 업데이트
  const onDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    const id = Number(event.dataTransfer.getData("text/plain")); // id 값을 number로 변환
    const item = posts.find((it) => it.id === id);
    if (item) {
      const newItems = posts.filter((it) => it.id !== id);
      newItems.splice(index, 0, item);
      dispatch(postList(newItems));
    }
  };

  //
  const selectPosts = createSelector(
    (state: { content: { posts: Post[] } }) => state.content.posts,
    (posts) => posts
  );

  const dispatch = useDispatch();

  const handleDeletePost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  const posts = useSelector(selectPosts);
  console.log("포스트들", posts);

  return (
    <>
      {/* <div
        className={`w-full h-[500px] flex items-center justify-center ${
          posts.length === 0 ? null : "overflow-y-scroll"
        }`}
      >
        {posts.length === 0 && (
          <>
            <div className="flex items-center justify-center text-gray-500  ">
              등록된 포스트가 없습니다.
            </div>
          </>
        )} */}

      <div className=" flex  flex-col items-center justify-center">
        {posts.length === 0 && (
          <div className=" items-center justify-center text-gray-500">
            등록된 포스트가 없습니다.
          </div>
        )}
        <ul className="w-full">
          {posts.map((post: Post, index: number) => (
            <>
              <li key={post.id} className="flex-grow">
                <div
                  className="flex post p-5 m-3 border rounded-lg relative"
                  draggable
                  onDragStart={(event) =>
                    onDragStart(event, post.id.toString())
                  }
                  onDragOver={(event) => onDragOver(event)}
                  onDrop={(event) => onDrop(event, index)} // index 값으로 수정
                >
                  <div className="flex flex-row">
                    <div
                      className="delete text-gray-300  absolute top-0 left-70 w-7 h-10"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      X
                    </div>
                    {/* 이미지 */}
                    {post.imageUrl ? (
                      <img
                        className="flex w-1/5 mr-5"
                        src={post.imageUrl}
                        alt="cat"
                      />
                    ) : null}
                    {post.videoUrl ? (
                      <>
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
                    <div className="flex-col w-full">
                      <div className=" w-4/5">
                        {/* 제목 */}
                        <h2 className=" text-xl">{post.title}</h2>
                        {/* 내용 */}
                        <div className="w-full text-gray-500">
                          {post.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContentList;
