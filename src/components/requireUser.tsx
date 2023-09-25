import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../redux/services/userApi";
import FullScreenLoader from "./FullScreenLoader";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();
  const logged_in = cookies.logged_in;

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;
  
    const { data: user } = userApi.endpoints.getMe.useQueryState(null, {
      skip: !logged_in,
    });

    if (loading) {
      return <FullScreenLoader />;
    }

  return logged_in && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : logged_in && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
