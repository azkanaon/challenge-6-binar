import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe(navigate, null, "/login"));
  }, [dispatch, navigate]);

  return children;
};

export default Protected;
