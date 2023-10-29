import { useState, useEffect } from "react";
// import { getVideo } from "../api/api";
import PropTypes from "prop-types";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../redux/actions/movieActions";

const ModalWatch = ({ id, close, isOpen ,page}) => {
  const { video } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  // ambil video
  useEffect(() => {
    dispatch(getVideo(errors, setErrors, id, page));
  }, [id, page]);

  return (
    <div>
      {/* videoId akan mengarahkan ke youtube */}
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={video[0] && video[0].key ? video[0].key : ""}
        onClose={() => close()}
      />
    </div>
  );
};

ModalWatch.propTypes = {
  id: PropTypes.number,
  close: PropTypes.func,
  isOpen: PropTypes.bool,
  page: PropTypes.string,
};

export default ModalWatch;
