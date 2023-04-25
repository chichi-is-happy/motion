// ConfirmModal.tsx

import React from "react";

interface ConfirmModalProps {
  message: string;
  onConfirm: (postId: number) => void;
  onCancel: () => void;
  postId: number;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
  postId,
}) => {
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="modal fixed w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-8 rounded shadow-md modal">
        <div className="confirm-modal">
          <div className="message m-3 mb-5">{message}</div>

          <div className="buttons flex justify-evenly text-gray-400">
            <button
              type="submit"
              className="confirm hover:text-red-200"
              onClick={() => onConfirm(postId)}
            >
              확인
            </button>
            <button
              type="button"
              className="cancel  hover:text-red-200"
              onClick={onCancel}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
