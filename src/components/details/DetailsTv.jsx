import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsTv } from "../../Redux-system/DetailsTvSlice";
import { useParams } from "react-router-dom";
import { getCastingTv } from "../../Redux-system/CastingTvSlice";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { getReviewsTv } from "../../Redux-system/ReviewsTVSlice";
import { getKeywordsTv } from "../../Redux-system/KeywordsTvSlice";
import Taab from "../tab/TabsTv";
import { getTvTrailer } from "../../Redux-system/TvTrailerSlice";
import Video from "../video/videoTv";
import ShowMoreText from "react-show-more-text";
import { getRecomendTv } from "../../Redux-system/RecommendTv";
import "../details/details.css";

import {
  AiOutlineHome,
  AiOutlineStar,
  AiFillFileAdd,
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";

const DetailsTv = () => {
  const { idTv } = useParams();
  const { detailsTv, detailsTvLoad } = useSelector(
    (state) => state.detailsTvSlice
  );
  const { castTv, castingTvLoad, topAct } = useSelector(
    (state) => state.castingTv
  );
  const { reviewsTv } = useSelector((state) => state.reviewsTvSlice);
  const { keywordsTv, keywordsTvLoad } = useSelector(
    (state) => state.keywordsTvSlice
  );
  const { recomendTv } = useSelector((state) => state.recomendTvSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKeywordsTv(idTv));
    dispatch(getDetailsTv(idTv));
    dispatch(getCastingTv(idTv));
    dispatch(getTvTrailer(idTv));
    dispatch(getReviewsTv(idTv));
    dispatch(getRecomendTv(idTv));
  }, []);
  return (
    <div className="text-white backdrop-contrast-150">
      {detailsTv && (
        <div className="relative	">
          <div
            className="bg mb-6 bg-cover box-border pt-6"
            style={{
              backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${detailsTv.backdrop_path})`,
            }}
          >
            {detailsTvLoad && (
              <div className="flex">
                <Spinner className="h-16 w-full " />
              </div>
            )}
            <div className="dFlexHeader mr-10 dFlex">
              <div className=" widthImgeHead mb-4">
                <img
                  className="mt-16 w-11/12	"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${detailsTv.poster_path}`}
                  alt="Poster to tv"
                />
              </div>
              <div className="w-11/12">
                <h1 className="mb-3 text-center text-cyan-500 text-3xl font-bold">
                  Series-Details
                </h1>
                <h1 className="mb-6 text-2xl font-bold">
                  {detailsTv.original_name}
                </h1>
                <div className="mb-6 flex">
                  <h1 className="mr-2">{detailsTv.first_air_date}</h1>
                  <h1 className="mr-2">({detailsTv.original_language})</h1>
                  <h1 className="mr-2">
                    {detailsTv.genres && detailsTv.genres[0].name}
                  </h1>
                  <h1>
                    {detailsTv.episode_run_time > 0 &&
                      detailsTv.episode_run_time[0]}
                    m
                  </h1>
                </div>
                <div className="mb-6 ">
                  <h1 className="contents text-2xl font-bold text-cyan-500 ">
                    OverView :
                  </h1>
                  <p className="text-sm font-bold">{detailsTv.overview}</p>
                </div>
                <div className="font-bold">
                  <h1 className="contents mb-2 text-2xl font-bold text-cyan-500 ">
                    Casting :
                  </h1>
                  {castTv.cast && castTv.cast.length > 1 && (
                    <div className="mb-4 flex justify-around">
                      <div className="text-center">
                        {castTv.cast[0].name}
                        <h1 className="text-sm text-amber-500	">Acting</h1>
                      </div>
                      <div className="text-center">
                        {castTv.cast[1].name}
                        <h1 className="text-sm text-amber-500	">Acting</h1>
                      </div>
                    </div>
                  )}
                  {castTv.crew && castTv.crew.length > 4 && (
                    <div className="mb-4 flex justify-around	">
                      <div className="textAlign">
                        {castTv.crew[3].name}
                        <h1 className="text-sm text-amber-500	">Production</h1>
                      </div>
                      <div className="textAlign">
                        {castTv.crew[1].name}
                        <h1 className="text-sm text-amber-500	">Directing</h1>
                      </div>
                      <div className="textAlign">
                        {castTv.crew[4].name}
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
                </div>
                <div className="text-center">
                  <Link to={"/series"}>
                    <Button
                      color="cyan"
                      className="mb-3 text-center"
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
      )}
      <div>
        <h1 className="text-cyan-500 text-2xl ml-10">Top Billed Cast</h1>
        <div className="dFlex">
          <div className="ml-10 w-full overflow-auto	mt-5 flex ">
            {castingTvLoad && (
              <div className="flex">
                <Spinner className="h-16 w-full text-white" />
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
            <p className="mb-4 text-cyan-500 text-sm">{detailsTv.status}</p>
            <h1 className=" text-xl flex">Original Language</h1>
            <p className="mb-4 text-cyan-500 text-sm">
              {detailsTv.original_language}
            </p>
            <h1 className=" text-xl flex">Budget</h1>
            <p className="mb-4 text-cyan-500 text-sm">${detailsTv.budget}</p>
            <h1 className=" text-xl flex">Revenue</h1>
            <p className="text-cyan-500 text-sm">${detailsTv.revenue}</p>
          </div>
        </div>
        <Link to={`/series/${idTv}/collection`}>
          <h5 className="ml-10 text-cyan-500 mt-3 mt-3">Details Cast & Crew</h5>
        </Link>
        <div className="dFlex">
          <div className="flex flex-col	 mt-14 w-full overflow-auto ml-10 ">
            <h1 className="text-cyan-500 text-2xl">social</h1>
            <h1 className="text-purple-700	underline underline-offset-1 text-xs mt-6 mb-3">
              REVIEWS
            </h1>
            <div className="p-3 border-t-2 reviewFlex rounded-b-lg bg-gray-800">
              <h1 className=" bg-gray-400 h-16 rounded-full mr-10 p-5 mb-2 text-2xl">
                R
              </h1>
              {reviewsTv[0] && (
                <div>
                  <div className="  text-lg font-bold flex">
                    <h1 className="text-sky-700 mr-1 mb-1">A Review by</h1>
                    <p className=" text-cyan-500">{reviewsTv[0].author}</p>
                  </div>
                  <div className=" mb-3 flex text-sm">
                    Written by
                    <p className="ml-1 mr-1 text-cyan-500">
                      {reviewsTv[0].author}
                    </p>
                    on
                    <p className="ml-1 text-cyan-500">
                      {reviewsTv[0].created_at.slice(0, 10)}
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
                    {reviewsTv[0].content}
                  </ShowMoreText>
                </div>
              )}
            </div>
            {reviewsTv.length > 1 && (
              <Link to={`/series/${idTv}/reviewsTv`}>
                <h5 className="bg-gray-800 text-cyan-500 mt-3 border-2 border-gray-50 rounded-full pt-1 pb-1 text-center mt-3 font-bold	">
                  VIEW ALL REVIEWS
                </h5>
              </Link>
            )}
          </div>
          <div className="mt-6 lowercase text-white widthKey ml-10">
            {keywordsTvLoad && (
              <div className="flex">
                <Spinner className="h-16 w-full text-white" />
              </div>
            )}
            {keywordsTv &&
              keywordsTv.map((key) => (
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
          <div className="flex flex-col	ml-10 mt-14 w-full  ">
            <Taab />
          </div>
          <div className="w-2/5	ml-10"></div>
        </div>
        <div className="dFlex">
          <div className="flex flex-col	 mt-14 w-full overflow-auto  ml-10">
            {detailsTv && (
              <div
                className="w-full bg-cover mb-6 box-border 	pt-6"
                style={{
                  backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${detailsTv.backdrop_path})`,
                }}
              >
                <div className="mb-3 text-center">
                  <h1 className=" mb-6 text-2xl ">
                    Part of {detailsTv.name} Collection
                  </h1>
                  <h1 className="text-cyan-500">includes</h1>
                  {detailsTv.seasons &&
                    detailsTv.seasons.map((session, id) => (
                      <h1 key={id}>{session.name}</h1>
                    ))}
                  <Button
                    variant="outlined"
                    className="bg-black text-cyan-500 mt-3 border-2 border-gray-50	 rounded-full"
                  >
                    VIEW THE COLLECTION
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 lowercase text-white w-2/5	ml-10"></div>
        </div>
        <h1 className="text-xl mt-14 ml-10">Recommendations</h1>
        <div className="ml-10 mt-4 dFlex mb-8">
          <div className="flex 	overflow-auto  w-full  ">
            {recomendTv.map((img) => (
              <img
                key={img.id}
                style={{
                  backgroundColor: "#191e24",
                  borderColor: "rgb(66 66 66)",
                }}
                className="mr-2 border-4 border-gray-50 rounded-t"
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${img.poster_path}`}
              />
            ))}
          </div>
          <div className="w-2/5	ml-10"></div>
        </div>
      </div>
    </div>
  );
};
export default DetailsTv;
