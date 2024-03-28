import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCastingMove = createAsyncThunk(
  "getCastingMove",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}/credits`,
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

const castingMovies = createSlice({
  name: "data",
  initialState: {
    castingMove: {},
    castingMoveError: null,
    castingMoveLoad: true,
    topAct: [],
    topCrew: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCastingMove.pending, (state, action) => {
      state.castingMoveLoad = true;
    });
    builder.addCase(getCastingMove.fulfilled, (state, action) => {
      state.castingMoveLoad = false;
      state.castingMove = action.payload;
      state.topAct = action.payload.cast.filter((top, index) => {
        return index < 15;
      });
      state.topCrew = action.payload.crew.filter((top, index) => {
        return index < 12;
      });
    });
    builder.addCase(getCastingMove.rejected, (state, action) => {
      state.castingMoveLoad = false;
      state.castingMoveError = action.payload.message;
    });
  },
});
export default castingMovies.reducer;
