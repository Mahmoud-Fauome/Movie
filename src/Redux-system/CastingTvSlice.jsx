import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCastingTv = createAsyncThunk(
  "getCastingTv",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}/credits`,
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

const castingTv = createSlice({
  name: "data",
  initialState: {
    castTv: [],
    castingTvError: null,
    castingTvLoad: true,
    topAct: [],
    topCrew: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCastingTv.pending, (state, action) => {
      state.castingTvLoad = true;
    });
    builder.addCase(getCastingTv.fulfilled, (state, action) => {
      state.castingTvLoad = false;
      state.castTv = action.payload;
      state.topAct = action.payload.cast.filter((top, index) => {
        return index < 15;
      });
      state.topCrew = action.payload.crew.filter((top, index) => {
        return index < 12;
      });
    });
    builder.addCase(getCastingTv.rejected, (state, action) => {
      state.castingTvLoad = false;
      state.castingTvError = action.payload.message;
    });
  },
});
export default castingTv.reducer;
