import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeries = createAsyncThunk("getSeries", async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const data = await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/tv",
      params: {
        include_adult: "false",
        include_null_first_air_dates: "false",
        language: "en-US",
        page: id,
        sort_by: "popularity.desc",
      },
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
});

const seriesSlice = createSlice({
  name: "data",
  initialState: {
    series: null,
    seriesLoad: true,
    seriesError: null,
    topSeries: null,
    topSeriesLoad: true,
    topSeriesError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getSeries.pending, (state, action) => {
      state.seriesLoad = true;
      state.topSeriesLoad = true;
    });
    builder.addCase(getSeries.fulfilled, (state, action) => {
      state.seriesLoad = false;
      state.topSeriesLoad = false;
      state.series = action.payload.results;
      state.topSeries = action.payload.results.filter((topSeri) => {
        return topSeri.vote_average >= 7.2;
      });
    });
    builder.addCase(getSeries.rejected, (state, action) => {
      state.seriesLoad = false;
      state.topSeriesLoad = false;
      state.seriesError = action.payload.message;
    });
  },
});
export default seriesSlice.reducer;
