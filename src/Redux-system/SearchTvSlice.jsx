import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTvSearch = createAsyncThunk(
  "getTvSlice",
  async (idTv, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const dataTv = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/tv",
        params: {
          query: idTv,
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
      return dataTv.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const searchTvSlice = createSlice({
  name: "searchtv",
  initialState: { searchTv: [] },
  extraReducers: (builder) => {
    builder.addCase(getTvSearch.pending, (state, action) => {});
    builder.addCase(getTvSearch.fulfilled, (state, action) => {
      state.searchTv = action.payload.results;
    });
    builder.addCase(getTvSearch.rejected, (state, action) => {});
  },
});
export default searchTvSlice.reducer;
