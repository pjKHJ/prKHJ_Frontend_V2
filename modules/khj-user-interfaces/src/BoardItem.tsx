import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

interface BoardItemProps {
  studentId: string | number;
  name: string;
  baekjoonId: string;
  solvedAc: string | number;
  total: number;
  accuracy: number;
  today: number;
  streak: number;
}

interface CellProps {
  width?: string;
}

function BoardItem({
  studentId,
  name,
  baekjoonId,
  solvedAc,
  total,
  accuracy,
  today,
  streak,
}: BoardItemProps) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/dashboard/${studentId}`);
  };

  return (
    <BoardItemContainer>
      <Cell width="55px" onClick={handleItemClick}>
        {studentId}
      </Cell>
      <Cell width="80px" onClick={handleItemClick}>
        {name}
      </Cell>
      <Cell width="150px" onClick={handleItemClick}>
        {baekjoonId}
      </Cell>
      <Cell width="75px" onClick={handleItemClick}>
        {solvedAc}
      </Cell>
      <Cell width="70px" onClick={handleItemClick}>
        {total}개
      </Cell>
      <Cell width="45px" onClick={handleItemClick}>
        {accuracy}%
      </Cell>
      <Cell width="70px" onClick={handleItemClick}>
        {today}개
      </Cell>
      <Cell width="60px" onClick={handleItemClick}>
        D+{streak}
      </Cell>
    </BoardItemContainer>
  );
}

const BoardItemContainer = styled.div`
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 400;
  font-size: 16px;

  display: flex;
  gap: 36px;
  height: 40px;
  width: 900px;

  border-bottom: 1px solid #8a949e;
  color: #1e2124;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #0b50d0;
    font-weight: 500;
  }
`;

const Cell = styled.div<CellProps>`
  text-align: center;
  white-space: nowrap;
  cursor: pointer;

  width: ${({ width = "auto" }) => width};
`;

export default BoardItem;
