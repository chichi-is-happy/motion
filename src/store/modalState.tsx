import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  modal: boolean;
  deleteModal: boolean;
}

const initialState: ModalState = {
  modal: false,
  deleteModal: false,
};

const modalStateSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setDeleteModalState: (state, action: PayloadAction<boolean>) => {
      state.deleteModal = action.payload;
    },
  },
});

export const { setModalState, setDeleteModalState } = modalStateSlice.actions;

export default modalStateSlice.reducer;
