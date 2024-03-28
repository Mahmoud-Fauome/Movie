import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getTvTrailer = createAsyncThunk(
  "getTvTrailer",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}/videos`,
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

const tvTrailer = createSlice({
  name: "trailer",
  initialState: { seriesTrailer: [], seriesTrailerLoad: true },
  extraReducers: (builder) => {
    builder.addCase(getTvTrailer.pending, (state, action) => {
      state.seriesTrailerLoad = true;
    });
    builder.addCase(getTvTrailer.fulfilled, (state, action) => {
      state.seriesTrailer = action.payload.results;
    });
    builder.addCase(getTvTrailer.rejected, (state, action) => {});
  },
});
export default tvTrailer.reducer;
