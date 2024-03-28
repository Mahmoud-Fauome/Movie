import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getKeywordsMo = createAsyncThunk(
  "getKeywordsMo",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/keywords`,
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

const keywordsMoSlice = createSlice({
  name: "data",
  initialState: {
    keywordsMo: [],
    keywordsMoError: null,
    keywordsMoLoad: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getKeywordsMo.pending, (state, action) => {
      state.keywordsMoLoad = true;
    });
    builder.addCase(getKeywordsMo.fulfilled, (state, action) => {
      state.keywordsMoLoad = false;
      state.keywordsMo = action.payload;
    });
    builder.addCase(getKeywordsMo.rejected, (state, action) => {
      state.keywordsMoLoad = false;
      state.keywordsMoError = action.payload.message;
    });
  },
});
export default keywordsMoSlice.reducer;
