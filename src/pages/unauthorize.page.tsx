import { Typography } from "antd";

const UnauthorizePage = () => {
    return (
      <div
        style={{
          marginTop: '2rem',
          height: '15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography.Paragraph style={{ color: '#1f1e1e', fontWeight: 500 }}>
          Unauthorized Page
        </Typography.Paragraph>
      </div>
    );
  };
  
  export default UnauthorizePage;