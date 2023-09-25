import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import Header from './Header'
import Footer from './Footer'


const { Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
        <Header />
        <Outlet />
        <Footer />
    </Layout>
  );
};

export default App;