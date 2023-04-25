import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  modal: boolean;
}

const initialState: ModalState = {
  modal: false,
};

const modalStateSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
  },
});

export const { setModalState } = modalStateSlice.actions;

export default modalStateSlice.reducer;
