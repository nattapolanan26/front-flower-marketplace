import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

// ** antd
import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { CookiesProvider } from "react-cookie";
import AuthMiddleware from "./helpers/AuthMiddleware.tsx";

const config: ThemeConfig = {
  token: {
    colorPrimary: "#000",
  },
  components: {
    Typography: {
      colorPrimary: "#000",
    },
    Menu: {
      colorPrimary: "#000",
      colorPrimaryHover: "#eee",
      controlItemBgActive: "#9D9D9D",
    },
    Steps: {
      controlItemBgActive: "#eee",
    },
    Select: {
      colorPrimaryHover: "#eee",
      controlItemBgActive: "#9D9D9D",
    },
    Spin: {
      colorPrimary: "#000",
    },
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <AuthMiddleware>
            <ConfigProvider theme={config}>
              <App />
            </ConfigProvider>
          </AuthMiddleware>
        </CookiesProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
