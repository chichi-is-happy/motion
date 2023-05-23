import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { addPost, deletePost, Post } from "../../store/content";
import { setPreviewImage, setImage } from "../../store/file";
import { setCategory } from "../../store/category";
import { setModalState } from "../../store/modalState";
import YouTubeIframe from "../MainPage/YoutubeIframe";
import { useClickOutside } from "../../hooks/handleClickOutside";

const Modal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [videoUrlState, setVideoUrlState] = useState("");
  const [taskState, setTaskState] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

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

  const selectPost = (state: { content: { posts: Post[] } }) =>
    state.content.posts;

  // store의 posts 배열
  const posts = useSelector(selectPost);
  console.log("셀렉터포스트", posts);

  // 모달이 열려있지 않다면 null을 리턴
  if (!modal) return null;

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

  const isValidYouTubeLink = (link: string): boolean => {
    // 유효한 YouTube 도메인 패턴
    const youtubeDomainPattern = /^(https?:\/\/)?(www\.)?youtube\.com(\/.*)?$/;
    const shortLinkPattern = /^(https?:\/\/)?(www\.)?youtu\.be(\/.*)?$/;

    // 정규식 패턴을 이용하여 링크를 검증
    if (youtubeDomainPattern.test(link) || shortLinkPattern.test(link)) {
      // 도메인 패턴 또는 짧은 링크 패턴에 일치하면 유효한 링크로 판단
      return true;
    }
    return false;
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidYouTubeLink(event.target.value)) {
      setInvalidLink(false);
      // setVideoUrlState(event.target.value) : 해당 부분을 지워준다
    } else setInvalidLink(true);
    // ** 계속 input에 넣는 값을 업데이트 할 수 있게 밖으로 빼낸다
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
    onClose();
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
                  onChange={handleVideoChange}
                />
                {invalidLink ? (
                  <p className="text-xs text-red-200">
                    올바르지 않은 링크입니다. 링크를 다시 확인해 주세요.
                  </p>
                ) : null}
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
            {invalidLink === false ? (
              <button
                type="submit"
                className="text-gray-400 hover:text-red-200"
              >
                등록
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Modal;
