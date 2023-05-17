import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { deletePost, Post } from "../../store/content";
import YouTubeIframe from "./YoutubeIframe";
import CheckBox from "./CheckBox";
import ConfirmModal from "../Modal/ConfirmModal";
import { ModalState, setDeleteModalState } from "../../store/modalState";
import { useDrag } from "../../hooks/useDrag";

interface Props {
  id: number;
  imageUrl?: string | null | undefined;
  videoUrl?: string | null | undefined;
  task?: boolean | undefined;
  title: string;
  content: string;
  index?: number | undefined;
  category?: string;
  dragEnteredId: number | null;
  setDragEnteredId: React.Dispatch<React.SetStateAction<number | null>>;
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
  dragEnteredId,
  setDragEnteredId,
}: Props) => {
  const selectPosts = createSelector(
    (state: { content: { posts: Post[] } }) => state.content.posts,
    (posts) => posts
  );
  const posts = useSelector(selectPosts);

  console.log("포스트들", posts);

  const dispatch = useDispatch();

  const { onDragStart, onDragOver, onDrop, onDragEnter } = useDrag({
    posts,
    dispatch,
    setDragEnteredId,
  });

  const [checked, setChecked] = useState<boolean>(false);

  const showDeleteModal = useSelector(
    (state: { modal: ModalState }) => state.modal.deleteModal.showModal
  );
  const deleteId = useSelector(
    (state: { modal: ModalState }) => state.modal.deleteModal.postId
  );

  useEffect(() => {
    console.log("category: ", category);
  }, [category]);

  const handleConfirm = (postId: number) => {
    dispatch(deletePost(postId));
  };

  const handleCancel = () => {
    dispatch(setDeleteModalState({ showModal: false }));
  };

  return (
    <>
      <li className="flex-grow relative">
        <div
          draggable
          onDragStart={(event) => {
            onDragStart(event, id.toString());
          }}
          onDragEnter={(event) => onDragEnter(event, id)}
          onDragOver={(event) => onDragOver(event)}
          onDrop={(event) => {
            onDrop(event, index);
          }}
          className={`flex post p-5 m-3 border hover:border-red-200 rounded-lg relative ${
            dragEnteredId === id ? "bg-red-200" : ""
          }`}
        >
          <div className="flex flex-row">
            {/* 삭제 버튼 */}
            <div
              className="delete text-gray-300 hover:text-red-200 absolute top-0 left-70 w-7 h-10"
              onClick={() =>
                dispatch(setDeleteModalState({ showModal: true, postId: id }))
              }
            >
              X
            </div>
            {showDeleteModal && deleteId === id && (
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
                <CheckBox key={id} checked={checked} setChecked={setChecked} />
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
