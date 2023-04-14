import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ImageState {
  image?: string | null;
  previewImage?: string | null;
}

const initialState: ImageState = {
  image: null,
  previewImage: null,
};

const imageSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setPreviewImage: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.previewImage = action.payload;
      } else {
        state.previewImage = null;
      }
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
      state.previewImage = action.payload;
    },
  },
});

export const { setPreviewImage, setImage } = imageSlice.actions;

export default imageSlice.reducer;
