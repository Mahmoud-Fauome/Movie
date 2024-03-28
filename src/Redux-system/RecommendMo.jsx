import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecomendMo = createAsyncThunk(
  "getRecomendMo",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/recommendations`,
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

const recomendMoSlice = createSlice({
  name: "data",
  initialState: {
    recomendMo: [],
    recomendMoError: null,
    recomendMoLoad: true,
  },
  extraReducers: (builder) => {
    builder.addCase(getRecomendMo.pending, (state, action) => {
      state.recomendMoLoad = true;
    });
    builder.addCase(getRecomendMo.fulfilled, (state, action) => {
      state.recomendMoLoad = false;
      state.recomendMo = action.payload.results;
    });
    builder.addCase(getRecomendMo.rejected, (state, action) => {
      state.recomendMoLoad = false;
      state.recomendMoError = action.payload.message;
    });
  },
});
export default recomendMoSlice.reducer;
