import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getMovieTrailer = createAsyncThunk(
  "getMovieTrailer",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/videos`,
        params: { language: "en-US" },
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

const movieTrailer = createSlice({
  name: "trailer",
  initialState: { moTrailer: [], moTrailerLoad: true },
  extraReducers: (builder) => {
    builder.addCase(getMovieTrailer.pending, (state, action) => {
      state.moTrailerLoad = true;
    });
    builder.addCase(getMovieTrailer.fulfilled, (state, action) => {
      state.moTrailer = action.payload.results;
    });
    builder.addCase(getMovieTrailer.rejected, (state, action) => {});
  },
});
export default movieTrailer.reducer;
