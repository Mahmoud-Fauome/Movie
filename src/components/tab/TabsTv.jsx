import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getTvBackdrob } from "../../Redux-system/TvBackdrobSlice";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router-dom";

const Taab = () => {
  const { seriesTrailer } = useSelector((state) => state.tvTrailer);
  const { seriesBackdrob, seriesLogos } = useSelector(
    (state) => state.tvBackdrob
  );
  const { idTv } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTvBackdrob(idTv));
  }, []);
  //   console.log(seriesLogos);
  return (
    <Tabs className=" ">
      <TabList className="font-bold text-sm	">
        <Tab>VIDEOS({seriesTrailer.length})</Tab>
        <Tab>BACKDROBS({seriesBackdrob.length})</Tab>
        <Tab>POSTERS({seriesLogos.length})</Tab>
      </TabList>

      <TabPanel>
        <div className="mt-5 overflow-auto flex ">
          {seriesTrailer.length > 0 ? (
            seriesTrailer.map((video, index) => (
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
          {seriesBackdrob.length > 0 ? (
            seriesBackdrob.map((img, index) => (
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
          {seriesLogos.length > 0 ? (
            seriesLogos.map((logo, index) => (
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
export default Taab;
