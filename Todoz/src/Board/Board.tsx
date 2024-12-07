import { Button, Card, Col, Layout, Space, theme } from "antd"
import { Header, Content } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title";
import { styled } from "styled-components";
import { useWindowSizeContext } from "../utils/useWindowSize";
import { useState } from "react";
import CreateModal from "./CreateModal";
import IssueCard from "./Issue";



const TasksCol = styled(Col) <{ height: number, width: number, bgColor: string }>`
background-color: ${(props) => props.bgColor};
padding-left: 10px;
padding-right: 10px;
padding-top: 0px;
height: ${(props) => props.height * 0.7}px;
width: ${(props) => props.width * 0.25}px;
flex: 1; /* Allow column to grow equally */
display: flex; /* Ensure column content respects flexbox rules */
flex-direction: column; /* Stack children vertically */
align-items: center; /* Center align horizontally */
justify-content: flex-start; /* Align content at the top */
`
const TasksTitle = styled(Title)`
text-align: center;
color: #8c8c8c !important;;
margin: 10px;
padding-top: 10px;
font-size: 20px;
`;

const Board: React.FC = () => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const colorBorderSecondary = token.colorBorderSecondary;
  const { width, height } = useWindowSizeContext();
  const [issues, setIssues] = useState({
    card1: {
      summary: "A new task",
      storyPoints: 4,
      description: 'need to do this and that',
      assignee: 'myself'
    }
  });

  return (
    <Layout>
      <Header
        style={{
          background: "white",
          padding: `0 ${width * 0.025}px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={4} >
          Board
        </Title>
        <Space wrap >
          <Button type="primary" onClick={() => setOpen(true)}>Create</Button>
          <Button>Settings</Button>
        </Space>
      </Header>

      <Content style={{ padding: "40px", alignItems: 'center', background: "#fff", }}>
        <Space size="small" style={{ display: 'flex', justifyContent: 'center' }}>
          <TasksCol height={height} width={width} bgColor={colorBorderSecondary}>
            <TasksTitle level={5}>To Do</TasksTitle>
            <IssueCard card={issues.card1}/>
            <IssueCard card={issues.card1}/>
          </TasksCol>

          <TasksCol height={height} width={width} bgColor={colorBorderSecondary}>
            <TasksTitle level={5}>In Progress</TasksTitle>
            <IssueCard card={issues.card1}/>
          </TasksCol>

          <TasksCol height={height} width={width} bgColor={colorBorderSecondary}>
            <TasksTitle level={5}>Done</TasksTitle>
            <IssueCard card={issues.card1}/>
          </TasksCol>
        </Space>
      </Content>
      <CreateModal open={open} setOpen={setOpen} />
    </Layout>

  )
}

export default Board;