import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header'
import Footer from './Footer'

const App: React.FC = () => {
  return (
    <Layout className="layout">
        <Header />
        <Outlet />
        <Footer />
    </Layout>
  );
};

export default App;