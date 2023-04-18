import React, { useState } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { setCategory } from "../store/category";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectCategory = createSelector(
    (state: { category: { category: string } }) => state.category,
    (categoryState) => categoryState.category
  );

  const dispatch = useDispatch();

  const category = useSelector(selectCategory);

  const handleCategory = (selectedCategory: string) => {
    dispatch(setCategory(selectedCategory));
    console.log(category);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className=" flex flex-col w-screen justify-center items-center">
        {/* 모션 그라디언트 */}
        <div className="flex flex-row-reverse w-4/5 h-24 bg-gradient-to-r items-center from-red-50 via-red-100 to-indigo-100 text-white">
          <h1 className="font-dancing text-4xl mb-3 mr-8 ">Motion</h1>
        </div>
        {/* 버튼 */}
        <div className="flex flex-row justify-end bg-transparent">
          <>
            <button
              type="button"
              className="w-24 h-10 text-sm  mr-4 text-gray-400 rounded-lg"
              onClick={() => handleCategory("image")}
            >
              IMAGE
            </button>
            <button
              type="button"
              className="w-24 h-10 text-sm  mr-4 text-gray-400 rounded-lg"
              onClick={() => handleCategory("video")}
            >
              VIDEO
            </button>
            <button
              type="button"
              className="w-24 h-10 text-sm mr-4 text-gray-400 rounded-lg"
              onClick={() => handleCategory("note")}
            >
              NOTE
            </button>
            <button
              type="button"
              className="w-24 h-10 text-sm  text-gray-400 rounded-lg"
              onClick={() => handleCategory("task")}
            >
              TASK
            </button>
          </>
        </div>
        {isModalOpen ? (
          <div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        ) : null}
        <div />
      </div>
    </>
  );
};

export default Header;
