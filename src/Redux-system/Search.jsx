import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataSearch = createAsyncThunk(
  "getDataSearch",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: id,
          include_adult: "false",
          language: "en-US",
          page: "1",
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

const searchMoviesSlice = createSlice({
  name: "search",
  initialState: { searchMovie: [] },
  extraReducers: (builder) => {
    builder.addCase(getDataSearch.pending, (state, action) => {});
    builder.addCase(getDataSearch.fulfilled, (state, action) => {
      state.searchMovie = action.payload.results;
      // console.log(action.payload.results);
    });
    builder.addCase(getDataSearch.rejected, (state, action) => {});
  },
});
export default searchMoviesSlice.reducer;
