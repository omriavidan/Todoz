import { Card, Space, Typography } from "antd"
import Title from "antd/es/typography/Title";

interface IssueCardProps {
  card: {
    summary: string,
    description: string,
    assignee: string,
    storyPoints: number
  }
}

const IssueCard: React.FC<IssueCardProps> = ({ card }) => {

  const { summary, description, assignee, storyPoints } = card
  return (
    <Card hoverable style={{ marginBottom: "8px", width: "100%", padding: "" }} >
        <Title level={5} style={{ margin: 0}}>
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