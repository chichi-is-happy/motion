import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  category?: string;
  task?: boolean;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    },

    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    postList: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { addPost, deletePost, postList } = contentSlice.actions;

export default contentSlice.reducer;
