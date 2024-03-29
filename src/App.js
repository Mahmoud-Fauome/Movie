import React from "react";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Movies from "./components/movies/Movies";
import Series from "./components/series/Series";
import DeatailsMo from "./components/details/DeatailsMo";
import DetailsTv from "./components/details/DetailsTv";
import { SignIn } from "./components/sign/SignIn";
import Error from "./components/error/ErrorPage";
import ReviewsTv from "./components/reviews/ReviewsTv";
import ReviewsMo from "./components/reviews/ReviewsMo";
import CollectionMo from "./components/collections/CollectionMo";
import CollectionTv from "./components/collections/CollectionTv";

const App = () => {
  return (
    <div className="bg-black">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:idMovies" element={<DeatailsMo />} />
        <Route path="/movies/:idMovies/reviewsMovies" element={<ReviewsMo />} />
        <Route path="/movies/:idMovies/collection" element={<CollectionMo />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:idTv" element={<DetailsTv />} />
        <Route path="/series/:idTv/reviewsTv" element={<ReviewsTv />} />
        <Route path="/series/:idTv/collection" element={<CollectionTv />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
