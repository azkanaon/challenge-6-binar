import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../redux/actions/movieActions";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import SliderWithTitle from "../../components/SliderWithTitle";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { popular } = useSelector((state) => state.movie);
  const [moviePopularList, setMoviePopularList] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  // ambil movie dengan tipe popular
  useEffect(() => {
    dispatch(getPopularMovies(setErrors, errors));
  }, [dispatch]);

  useEffect(() => {
    if (popular.length > 0) {
      setMoviePopularList(popular.slice(0, 9));
    }
  }, [popular]);

  return (
    <div className="bg-gradient-to-b from-black/100 to-black/50 font-poppins">
      <Navbar />
      {moviePopularList.length === 0 && <Loader />}
      <div className="pb-10">
        <Hero />
        {/* masing-masing tipe dirender di SliderWithTitle */}
        <SliderWithTitle
          title="Popular"
          type="popular"
          movieList={moviePopularList}
        />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
