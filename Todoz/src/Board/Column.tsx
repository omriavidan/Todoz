import { useDroppable } from '@dnd-kit/core';
import { ColumnType, Issue } from '../utils/Interfaces'
import { styled } from 'styled-components';
import { Col, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import { useWindowSizeContext } from '../utils/useWindowSize';
import IssueCard from './Issue';

type ColumnProps = {
  column: ColumnType;
  issues: Issue[];
};

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


export function Column({ column, issues }: ColumnProps) {
  const { token } = theme.useToken();
  const { width, height } = useWindowSizeContext();
  const colorBorderSecondary = token.colorBorderSecondary;
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <TasksCol ref={setNodeRef} key={column.id} height={height} width={width} bgColor={colorBorderSecondary}>
      <TasksTitle level={5}>{column.title}</TasksTitle>
      {
        issues.map((issue) => (
          <IssueCard key={issue.id} card={issue} />
        ))
      }
    </TasksCol>
  );
}