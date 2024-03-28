import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetailsMov = createAsyncThunk(
  "getDetailsMov",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}`,
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

const detailsMoSlice = createSlice({
  name: "data",
  initialState: {
    detailsMovies: {},
    detailsMoviesError: null,
    detailsMoviesLoad: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailsMov.pending, (state, action) => {
      state.detailsMoviesLoad = true;
    });
    builder.addCase(getDetailsMov.fulfilled, (state, action) => {
      state.detailsMoviesLoad = false;
      state.detailsMovies = action.payload;
    });
    builder.addCase(getDetailsMov.rejected, (state, action) => {
      state.detailsMoviesLoad = false;
      state.detailsMoviesError = action.payload.message;
    });
  },
});
export default detailsMoSlice.reducer;
