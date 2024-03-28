import React, { useEffect } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getSeries } from "../../Redux-system/SeriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../Redux-system/MoviesSlice";

export function SimplePagination() {
  const dispatch = useDispatch();

  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active === 500) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  useEffect(() => {
    dispatch(getSeries(active));
    dispatch(getMovies(active));
  }, [active]);
  return (
    <div className="mb-10 flex justify-center items-center gap-8">
      <IconButton
        size="sm"
        color="white"
        variant="outlined"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography
        color="white"
        className="border-2 border-white rounded pl-2 pr-2 font-normal"
      >
        Page <strong className="text-cyan-500">{active}</strong> of{" "}
        <strong className="text-red-600	">500</strong>
      </Typography>
      <IconButton
        size="sm"
        color="white"
        variant="outlined"
        onClick={next}
        disabled={active === 500}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
