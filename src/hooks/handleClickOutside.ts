import { useDispatch } from "react-redux";
import { setModalState } from "../store/modalState";

export const useClickOutside = () => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setModalState(false));
    console.log("onClose 실행");
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return { handleClickOutside, onClose };
};
