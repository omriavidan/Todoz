import React, { useState, useEffect } from "react";
import { Layout, Menu, Card, Button, Typography, Col, Row, theme, Space, Avatar } from "antd";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { UserOutlined } from '@ant-design/icons';
import Board from "./Board/Board";

const { Header, Sider, Content } = Layout;


const App: React.FC = () => {
  const { token } = theme.useToken();
  const colorBgLayout = token.colorBgLayout;
  const colorBorder = token.colorBorder;
  const colorPrimary = token.colorPrimary;

  // State to track window dimensions
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


const StyledSider = styled(Sider)`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space out items to align the avatar at the bottom */
  padding: 16px;
`;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ height: `${windowSize.height}px`, width: `${windowSize.width}px`, margin: 0, padding: 0 }}>
      <Header
        style={{
          background: colorBorder,
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        TODOZ
      </Header>

      <Layout>
        <StyledSider width={`${windowSize.width * 0.045}px`} style={{ backgroundColor: colorPrimary}}>
            <Avatar size={45} icon={<UserOutlined />} style={{ marginTop: '80vh' }} />
        </StyledSider>

        <Sider width={`${windowSize.width * 0.13}px`} style={{ backgroundColor: colorBgLayout }}>
          <Space wrap style={{ marginLeft: '10px', marginTop: '15px', marginBottom: '20px' }}>
            <Avatar size={55} icon={<UserOutlined />} />
            <Space wrap direction="vertical" size={0}>
              <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                Vulcan
              </Typography>
              <Typography style={{ fontSize: "14px", color: '#8c8c8c' }}>
                Q1-S1
              </Typography>
            </Space>
          </Space>
          <Menu mode="vertical" defaultSelectedKeys={["1"]} style={{ backgroundColor: colorBgLayout }}>
            <Menu.Item key="1">Board</Menu.Item>
            <Menu.Item key="2">Backlog</Menu.Item>
            <Menu.Item key="3">Stats</Menu.Item>
          </Menu>
        </Sider>
        <Board></Board>
      </Layout>
    </Layout>
  );
};

export default App;
