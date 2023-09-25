import { Outlet, Navigate } from "react-router-dom";
import { userApi } from "@/redux/services/userApi";
import { useCookies } from "react-cookie";

const AuthGuard = () => {
  const [cookies] = useCookies(["logged_in"]);
  const logged_in = cookies.logged_in;

  const { data: user } = userApi.endpoints.getMe.useQuery(null, {
    skip: !logged_in,
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthGuard;
