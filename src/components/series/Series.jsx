import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimplePagination } from "../pagination.jsx/Pagination";
import { getSeries } from "../../Redux-system/SeriesSlice";
import { Spinner } from "@material-tailwind/react";
import ShowMoreText from "react-show-more-text";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { getCastingTv } from "../../Redux-system/CastingTvSlice";

const Series = () => {
  const { series, seriesLoad } = useSelector((state) => state.seriesSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeries());
  }, []);
  console.log(series);
  return (
    <div>
      <div className="mt-20 flex flex-wrap justify-center">
        {seriesLoad && <Spinner className="h-16 w-16 text-white" />}

        {series &&
          series.map((seri) => (
            <Card
              key={seri.id}
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300 ... bg-current mb-16 w-64 overflow-hidden ml-2 mr-2"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-1 rounded-t-lg "
              >
                <img
                  className=" w-full"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${seri.poster_path}`}
                />
              </CardHeader>
              <CardBody>
                <Typography
                  className="mb-3 text-white text-lg"
                  variant="h4"
                  color="blue-gray"
                >
                  <p className="contents text-cyan-400">TAITLE :</p>
                  {seri.original_name}
                </Typography>
                <Typography
                  className=" contents text-white text-sm"
                  variant="h4"
                  color="blue-gray"
                >
                  <p className="contents text-cyan-400">OVERVIEW :</p>
                  <ShowMoreText
                    lines={1}
                    more="Show more"
                    less="Show less"
                    className="mb-4 content-css"
                    anchorClass="show-more-less-clickable"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                  >
                    {seri.overview}
                  </ShowMoreText>
                </Typography>
                <div className="flex items-start justify-between">
                  <h6 className="mb-4 flex text-white text-sm">
                    RATE :<p className="text-cyan-400"> {seri.vote_average}</p>
                  </h6>
                  <ReactStars
                    count={5}
                    edit={false}
                    isHalf={true}
                    value={seri.vote_average / 2}
                    size={24}
                  />{" "}
                </div>
                <CardFooter className="pt-0">
                  <Link to={`/series/${seri.id}`}>
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

export default Series;
