import axiosInstance from "../components/AxiosInstance";

export const loginWithGoogle = async (idToken) => {
  const { data } = await axiosInstance.post("/auth/googleLogin", { idToken });
  return data;
};
