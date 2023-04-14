import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ImageState {
  image?: File | string | null;
  previewImage?: string | null;
}

const initialState: ImageState = {
  image: null,
  previewImage: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setPreviewImage: (state, action: PayloadAction<File | null>) => {
      if (action.payload) {
        state.previewImage = URL.createObjectURL(action.payload);
      } else {
        state.previewImage = null;
      }
    },
    setImage: (state, action: PayloadAction<File>) => {
      state.image = action.payload;
      state.previewImage = URL.createObjectURL(action.payload);
    },
  },
});

export const { setPreviewImage, setImage } = imageSlice.actions;

export default imageSlice.reducer;
