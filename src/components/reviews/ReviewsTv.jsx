import React, { useEffect } from "react";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsTv } from "../../Redux-system/ReviewsTVSlice";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getDetailsTv } from "../../Redux-system/DetailsTvSlice";

const ReviewsTv = () => {
  const { reviewsTv } = useSelector((state) => state.reviewsTvSlice);
  const { detailsTv } = useSelector((state) => state.detailsTvSlice);
  const { idTv } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviewsTv(idTv));
    dispatch(getDetailsTv(idTv));
  }, []);
  console.log(reviewsTv);
  return (
    <div>
      <div className=" pb-4 bg-gray-800  box-border pt-6">
        <div
          style={{ marginLeft: "9%", color: "#bdbdbd" }}
          className="items-center	 flex mr-4 "
        >
          <img
            className="w-28	mr-4"
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${detailsTv.poster_path}`}
            alt="Poster to tv"
          />
          <div>
            <div className="flex items-baseline">
              <h1 className=" mb-2 mr-1 text-white text-2xl font-bold">
                {detailsTv.original_name}
              </h1>
              {detailsTv.first_air_date && (
                <h1 className="text-2xl">
                  ({detailsTv.first_air_date.slice(0, 4)})
                </h1>
              )}
            </div>
            <div className="text-center">
              <Link to={`/series/${idTv}`}>
                <h4 color="cyan" className="flex items-center">
                  <FaArrowLeft className="mr-2" />
                  Back a step
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10 flex flex-col p-3">
        {reviewsTv.map((rev, index) => (
          <div
            key={index}
            className="rounded-b-lg border-t-2 bg-gray-800 text-white p-3 flex mb-10"
          >
            <h1 className=" bg-gray-400 h-16 rounded-full mr-10 p-5 mb-2 text-2xl">
              R
            </h1>
            <div>
              <div className="  text-lg font-bold flex">
                <h1 className="text-sky-700 mr-1 mb-1">A Review by</h1>
                <p className=" text-cyan-500">{rev.author}</p>
              </div>
              <div className=" mb-3 flex text-sm">
                Written by
                <p className="ml-1 mr-1 text-cyan-500">{rev.author}</p>
                on
                <p className="ml-1 text-cyan-500">
                  {rev.created_at.slice(0, 10)}
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
                {rev.content}
              </ShowMoreText>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTv;
