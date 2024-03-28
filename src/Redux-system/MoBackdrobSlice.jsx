import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getMovieBackdrob = createAsyncThunk(
  "getMovieBackdrob",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/images`,
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

const movieBackdrob = createSlice({
  name: "backdrob",
  initialState: { moBackdrob: [], moBackdrobLoad: true, moLogos: [] },
  extraReducers: (builder) => {
    builder.addCase(getMovieBackdrob.pending, (state, action) => {
      state.moBackdrobLoad = true;
    });
    builder.addCase(getMovieBackdrob.fulfilled, (state, action) => {
      state.moBackdrob = action.payload.backdrops;
      state.moLogos = action.payload.logos;
    });

    builder.addCase(getMovieBackdrob.rejected, (state, action) => {});
  },
});
export default movieBackdrob.reducer;
