import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./MoviesSlice";
import seriesSlice from "./SeriesSlice";
import detailsMoSlice from "./DetailsMoSlice";
import castingMovies from "./CastingMoSlice";
import castingTv from "./CastingTvSlice";
import detailsTvSlice from "./DetailsTvSlice";
import reviewsTvSlice from "./ReviewsTVSlice";
import reviewsMoviesSlice from "./ReviewsMoSlice";
import keywordsMoSlice from "./KeywordsMoSlice";
import keywordsTvSlice from "./KeywordsTvSlice";
import searchMoviesSlice from "./Search";
import searchTvSlice from "./SearchTvSlice";
import movieTrailer from "./MoviesTraillerSlice";
import tvTrailer from "./TvTrailerSlice";
import movieBackdrob from "./MoBackdrobSlice";
import tvBackdrob from "./TvBackdrobSlice";
import recomendTvSlice from "./RecommendTv";
import recomendMoSlice from "./RecommendMo";
const store = configureStore({
  reducer: {
    moviesSlice,
    seriesSlice,
    detailsMoSlice,
    castingMovies,
    castingTv,
    detailsTvSlice,
    reviewsTvSlice,
    reviewsMoviesSlice,
    keywordsMoSlice,
    keywordsTvSlice,
    searchMoviesSlice,
    searchTvSlice,
    movieTrailer,
    tvTrailer,
    movieBackdrob,
    tvBackdrob,
    recomendTvSlice,
    recomendMoSlice,
  },
});
export default store;
