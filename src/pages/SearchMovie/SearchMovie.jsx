import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchMovie } from "../../redux/actions/movieActions";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CardSearch from "../../components/CardSearch";
import Loader from "../../components/Loader";

const SearchMovie = () => {
  // inputan user dipassing dan disimpan pada variabel query
  const dispatch = useDispatch();
  const { searchResult } = useSelector((state) => state.movie);
  const { query } = useParams();
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    dispatch(getSearchMovie(query, setErrors, errors));
  }, [query, dispatch]);

  if (searchResult.length === 0) {
    return (
      <div>
        {searchResult.length === 0 && <Loader />}
        <Navbar></Navbar>
        <div className="font-poppins w-screen h-screen flex items-center justify-center">
          <h2 className="text-white font-semibold text-lg md:text-2xl">
            Data Not Found
          </h2>
        </div>
        <Footer></Footer>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="font-poppins pt-[150px] bg-gradient-to-t from-black to-white/5 text-white px-6 pb-10">
        <div className="ml-12">
          <h1 className="text-2xl font-semibold">Result from {`'${query}'`}</h1>
        </div>
        <div className="flex flex-wrap w-full ">
          {searchResult.map((data) => (
            <div
              className="box-border w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-1 md:p-3"
              key={data.id}
            >
              <CardSearch
                id={data?.id || null}
                backdrop={data?.backdrop_path || null}
                title={data?.title || null}
                vote_average={data?.vote_average || 0}
                year={data.release_date || null}
                vote_count={data?.vote_count || null}
                popularity={data?.popularity || null}
                poster={data?.poster_path || null}
              ></CardSearch>
            </div>
          ))}
        </div>
      </div>
      {/* <ul>
        
      </ul> */}
      <Footer />
    </div>
  );
};

export default SearchMovie;
