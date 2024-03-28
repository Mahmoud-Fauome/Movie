import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getReviewsMo = createAsyncThunk(
  "getReviewsMo",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/reviews`,
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

const reviewsMoviesSlice = createSlice({
  name: "data",
  initialState: {
    reviewsMovies: [],
    reviewsMoviesError: null,
    reviewsMoviesLoad: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getReviewsMo.pending, (state, action) => {
      state.reviewsMoviesLoad = true;
    });
    builder.addCase(getReviewsMo.fulfilled, (state, action) => {
      state.reviewsMoviesLoad = false;
      state.reviewsMovies = action.payload.results;
    });
    builder.addCase(getReviewsMo.rejected, (state, action) => {
      state.reviewsMoviesLoad = false;
      state.reviewsMoviesError = action.payload.message;
    });
  },
});
export default reviewsMoviesSlice.reducer;
