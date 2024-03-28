import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetailsTv = createAsyncThunk(
  "getDetailsTv",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}`,
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

const detailsTvSlice = createSlice({
  name: "data",
  initialState: {
    detailsTv: {},
    detailsTvError: null,
    detailsTvLoad: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailsTv.pending, (state, action) => {
      state.detailsTvLoad = true;
    });
    builder.addCase(getDetailsTv.fulfilled, (state, action) => {
      state.detailsTvLoad = false;
      state.detailsTv = action.payload;
    });
    builder.addCase(getDetailsTv.rejected, (state, action) => {
      state.detailsTvLoad = false;
      state.detailsTvError = action.payload.message;
    });
  },
});
export default detailsTvSlice.reducer;
