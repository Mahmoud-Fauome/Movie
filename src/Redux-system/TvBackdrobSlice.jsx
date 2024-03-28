import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getTvBackdrob = createAsyncThunk(
  "getTvBackdrob",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}/images`,
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

const tvBackdrob = createSlice({
  name: "backdrob",
  initialState: {
    seriesBackdrob: [],
    seriesBackdrobLoad: true,
    seriesLogos: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getTvBackdrob.pending, (state, action) => {
      state.seriesBackdrobLoad = true;
    });
    builder.addCase(getTvBackdrob.fulfilled, (state, action) => {
      state.seriesBackdrob = action.payload.backdrops;
      state.seriesLogos = action.payload.logos;
    });

    builder.addCase(getTvBackdrob.rejected, (state, action) => {});
  },
});
export default tvBackdrob.reducer;
