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
  font-size: 15px;

  display: flex;
  gap: 32px;
  padding: 12px 16px;
  height: auto;
  min-height: 36px;
  min-width: 900px;

  border-bottom: 1px solid #8a949e;
  color: #1e2124;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  transition: all 0.2s;

  &:hover {
    color: #0b50d0;
    font-weight: 500;
    background-color: #f5f7fa;
  }

  @media (max-width: 1024px) {
    gap: 24px;
    min-width: 800px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    gap: 16px;
    min-width: 700px;
    font-size: 12px;
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    gap: 12px;
    min-width: 600px;
    font-size: 11px;
    padding: 8px 10px;
  }
`;

const Cell = styled.div<CellProps>`
  text-align: center;
  white-space: nowrap;
  cursor: pointer;

  width: ${({ width = "auto" }) => width};
`;

export default BoardItem;
