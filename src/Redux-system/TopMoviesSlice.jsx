import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTopMovies = createAsyncThunk(
  "getTopMovies",
  async (d, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const data = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/discover/movie",
        params: {
          include_adult: "false",
          include_null_first_air_dates: "false",
          language: "en-US",
          page: "1",
          sort_by: "popularity.desc",
        },
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

const topMoviesSlice = createSlice({
  name: "data",
  initialState: { topMovies: null, topMoviesLoad: true, topMoviesError: null },
  extraReducers: (builder) => {
    builder.addCase(getTopMovies.pending, (state, action) => {
      state.topMoviesLoad = true;
    });
    builder.addCase(getTopMovies.fulfilled, (state, action) => {
      state.topMoviesLoad = false;
      state.topMovies = action.payload.results.filter((topMo) => {
        return topMo.vote_average >= 7.2;
        // console.log(topMo.vote_average);
      });
      // console.log(action.payload.results);
    });
    builder.addCase(getTopMovies.rejected, (state, action) => {
      state.topMoviesLoad = false;
      state.topMoviesError = action.payload.message;
    });
  },
});
export default topMoviesSlice.reducer;
