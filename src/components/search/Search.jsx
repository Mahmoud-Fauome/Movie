import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getDataSearch } from "../../Redux-system/Search";
import { Link } from "react-router-dom";
import { getTvSearch } from "../../Redux-system/SearchTvSlice";

const Search = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const { searchMovie } = useSelector((state) => state.searchMoviesSlice);
  const { searchTv } = useSelector((state) => state.searchTvSlice);

  useEffect(() => {
    dispatch(getDataSearch(data));
    dispatch(getTvSearch(data));
  }, [data]);
  return (
    <div className=" flex flex-col	justify-evenly	items-center	">
      <div className="w-11/12">
        <Input
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border-sky-500 "
          size="md"
          label="Search"
        />
      </div>
      {data.length > 0 && (
        <div className="w-full">
          <div className="w-full pt-3 pb-3 overflow-hidden rounded-lg bg-white  ">
            {searchMovie.length > 0 || searchTv.length > 0 ? (
              <ul className=" text-white p-3 h-72 overflow-auto">
                {searchMovie.map((movie) => (
                  <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <div className="rounded-lg p-2 bg-cyan-900	 items-center mb-1 flex justify-between	">
                      <li className="text-xl">{movie.original_title}</li>
                      <img
                        className="text-xs w-10 rounded-lg"
                        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                        alt="img not valid"
                      />
                    </div>
                  </Link>
                ))}
                {searchTv.map((tv) => (
                  <Link key={tv.id} to={`/series/${tv.id}`}>
                    <div className="rounded-lg p-2 bg-cyan-900	 items-center mb-2 flex justify-between	">
                      <li className="text-xl">{tv.original_name}</li>
                      <img
                        className="text-xs w-10 rounded-lg"
                        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tv.poster_path}`}
                        alt="img not valid"
                      />
                    </div>
                  </Link>
                ))}
              </ul>
            ) : (
              <h1 className="text-center text-xl bg-white text-amber-600	p-2 rounded-lg">
                No result for "{data}"
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
