import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { addPost, deletePost, Post } from "../../store/content";
import { setPreviewImage, setImage } from "../../store/file";
import { setCategory } from "../../store/category";
import { setModalState } from "../../store/modalState";
import YouTubeIframe from "../MainPage/YoutubeIframe";
import { useClickOutside } from "../../hooks/handleClickOutside";

type ModalProps = {
  // isOpen: boolean;
  // onClose: () => void;
  children?: React.ReactNode;
};

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
// const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
const Modal: React.FC<ModalProps> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [videoUrlState, setVideoUrlState] = useState("");
  const [taskState, setTaskState] = useState(false);

  const { handleClickOutside, onClose } = useClickOutside();

  const dispatch = useDispatch();

  const selectCategory = createSelector(
    (state: { category: { category: string } }) => state.category,
    (categoryState) => categoryState.category
  );
  const category = useSelector(selectCategory);

  const modalState = createSelector(
    (state: { modal: { modal: boolean } }) => state.modal,
    (isModalOpen) => isModalOpen.modal
  );

  const modal = useSelector(modalState);

  useEffect(() => {
    if (category === "task") {
      setTaskState(true);
    }
  }, [category]);

  // const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (event.target === event.currentTarget) {
  //     onClose();
  //   }
  // };

  const selectPost = (state: { content: { posts: Post[] } }) =>
    state.content.posts;

  // store의 posts 배열
  const posts = useSelector(selectPost);
  console.log("셀렉터포스트", posts);

  // 모달이 열려있지 않다면 null을 리턴
  // if (!isOpen) return null;
  if (!modal) return null;

  // 아래로 e.target.value를 쓰고, setState로 변경하고 있음. Input엘레멘탈과 TextArea를 쓰는 차이, 수정하기
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log(title);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
    console.log(content);
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrlState(event.target.value);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    setImageFile(URL.createObjectURL(file));
    console.log(imageFile);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      content,
      imageUrl: imageFile,
      videoUrl: videoUrlState,
      task: taskState,
      category,
    };

    console.log("newPost 객체", newPost);

    if (imageFile || videoUrlState) {
      dispatch(setImage(imageFile));
      dispatch(setPreviewImage(imageFile));
      dispatch(addPost(newPost));
      setTitle("");
      setContent("");
    } else {
      dispatch(addPost(newPost));
      setTitle("");
      setContent("");
    }
    console.log("taskState :", taskState);
    console.log("category :", category);
    onClose(); // Form을 쓸 땐 handleSubmit안에다가 필요한 것을 다 넣어주면 됨
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="modal fixed w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center"
        onClick={handleClickOutside}
      >
        <div className="bg-white p-8 rounded shadow-md modal">
          <div className="flex flex-row-reverse">
            <button
              type="button"
              className="text-gray-400 hover:text-red-200"
              onClick={onClose}
            >
              X
            </button>
          </div>

          {/* 제목 적는 input */}
          <input
            className="w-80 mb-4 resize-none
             overflow-x-auto 
             overflow-y-scroll"
            placeholder="제목"
            onChange={handleTitleChange}
            maxLength={50}
          />
          {/* 카테고리가 이미지면 첨부하기 버튼과 미리보기 출력 */}
          {category === "image" && (
            <>
              {/* 선택한 파일이 있으면 미리보기 이미지 출력 */}
              {imageFile && (
                <img src={imageFile} alt="미리보기" className=" mb-4 w-80" />
              )}
              {/* 파일 선택하는 input 창 */}
              <label className="inline-block px-3 py-1 bg-red-100 hover:bg-red-200 text-white rounded cursor-pointer">
                첨부하기
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </>
          )}

          {category === "video" && (
            <>
              <label>
                <input
                  placeholder="YouTube video URL"
                  type="text"
                  value={videoUrlState}
                  onChange={handleVideoChange}
                />
              </label>
              <YouTubeIframe url={videoUrlState} />
            </>
          )}

          <br />
          <textarea
            className="w-80 h-12"
            placeholder="내용"
            maxLength={200}
            onChange={handleContentChange}
          />
          <br />
          <div className="flex flex-row-reverse">
            <button type="submit" className="text-gray-400 hover:text-red-200">
              등록
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Modal;
