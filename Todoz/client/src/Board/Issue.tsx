import { Card, Space, Typography } from "antd"
import Title from "antd/es/typography/Title";
import { Issue } from "../utils/Interfaces";
import { Modifier, useDraggable } from "@dnd-kit/core";

import { useWindowSizeContext } from '../utils/useWindowSize';


interface IssueCardProps {
  card: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ card }) => {

  const { id, summary, description, assignee, storyPoints } = card


  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });


  return (
    <Card ref={setNodeRef}
      {...listeners}
      {...attributes}
      hoverable
      draggable
      style={{
        marginBottom: "8px", width: "100%", padding: "", zIndex: 1, transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }} >
      <Title level={5} style={{ margin: 0 }}>
        {summary}
      </Title>
      <Typography>
        {assignee}
      </Typography>
      <Typography>
        {storyPoints}
      </Typography>
    </Card>
  )
}

export default IssueCard