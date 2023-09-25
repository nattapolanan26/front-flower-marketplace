import React from 'react';
import { Space, Spin } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%', height: '95vh', justifyContent: 'center', backgroundColor: '#fff' }}>
      <Spin tip="Loading" size="large" >
        <div className="content" />
      </Spin>
  </Space>
);

export default App;