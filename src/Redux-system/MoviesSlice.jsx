import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk("getMovies", async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const data = await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
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

const moviesSlice = createSlice({
  name: "data",
  initialState: {
    movies: null,
    moviesLoad: true,
    moviesError: null,
    topMovies: null,
    topMoviesLoad: true,
    topMoviesError: null,
    movieTitle: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.moviesLoad = true;
      state.topMoviesLoad = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.moviesLoad = false;
      state.topMoviesLoad = false;
      state.movies = action.payload.results;
      state.topMovies = action.payload.results.filter((topMovie) => {
        return topMovie.vote_average >= 7.2;
      });
      // const t = (state.movieTitle = action.payload.results.filter((sortt) => {
      //   return sortt.title;
      // }));
      // console.log(action.payload.results);

      // console.log(t);
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.moviesLoad = false;
      state.topMoviesLoad = false;
      state.moviesError = action.payload.message;
    });
  },
});
export default moviesSlice.reducer;
