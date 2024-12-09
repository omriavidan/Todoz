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
  colHeight: number;
};

const TasksCol = styled(Col) <{ height: number, width: number, bgColor: string }>`
background-color: ${(props) => props.bgColor};
padding-left: 10px;
padding-right: 10px;
padding-top: 0px;
width: ${(props) => props.width * 0.25}px;
height: ${(props) => props.height}px;
flex: 1; 
display: flex; 
flex-direction: column; 
align-items: center; 
justify-content: flex-start; 
`
const TasksTitle = styled(Title)`
text-align: center;
color: #8c8c8c !important;;
margin: 10px;
padding-top: 10px;
font-size: 20px;
`;


export function Column({ column, issues, colHeight }: ColumnProps) {
  const { token } = theme.useToken();
  const { width, height } = useWindowSizeContext();
  const colorBorderSecondary = token.colorBorderSecondary;
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (

    <TasksCol ref={setNodeRef} key={column.id} height={colHeight} width={width} bgColor={colorBorderSecondary} >
      <TasksTitle level={5}>{column.title}</TasksTitle>
      {
        issues.map((issue) => (
          <IssueCard key={issue.id} card={issue} />
        ))
      }
    </TasksCol>
  );
}