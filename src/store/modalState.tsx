import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  modal: boolean;
  deleteModal: {
    showModal: boolean;
    postId?: number;
  };
}

const initialState: ModalState = {
  modal: false,
  deleteModal: {
    showModal: false,
  },
};
const modalStateSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setDeleteModalState: (
      state,
      action: PayloadAction<{ showModal: boolean; postId?: number }>
    ) => {
      const { showModal, postId } = action.payload;
      state.deleteModal = { showModal, postId };
    },
  },
});

export const { setModalState, setDeleteModalState } = modalStateSlice.actions;

export default modalStateSlice.reducer;
