import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../Redux-system/MoviesSlice";
import Carousel from "better-react-carousel";
import { getSeries } from "../../Redux-system/SeriesSlice";
import { Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const Home = () => {
  const {
    series,
    seriesLoad,
    seriesError,
    topSeries,
    topSeriesLoad,
    topSeriesError,
  } = useSelector((data) => data.seriesSlice);
  const {
    movies,
    moviesLoad,
    moviesError,
    topMovies,
    topMoviesLoad,
    topMoviesError,
  } = useSelector((state) => state.moviesSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getSeries());
  }, []);

  // console.log(movies.reverse());
  return (
    <div>
      <h1 className="text-center text-cyan-400 mt-7 text-3xl ">Home</h1>
      <div className="flex-wrap	flex justify-around ">
        <div className="mb-5 flex flex-col	basis-2/5	">
          <h1 className="text-2xl mb-2 text-center text-white">SORT BY</h1>
          <div className="flex justify-around">
            <Button color="white" variant="outlined">
              Title
            </Button>
            <Button color="white" variant="outlined">
              Popularity
            </Button>
            <Button color="white" variant="outlined">
              Date
            </Button>
            <Button color="white" variant="outlined">
              Ratin
            </Button>
          </div>
        </div>
        <div className="flex flex-col	basis-2/5">
          <h1 className="text-2xl mb-2 text-center text-white">SORT ORDER</h1>
          <div className="flex justify-around">
            <Button color="white" variant="outlined">
              descending
            </Button>
            <Button color="white" variant="outlined">
              ascending
            </Button>
          </div>
        </div>
      </div>
      <div className="m-12">
        <h1 className="text-cyan-400 mb-10 text-3xl ">MOVIS</h1>
        <div className="mr-14 ml-14">
          {moviesLoad && (
            <div className="flex">
              <Spinner className="h-16 w-full text-white" />
            </div>
          )}
          <Carousel cols={4} rows={1} gap={10} loop>
            {movies &&
              movies.map((movie) => (
                <Carousel.Item key={movie.id}>
                  <div className="flex justify-center">
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                      />
                    </Link>
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </div>
      {/* ///////////////////////////////////////////series///////////////////////////////////////// */}
      <div className="m-12">
        <h1 className="text-cyan-400 mb-10 text-3xl ">SERIES</h1>
        <div className="mr-14 ml-14">
          {seriesLoad && (
            <div className="flex">
              <Spinner className="h-16 w-full text-white" />
            </div>
          )}
          <Carousel cols={4} rows={1} gap={10} loop>
            {series &&
              series.map((seri) => (
                <Carousel.Item key={seri.id}>
                  <Link to={`/series/${seri.id}`}>
                    <div className="flex justify-center">
                      <img
                        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${seri.poster_path}`}
                      />
                    </div>
                  </Link>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
      </div>
      {/* ///////////////////////////////////////////topMovies///////////////////////////////////////// */}
      <h1 className="ml-10 text-cyan-400 mb-10 text-3xl"> TOP MOVIES</h1>
      <div className=" flex flex-wrap justify-evenly">
        {topMoviesLoad && (
          <div className="flex">
            <Spinner className="h-16 w-full text-white" />
          </div>
        )}
        {topMovies &&
          topMovies.map((topMovie) => (
            <Card
              key={topMovie.id}
              className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300 ... bg-current mb-16 w-64 overflow-hidden ml-2 mr-2"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-1 rounded-t-lg "
              >
                <img
                  className=" w-full"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${topMovie.poster_path}`}
                />
              </CardHeader>
              <CardBody>
                <Typography
                  className="mb-4 text-white text-xl"
                  variant="h4"
                  color="blue-gray"
                >
                  <p className="contents text-cyan-400">TAITLE</p>:
                  {topMovie.original_title}
                </Typography>
                <div className="flex items-start justify-between">
                  <h6 className="mb-4 flex text-white text-sm">
                    RATE :
                    <p className="text-cyan-400"> {topMovie.vote_average}</p>
                  </h6>
                  <ReactStars
                    count={5}
                    edit={false}
                    isHalf={true}
                    value={topMovie.vote_average / 2}
                    size={24}
                  />
                </div>
                <div className="pt-0">
                  <Link to={`/movies/${topMovie.id}`}>
                    <Button variant="outlined" color="cyan">
                      DETAILS
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
      {/* ///////////////////////////////////////////topSeries///////////////////////////////////////// */}
      <h1 className="ml-10 text-cyan-400 mb-10 text-3xl"> TOP SERIES</h1>
      <div className=" flex flex-wrap justify-evenly">
        {topSeriesLoad && (
          <div className="flex">
            <Spinner className="h-16 w-full text-white" />
          </div>
        )}
        {topSeries &&
          topSeries.map((topSeri) => (
            <Card
              key={topSeri.id}
              className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300 ... bg-current mb-16 w-64 overflow-hidden ml-2 mr-2"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-1 rounded-t-lg "
              >
                <img
                  className=" w-full"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${topSeri.poster_path}`}
                />
              </CardHeader>
              <CardBody>
                <Typography
                  className="mb-4 text-white text-xl"
                  variant="h4"
                  color="blue-gray"
                >
                  <p className="contents text-cyan-400">TAITLE</p>:
                  {topSeri.original_name}
                </Typography>
                <div className="flex items-start justify-between">
                  <h6 className="mb-4 flex text-white text-sm">
                    RATE :
                    <p className="text-cyan-400"> {topSeri.vote_average}</p>
                  </h6>
                  <ReactStars
                    count={5}
                    edit={false}
                    isHalf={true}
                    value={topSeri.vote_average / 2}
                    size={24}
                  />
                </div>
                <div className="pt-0">
                  <Link to={`/series/${topSeri.id}`}>
                    <Button variant="outlined" color="cyan">
                      DETAILS
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
};
export default Home;
