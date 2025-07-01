import React, { useContext } from "react";
import { loginWithGoogle } from "../api/authApi";
import { toastError } from "../components/ToastContainer";
import { useNavigate } from "react-router";
import AuthContext from "../AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleAuthLogin() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const data = await loginWithGoogle(credentialResponse.credential);
          if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            authContext.signin(data.user, () => {
              navigate("/");
            });
          }
        } catch (error) {
          toastError(error?.response?.data?.msg ?? "Google login failed.");
          console.error(error);
        }
      }}
      onError={() => toastError("Login Failed.")}
      type="standard"
      // shape="pill"

      theme="filled_blue"
      text="signin"
      // useOneTap
    />
  );
}
