import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../Redux-system/MoviesSlice";
import { Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import ShowMoreText from "react-show-more-text";
import ReactStars from "react-rating-stars-component";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { SimplePagination } from "../pagination.jsx/Pagination";

const Movies = () => {
  const { movies, moviesLoad } = useSelector((state) => state.moviesSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, []);
  return (
    <div>
      <div className="mt-20 flex flex-wrap justify-center">
        {moviesLoad && <Spinner className="h-16 w-16 text-white" />}
        {movies &&
          movies.map((movie) => (
            <Card
              key={movie.id}
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
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                />
              </CardHeader>
              <CardBody>
                <Typography
                  className="mb-4 text-white text-xl"
                  variant="h4"
                  color="blue-gray"
                >
                  <p className="contents text-cyan-400">TAITLE</p>:
                  {movie.original_title}
                </Typography>
                <Typography
                  className=" contents text-white text-sm"
                  variant="h4"
                  color="blue-gray"
                >
                  <p className="contents text-cyan-400">OVERVIEW :</p>
                  {movie.overview ? (
                    <ShowMoreText
                      lines={1}
                      more="Show more"
                      less="Show less"
                      className="mb-4 content-css"
                      anchorClass="show-more-less-clickable"
                      expanded={false}
                      truncatedEndingComponent={"... "}
                    >
                      {movie.overview}
                    </ShowMoreText>
                  ) : (
                    <h1 className="mb-4 ">There is no Overview</h1>
                  )}
                </Typography>
                <div className="flex items-start justify-between">
                  <h6 className="mb-4 flex text-white text-sm">
                    RATE :<p className="text-cyan-400"> {movie.vote_average}</p>
                  </h6>
                  <ReactStars
                    count={5}
                    edit={false}
                    isHalf={true}
                    value={movie.vote_average / 2}
                    size={24}
                  />
                </div>
                <CardFooter className="pt-0">
                  <Link to={`/movies/${movie.id}`}>
                    <Button variant="outlined" color="cyan">
                      DETAILS
                    </Button>
                  </Link>
                </CardFooter>
              </CardBody>
            </Card>
          ))}
      </div>
      <SimplePagination />
    </div>
  );
};

export default Movies;
