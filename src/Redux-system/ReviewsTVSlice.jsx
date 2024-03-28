import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getReviewsTv = createAsyncThunk(
  "getReviewsTv",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        url: `https://api.themoviedb.org/3/tv/${id}/reviews`,
        params: { language: "en-US", page: "1" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDkxM2U3NmY3ZjhiMzFjMWE2ZTAyOTNmOGFkMWQ5MSIsInN1YiI6IjY1MzJmNWVjYjI2ODFmMDBlMTNhZjhlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XpXU3sd12apIYc6tN0YkljSzVZToN7YeZaX8NQH_duM",
        },
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const reviewsTvSlice = createSlice({
  name: "data",
  initialState: {
    reviewsTv: [],
    reviewsTvError: null,
    reviewsTvLoad: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getReviewsTv.pending, (state, action) => {
      state.reviewsTvLoad = true;
    });
    builder.addCase(getReviewsTv.fulfilled, (state, action) => {
      state.reviewsTvLoad = false;
      state.reviewsTv = action.payload.results;
    });
    builder.addCase(getReviewsTv.rejected, (state, action) => {
      state.reviewsTvLoad = false;
      state.reviewsTvError = action.payload.message;
    });
  },
});
export default reviewsTvSlice.reducer;
