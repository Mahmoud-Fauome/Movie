import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getKeywordsTv = createAsyncThunk(
  "getKeywordsTv",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${id}/keywords`,
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

const keywordsTvSlice = createSlice({
  name: "data",
  initialState: {
    keywordsTv: [],
    keywordsTvError: null,
    keywordsTvLoad: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getKeywordsTv.pending, (state, action) => {
      state.keywordsTvLoad = true;
    });
    builder.addCase(getKeywordsTv.fulfilled, (state, action) => {
      state.keywordsTvLoad = false;
      state.keywordsTv = action.payload.results;
    });
    builder.addCase(getKeywordsTv.rejected, (state, action) => {
      state.keywordsTvLoad = false;
      state.keywordsTvError = action.payload.message;
    });
  },
});
export default keywordsTvSlice.reducer;
