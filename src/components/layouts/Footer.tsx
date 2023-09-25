import { Layout } from 'antd';

const { Footer } = Layout;

const FooterStyle: React.CSSProperties = {
  position: 'relative',
  left: 0,
  bottom: 0,
  right: 0,
  textAlign: 'center',
  background: '#000',
  color: '#fff',
  padding: '16px 0px',
  display: 'flex',
  flexDirection: 'column'
}

const FooterLayout: React.FC = () => {
  return (
    <Footer style={FooterStyle}>
        <p style={{ fontSize: '16px' }}>THE BIGGEST ONLINE GIFT STORE IN THAILAND With Excellent service team and Delivery.</p>
        <p style={{ fontSize: '14px' }}>Copyright ©2023 Flower4ever</p>
    </Footer>
    )
}

export default FooterLayout