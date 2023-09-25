import {
  Route,
  Routes,
} from "react-router-dom";
import Layout from "@/components/layouts";
import HomePage from "@/pages/home.page";
import LoginPage from "@/pages/login.page";
import RequireUser from "@/components/requireUser";
import RegisterPage from "@/pages/register.page";
import StorePage from "@/pages/store.page";
import UnauthorizePage from "@/pages/unauthorize.page";
import AuthGuard from "@/components/AuthGuard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireUser allowedRoles={["user", "admin"]} />}>
        <Route index element={<HomePage />} />
          <Route path="store" element={<StorePage />} />
        </Route>

        <Route path="unauthorized" element={<UnauthorizePage />} />

        <Route element={<AuthGuard />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
