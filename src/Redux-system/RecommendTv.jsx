import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecomendTv = createAsyncThunk(
  "getRecomendTv",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}/recommendations`,
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

const recomendTvSlice = createSlice({
  name: "data",
  initialState: {
    recomendTv: [],
    recomendTvError: null,
    recomendTvLoad: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getRecomendTv.pending, (state, action) => {
      state.recomendTvLoad = true;
    });
    builder.addCase(getRecomendTv.fulfilled, (state, action) => {
      state.recomendTvLoad = false;
      state.recomendTv = action.payload.results;
    });
    builder.addCase(getRecomendTv.rejected, (state, action) => {
      state.recomendTvLoad = false;
      state.recomendTvError = action.payload.message;
    });
  },
});
export default recomendTvSlice.reducer;
