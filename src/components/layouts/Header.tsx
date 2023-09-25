import { Layout, Menu, Typography, message } from "antd";
import logo from "@/assets/logo/flower-1x.svg";
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/redux/store";
import { useLogoutUserMutation } from "@/redux/services/authApi";
import { useEffect, useState } from "react";
import { ShopOutlined, UserOutlined } from "@ant-design/icons";
import ViewProfile from "@/views/profile/Information";
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  backgroundColor: "#fff",
  justifyContent: "space-between",
  background: "var(--conditional-header-background, #FFF)",
  position: "sticky",
  zIndex: "999",
  top: "-10px",
  boxShadow: "0 -6px 10px 5px rgba(0,0,0,0.2)",
};

const LogoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const list = ["เข้าสู่ระบบ", "สมัครสมาชิก"];

const HeaderLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const user = useAppSelector((state) => state.userState.user);

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  const navigate = useNavigate();

  const handleClick = (key: string) => {
    if (key == "1") navigate("/login");
    else if (key == "2") navigate("/register");
    else navigate("/store");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/login";
      message.success("logout success!");
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          message.error(el.message)
        );
      } else {
        message.error((error as any).data.message);
      }
    }
  }, [isLoading]);

  const onLogoutHandler = async () => logoutUser();

  return (
    <>
      <ViewProfile open={open} onClose={onClose} />
      <Header
        style={{
          padding: !isDesktop ? "0 20px" : "0 50px",
          ...headerStyle,
        }}
      >
        <Link to="/" style={LogoStyle}>
          <img src={logo} alt="Flower" />
          <Typography.Text style={{ fontSize: "16px", marginLeft: "0.5rem" }}>
            Flower4ever
          </Typography.Text>
        </Link>
        <div style={{ width: "40%" }}>
          {!user && (
            <Menu
              style={{ justifyContent: "right" }}
              theme="light"
              mode="horizontal"
              onClick={(e) => handleClick(e.key)}
              items={list.map((item, index) => {
                const key = index + 1;
                return {
                  key,
                  label: item,
                };
              })}
            />
          )}
          {user && (
            <Menu
              style={{ justifyContent: "right" }}
              theme="light"
              mode="horizontal"
              items={[
                {
                  key: "shopme",
                  label: "ร้านค้าของคุณ",
                  onClick: () => navigate("/store"),
                  icon: <ShopOutlined style={{ fontSize: "16px" }} />,
                },
                {
                  key: "information",
                  label: `${user.name}`,
                  icon: <UserOutlined style={{ fontSize: "16px" }} />,
                  children: [
                    {
                      key: "profile",
                      label: "โปรไฟล์",
                      onClick: showDrawer,
                    },
                    {
                      key: "logout",
                      label: "ออกจากระบบ",
                      onClick: onLogoutHandler,
                    },
                  ],
                },
              ]}
            />
          )}
        </div>
      </Header>
    </>
  );
};

export default HeaderLayout;
