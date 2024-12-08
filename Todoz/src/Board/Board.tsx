import { Button, Col, Layout, Space, theme } from "antd"
import { Header, Content } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title";
import { styled } from "styled-components";
import { useWindowSizeContext } from "../utils/useWindowSize";
import { useEffect, useState } from "react";
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
  const [maxColumnHeight, setMaxColumnHeight] = useState<number>(0);


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


  useEffect(() => {
    // Calculate max tasks height across all columns
    const maxTasks = Math.max(
      ...columns.map((col) => issues.filter((issue) => issue.status === col.id).length)
    );

    // Set a height dynamically based on the max number of tasks
    setMaxColumnHeight(Math.max(maxTasks * 135, height*0.7)); // Assume 100px per task (adjust based on task size)
  }, [columns, issues, height]);

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

  }

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

      <Content style={{ padding: "40px", alignItems: 'center', background: "#fff", height: height*3, overflowY: 'auto'}}>
        <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
          <Space size="small" style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                issues={issues.filter((issue) => issue.status === column.id)}
                colHeight={maxColumnHeight}
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