import React, { useEffect } from "react";
import { getCastingMove } from "../../Redux-system/CastingMoSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsMov } from "../../Redux-system/DetailsMoSlice";
import { Spinner } from "@material-tailwind/react";

const CollectionMo = () => {
  const { idMovies } = useParams();
  const { topCrew, topAct } = useSelector((state) => state.castingMovies);
  const { detailsMovies, detailsMoviesLoad } = useSelector(
    (state) => state.detailsMoSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailsMov(idMovies));
    dispatch(getCastingMove(idMovies));
  }, []);
  console.log(detailsMovies);
  console.log(topCrew);
  return (
    <div>
      {detailsMovies.belongs_to_collection && (
        <div
          className="text-white mb-7 pb-8 back bg-fixed	bg-cover pt-8"
          style={{
            backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${detailsMovies.belongs_to_collection.backdrop_path})`,
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
                className=" w-11/12	"
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${detailsMovies.belongs_to_collection.poster_path}`}
                alt="Poster to movie"
              />
            </div>
            <div className=" mt-4 w-11/12 ">
              <h1 className="mb-5 text-2xl font-bold">
                {detailsMovies.belongs_to_collection.name}
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
              <div className="flex items-center mb-6">
                <h1 className=" text-2xl font-bold text-cyan-500 ">
                  Number of Movies :
                </h1>
                <p className="text-2xl text-bold ">
                  {/* ${detailsMovies.revenue / 100000000000} */}
                </p>
              </div>
              <div className="flex items-center mb-6">
                <h1 className=" text-2xl font-bold text-cyan-500 ">
                  Revenue :
                </h1>
                <p className="text-2xl text-bold ">
                  ${detailsMovies.revenue / 1000000000}
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-cyan-500 mt-14 mb-9 text-3xl ml-11">Featured Cast</h1>
      <div className="ml-11 w-11/12 flex flex-wrap">
        {topAct.map((data, index) => (
          <div
            className="w-80 mr-7 rounded bg-gray-800  mb-7  flex"
            key={index}
          >
            <img
              className="mr-2 w-14"
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${data.profile_path}`}
            />
            <div className="flex flex-col justify-center">
              <h1 className=" text-white">{data.name}</h1>
              <h1 className=" text-white">{data.character}</h1>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-cyan-500 mt-14 mb-9 text-3xl ml-11">Featured Crew</h1>
      <div className="ml-11 w-11/12 flex flex-wrap">
        {topCrew.map((data, index) => (
          <div
            className="w-80 mr-7 rounded bg-gray-800  mb-7  flex"
            key={index}
          >
            <img
              className="mr-2 w-14"
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${data.profile_path}`}
            />
            <div className="flex flex-col justify-center">
              <h1 className=" text-white">{data.name}</h1>
              <h1 className=" text-white">{data.known_for_department}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionMo;
