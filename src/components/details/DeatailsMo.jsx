import "./details.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsMov } from "../../Redux-system/DetailsMoSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { getCastingMove } from "../../Redux-system/CastingMoSlice";
import {
  AiOutlineHome,
  AiOutlineStar,
  AiFillFileAdd,
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import Tabb from "../tab/TabsMo";
import { Link } from "react-router-dom";
import { getReviewsMo } from "../../Redux-system/ReviewsMoSlice";
import Video from "../video/videoMo";
import { getKeywordsMo } from "../../Redux-system/KeywordsMoSlice";
import { getMovieTrailer } from "../../Redux-system/MoviesTraillerSlice";
import ShowMoreText from "react-show-more-text";
import { getRecomendMo } from "../../Redux-system/RecommendMo";
const DeatailsMo = () => {
  const { idMovies } = useParams();
  const { detailsMovies, detailsMoviesLoad } = useSelector(
    (state) => state.detailsMoSlice
  );
  const { castingMove, castingMoveLoad, topAct } = useSelector(
    (state) => state.castingMovies
  );
  const { reviewsMovies } = useSelector((state) => state.reviewsMoviesSlice);
  const { keywordsMo, keywordsMoLoad } = useSelector(
    (state) => state.keywordsMoSlice
  );
  const { recomendMo } = useSelector((state) => state.recomendMoSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailsMov(idMovies));
    dispatch(getCastingMove(idMovies));
    dispatch(getReviewsMo(idMovies));
    dispatch(getKeywordsMo(idMovies));
    dispatch(getMovieTrailer(idMovies));
    dispatch(getRecomendMo(idMovies));
  }, []);
  return (
    <div className="text-white">
      <div
        className="mb-7 pb-4 bg bg-fixed	bg-cover pt-6"
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${detailsMovies.backdrop_path})`,
        }}
      >
        {detailsMoviesLoad && (
          <div className="flex">
            <Spinner className="h-16 w-full" />
          </div>
        )}
        <div className="dFlexHeader mr-10 dFlex">
          <div className="widthImgeHead">
            <img
              className="mt-24 w-11/12	"
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${detailsMovies.poster_path}`}
              alt="Poster to movie"
            />
          </div>
          <div className=" mt-4 w-11/12 ">
            <h1 className="mr-10 text-center text-blue-400 mb-5 text-3xl font-bold">
              Movie-Details
            </h1>
            <h1 className="mb-5 text-2xl font-bold">
              {detailsMovies.original_title}
            </h1>
            <div className="mb-6 dFlex">
              <h1 className="mr-2">{detailsMovies.release_date}</h1>
              <h1 className="mr-2">({detailsMovies.original_language})</h1>
              {/* {detailsMovies == !undefined &&
                detailsMovies.genres.length > 0 && (
                  <h1 className="mr-2">{detailsMovies.genres[0].name}</h1>
                )} */}
              <h1>Action & Drama - </h1>
              <h1>{detailsMovies.runtime} m</h1>
            </div>
            <div className="mb-6">
              <h1 className="contents text-2xl font-bold text-cyan-500 ">
                OverView :
              </h1>
              <p className="text-sm text-bold leading-8">
                {detailsMovies.overview}
              </p>
            </div>
            <div>
              <h1 className="contents text-2xl font-bold text-cyan-500 ">
                Casting :
              </h1>
              {castingMove.cast && castingMove.cast.length >= 5 && (
                <div className="mb-4 flex justify-around">
                  <div className="textAlign">
                    {castingMove.cast[0].name}
                    <h1 className="text-sm text-amber-500	">Acting</h1>
                  </div>
                  <div className="textAlign">
                    {castingMove.cast[1].name}
                    <h1 className="text-sm text-amber-500	">Acting</h1>
                  </div>
                </div>
              )}
              {castingMove.crew && castingMove.crew.length >= 5 && (
                <div className="mb-4 flex justify-around">
                  <div className="textAlign">
                    {castingMove.crew[4].name}
                    <h1 className="text-sm text-amber-500	">Production</h1>
                  </div>
                  <div className="textAlign">
                    {castingMove.crew[0].name}
                    <h1 className="text-sm text-amber-500	">Directing</h1>
                  </div>
                  <div className="textAlign">
                    {castingMove.crew[5].name}
                    <h1 className="text-sm text-amber-500	">Production</h1>
                  </div>
                </div>
              )}
              <div className="mb-4 flex justify-evenly">
                <div className="textAlign">
                  <AiFillFileAdd className="text-2xl text-green-900	" />
                  <h1 className="text-sm font-bold">Add To Watchlist</h1>
                </div>
                <div>
                  <AiOutlineStar className="text-2xl text-amber-500" />
                  <h1 className="text-sm font-bold">Rate</h1>
                </div>
                <div className="textAlign">
                  <Video />
                  <h1 className="text-sm font-bold">Play Trailer</h1>
                </div>
              </div>
              <div className="text-center">
                <Link to={"/movies"}>
                  <Button
                    color="cyan"
                    className="text-center"
                    variant="outlined"
                  >
                    Back a step
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-cyan-500 text-2xl ml-10">Top Billed Cast</h1>
      <div className="dFlex">
        <div className=" ml-10 w-full overflow-auto	mt-5 flex ">
          {castingMoveLoad && (
            <div className="flex">
              <Spinner className="h-16 w-full" />
            </div>
          )}
          {topAct.map((img) => (
            <img
              key={img.id}
              className="mb-2 w-40 mr-4 border-2 rounded		"
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${img.profile_path}`}
            />
          ))}
        </div>

        <div className="mt-5 w-2/5	ml-10">
          <div className="mb-3 text-cyan-500 flex container justify-evenly">
            <AiFillFacebook className="text-2xl" />
            <AiOutlineTwitter className="text-2xl" />
            <AiOutlineInstagram className="text-2xl" />
            <AiOutlineHome className="text-2xl" />
          </div>
          <h1 className=" text-xl flex">Status</h1>
          <p className="mb-4 text-cyan-500 text-sm">{detailsMovies.status}</p>
          <h1 className=" text-xl flex">Original Language</h1>
          <p className="mb-4 text-cyan-500 text-sm">
            {detailsMovies.original_language}
          </p>
          <h1 className=" text-xl flex">Budget</h1>
          <p className="mb-4 text-cyan-500 text-sm">${detailsMovies.budget}</p>
          <h1 className=" text-xl flex">Revenue</h1>
          <p className="text-cyan-500 text-sm">
            ${detailsMovies.revenue / 1000000000}
          </p>
        </div>
      </div>
      <Link to={`/movies/${idMovies}/collection`}>
        <h5 className="ml-10 text-cyan-500 mt-3 mt-3">Details Cast & Crew</h5>
      </Link>
      <div className="dFlex">
        <div className=" ml-10 flex flex-col	 mt-14 w-full ">
          <h1 className="text-cyan-500 text-2xl">social</h1>
          <h1 className="text-purple-700	underline underline-offset-1 text-xs mt-6 mb-3">
            REVIEWS
          </h1>
          <div className="p-3 border-t-2 flex rounded-b-lg bg-gray-800">
            <h1 className=" bg-gray-400 h-16 rounded-full mr-10 p-5 text-2xl">
              R
            </h1>
            {reviewsMovies[0] && (
              <div>
                <div className="  text-lg font-bold flex">
                  <h1 className="text-sky-700 mr-1 mb-1">A Review by</h1>

                  <p className=" text-cyan-500">{reviewsMovies[0].author}</p>
                </div>
                <div className=" mb-3 flex text-sm">
                  Written by
                  <p className="ml-1 mr-1 text-cyan-500">
                    {reviewsMovies[0].author}
                  </p>
                  on
                  <p className="ml-1 text-cyan-500">
                    {reviewsMovies[0].created_at.slice(0, 10)}
                  </p>
                </div>
                <h1 className="text-blue-600">Content :-</h1>
                <ShowMoreText
                  lines={4}
                  more="Show more"
                  less="Show less"
                  className="mb-4 content-css"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  truncatedEndingComponent={"... "}
                >
                  {reviewsMovies[0].content}
                </ShowMoreText>
              </div>
            )}
          </div>
          {reviewsMovies.length > 1 && (
            <Link to={`/movies/${idMovies}/reviewsMovies`}>
              <h5 className="bg-gray-800 text-cyan-500 mt-3 border-2 border-gray-50 rounded-full pt-1 pb-1 text-center mt-3 font-bold	">
                VIEW ALL REVIEWS
              </h5>
            </Link>
          )}
        </div>
        <div className="mt-6 lowercase text-white widthKey	ml-10">
          {keywordsMoLoad && (
            <div className="flex">
              <Spinner className="h-16 w-full text-white" />
            </div>
          )}
          {keywordsMo.keywords &&
            keywordsMo.keywords.map((key) => (
              <Button
                className="lowercase bg-white text-black mr-2 mb-2"
                key={key.id}
              >
                {key.name}
              </Button>
            ))}
        </div>
      </div>
      <div className="mt-4 dFlex">
        <div className=" ml-10 flex flex-col	 mt-14 w-full">
          <h1 className="mb-5 text-cyan-500 text-2xl">Media</h1>
          <Tabb />
        </div>
        <div className="w-2/5	ml-10"></div>
      </div>
      <div className="mt-4 dFlex">
        <div className=" ml-10 flex flex-col	 mt-14 w-full ">
          {detailsMovies.belongs_to_collection && (
            <div
              className="w-full bg-cover mb-6 box-border 	pt-6"
              style={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${detailsMovies.backdrop_path})`,
              }}
            >
              <div className="mb-3 text-center">
                <h1 className="mb-6 text-2xl ">
                  Part of {detailsMovies.belongs_to_collection.name}
                </h1>
                <h1 className="text-cyan-500 ">includes</h1>
                <h1 className="text-sm ">{detailsMovies.title}</h1>
                <Link to={`/movies/${idMovies}/collection`}>
                  <Button
                    variant="outlined"
                    className="bg-black text-cyan-500 mt-3 border-2 border-gray-50	 rounded-full"
                  >
                    VIEW THE COLLECTION
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="w-2/5	ml-10"></div>
      </div>
      <h1 className="mt-14 text-xl ml-10">Recommendations</h1>
      <div className=" ml-10 mt-4 dFlex mb-8">
        <div className="flex 	overflow-auto  w-full  ">
          {recomendMo.length > 0 ? (
            recomendMo.map((img) => (
              <img
                key={img.id}
                style={{
                  backgroundColor: "#191e24",
                  borderColor: "rgb(66 66 66)",
                }}
                className="mr-2 border-4 border-gray-50 rounded-t"
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${img.poster_path}`}
              />
            ))
          ) : (
            <h1 className="text-white">
              THER IS NOT RECOMMENDATIONS FOUNDED YET
            </h1>
          )}
        </div>
        <div className="w-2/5	ml-10"></div>
      </div>
    </div>
  );
};
export default DeatailsMo;
