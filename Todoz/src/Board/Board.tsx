import { Button, Col, Layout, Space, theme } from "antd"
import { Header, Content } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title";
import { styled } from "styled-components";
import { useWindowSizeContext } from "../utils/useWindowSize";
import { useState } from "react";
import CreateModal from "./CreateModal";
import IssueCard from "./Issue";
import { ColumnType, Issue } from "../utils/Interfaces";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { Column } from "./Column";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";





const Board: React.FC = () => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const { width, height } = useWindowSizeContext();
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: 'todo',
      title: 'To Do',
    },
    {
      id: 'inprogress',
      title: 'In Progress',
    },
    {
      id: 'done',
      title: 'Done',
    }
  ]);


  const [issues, setIssues] = useState<Issue[]>([
    {
      id: uuidv4(),
      summary: "A new task",
      storyPoints: 4,
      description: 'need to do this and that',
      assignee: 'myself',
      status: "todo"
    },
    {
      id: uuidv4(),
      summary: "A new task",
      storyPoints: 4,
      description: 'need to do this and that',
      assignee: 'myself',
      status: "inprogress"
    }
  ])

  const addIssue = (newIssue: Issue) => {
    setIssues([...issues, newIssue]);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    const issueId = active.id as string;
    const newStatus = over.id as Issue['status'];

    setIssues(() => issues.map(issue => issue.id === issueId ? {
      ...issue, status: newStatus
    } : issue))

    setActiveIssue(null);
  }

  const handleDragStart = (e: any) => {
    const issue = issues.find((issue) => issue.id === e.active.id);
    setActiveIssue(issue || null);
  };

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
        <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
          <Space size="small" style={{ display: 'flex', justifyContent: 'center' }}>
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                issues={issues.filter((issue) => issue.status === column.id)}
              />
            ))}
          </Space>
        </DndContext>
      </Content>
      <CreateModal open={open} setOpen={setOpen} addIssue={addIssue} />
    </Layout>

  )
}

export default Board;