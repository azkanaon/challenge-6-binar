import { useGoogleLogin } from "@react-oauth/google";
import logoGoogle from "../assets/image/logoGoogle.png";
import { useDispatch } from "react-redux";
import { registerLoginWithGoogleAction } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(
        registerLoginWithGoogleAction(responseGoogle.access_token, navigate)
      ),
    onError: (errorResponse) => {
      alert(errorResponse.error_description);
    },
  });

  return (
    <div
      className="cursor-pointer w-8/12 my-2 box-border flex justify-center hover:translate-y-[-5px] duration-300 border rounded-lg border-slate-5500"
      onClick={() => loginWithGoogle()}
    >
      <div className="">
        <img width={40} height={40} src={logoGoogle} alt="" />
      </div>
      <div className="text-white my-auto font-semibold text-lg">
        <span>Login with Google</span>
      </div>
    </div>
  );
}

export default GoogleLogin;
