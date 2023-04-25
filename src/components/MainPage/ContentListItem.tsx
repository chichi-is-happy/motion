import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { deletePost, Post, postList } from "../../store/content";
import YouTubeIframe from "./YoutubeIframe";
import CheckBox from "./CheckBox";
import ConfirmModal from "../Modal/ConfirmModal";

interface Props {
  id: number;
  imageUrl?: string | null | undefined;
  videoUrl?: string | null | undefined;
  task?: boolean | undefined;
  title: string;
  content: string;
  index?: number | undefined;
  category?: string;
}

const ContentListItem = ({
  id,
  imageUrl,
  videoUrl,
  task,
  title,
  content,
  index,
  category,
}: Props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [showConfirmModal, setConfirmModal] = useState(false);

  // 드래그 이벤트를 처리하는 함수
  // 이벤트 객체의 dataTransfer 프로퍼티에 id를 text/plain 형태로 저장
  // 이렇게 하면 드래그된 아이템을 드랍할 때 id를 전달할 수 있다
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    dragId: string
  ) => {
    event.dataTransfer.setData("text/plain", dragId);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.log("category: ", category);
  }, [category]);

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
  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    dropIndex?: number
  ) => {
    if (dropIndex === undefined) {
      return; // dropIndex 값이 undefined일 경우 함수를 빠르게 종료합니다.
    }

    const dropId = Number(event.dataTransfer.getData("text/plain")); // id 값을 number로 변환
    const item = posts.find((it) => it.id === dropId);
    if (item) {
      const newItems = posts.filter((it) => it.id !== dropId);
      newItems.splice(dropIndex, 0, item);
      dispatch(postList(newItems));
    }
  };

  //
  const selectPosts = createSelector(
    (state: { content: { posts: Post[] } }) => state.content.posts,
    (posts) => posts
  );

  const dispatch = useDispatch();

  const handleDeletePost = () => {
    setConfirmModal(true);
  };

  const handleConfirm = (postId: number) => {
    dispatch(deletePost(postId));
  };

  const handleCancel = () => {
    setConfirmModal(false);
  };

  const posts = useSelector(selectPosts);
  console.log("포스트들", posts);

  return (
    <>
      <li className="flex-grow relative">
        <div
          className="flex post p-5 m-3 border hover:border-red-200 rounded-lg relative"
          draggable
          onDragStart={(event) => onDragStart(event, id.toString())}
          onDragOver={(event) => onDragOver(event)}
          onDrop={(event) => onDrop(event, index)} // index 값으로 수정
        >
          <div className="flex flex-row">
            {/* 삭제 버튼 */}
            <div
              className="delete text-gray-300 hover:text-red-200 absolute top-0 left-70 w-7 h-10"
              onClick={() => setConfirmModal(true)}
            >
              X
            </div>
            {showConfirmModal && (
              <ConfirmModal
                key={id}
                message="정말로 삭제하시겠습니까?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                postId={id}
              />
            )}

            {/* 이미지 */}
            {category === "image" && (
              <>
                {imageUrl ? (
                  <img
                    className="flex w-1/5 mr-5"
                    src={imageUrl}
                    alt="thumbnail"
                  />
                ) : null}
              </>
            )}

            {/* 비디오 */}
            {category === "video" && (
              <>
                {videoUrl ? (
                  <>
                    <YouTubeIframe url={videoUrl} />
                  </>
                ) : null}
              </>
            )}

            {/* TO DO */}
            {category === "task" && (
              <>
                {/* 체크 박스 컴포넌트 */}
                <CheckBox
                  checked={checked}
                  setChecked={setChecked}
                  // id={post.id}
                  // handleClickCheckBox={() => handleClickCheckBox}
                  // checked={checked}
                />
              </>
            )}

            {/* 노트 */}
            {category === "note" && <></>}

            <div className="flex-col w-full">
              <div className=" w-4/5">
                {/* 제목 */}
                {task === true ? (
                  <h2 className=" text-xl ">
                    <div
                      // className=
                      // {`text ${
                      //   completed ? "completedText" : ""
                      // }`}
                      // checked 가 true 인 경우 클래스 네임을 completedText 로 지정
                      className={`${checked === true ? "completedText" : null}`}
                    >
                      {title}
                    </div>
                  </h2>
                ) : (
                  <h2 className=" text-xl">{title}</h2>
                )}

                {/* 내용 */}
                <div className="w-full text-gray-500">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ContentListItem;
