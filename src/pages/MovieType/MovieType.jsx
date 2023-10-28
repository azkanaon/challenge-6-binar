import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../../redux/actions/movieActions";

import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

const MovieType = () => {
  const { type } = useParams();
  // tipe top rated direname agar tampilan terlihat lebih rapi
  const typeModifier = useState(type.toUpperCase());
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const dispatch = useDispatch();
  const { popular } = useSelector((state) => state.movie);

  // ambil movie dengan tipe popular
  useEffect(() => {
    dispatch(getPopularMovies(setErrors, errors));
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-t from-black to-white/5">
      {popular.length === 0 && <Loader />}
      <Navbar />
      <div className="font-poppins mx-auto pt-[100px] md:pt-[150px]  w-11/12 md:w-10/12 text-white pb-10">
        <div className="text-center pb-5 md:pb-10 ">
          <h2 className=" md:text-4xl text-2xl font-semibold">
            {typeModifier} MOVIE
          </h2>
        </div>
        <div className="flex flex-wrap w-full">
          {popular.map((movie) => (
            <div
              key={movie.id}
              className="w-6/12 md:w-4/12 lg:w-[20%] box-border p-1 md:p-4"
            >
              <Card
                title={movie.title}
                overview={movie.overview}
                poster={movie.poster_path}
                id={movie.id}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieType;
