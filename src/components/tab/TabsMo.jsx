import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getMovieTrailer } from "../../Redux-system/MoviesTraillerSlice";
import { getMovieBackdrob } from "../../Redux-system/MoBackdrobSlice";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router-dom";

const Tabb = () => {
  const { moTrailer } = useSelector((state) => state.movieTrailer);
  const { moBackdrob, moLogos } = useSelector((state) => state.movieBackdrob);
  const { idMovies } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieBackdrob(idMovies));
  }, []);
  return (
    <Tabs>
      <TabList className="font-bold text-sm	">
        <Tab>VIDEOS({moTrailer.length})</Tab>
        <Tab>BACKDROBS({moBackdrob.length})</Tab>
        <Tab>POSTERS({moLogos.length})</Tab>
      </TabList>

      <TabPanel>
        <div className="mt-5 overflow-auto flex ">
          {moTrailer.length > 0 ? (
            moTrailer.map((video, index) => (
              <iframe
                key={index}
                style={{ backgroundColor: "#191e24", borderColor: "#191e24" }}
                height={220}
                className="me-1 border-4 w-full"
                src={`https://www.youtube.com/embed/${video.key}`}
              ></iframe>
            ))
          ) : (
            <h1 className=" text-center pt-5 text-xl font-bold">
              THERE IS NOT TRAILER FOUND YET
            </h1>
          )}
        </div>
      </TabPanel>
      <TabPanel>
        <div className="mt-5 overflow-auto flex ">
          {moBackdrob.length > 0 ? (
            moBackdrob.map((img, index) => (
              <img
                key={index}
                className="mb-2 border-2 w-40 "
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${img.file_path}`}
              />
            ))
          ) : (
            <h1 className=" text-center pt-5 text-xl font-bold">
              THERE IS NOT IMGES FOUND YET
            </h1>
          )}
        </div>
      </TabPanel>
      <TabPanel>
        <div className="mt-5 overflow-auto flex ">
          {moLogos.length > 0 ? (
            moLogos.map((logo, index) => (
              <img
                key={index}
                className="mb-1 ml-1 border-2 w-40 "
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${logo.file_path}`}
              />
            ))
          ) : (
            <h1 className=" text-center pt-5 text-xl font-bold">
              THERE IS NOT IMGES FOUND YET
            </h1>
          )}
        </div>
      </TabPanel>
    </Tabs>
  );
};
export default Tabb;
