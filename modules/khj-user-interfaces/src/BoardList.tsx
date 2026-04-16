import styled from "@emotion/styled";
import BoardItem from "./BoardItem";

interface BoardListItem {
  student_no: string | number;
  name: string;
  id: string;
  tierName: string | number;
  solved_total: number;
  accuracy_pct: number;
  solved_today: number;
  streak_days: number;
}

interface BoardListProps {
  items: BoardListItem[];
}

function BoardList({ items }: BoardListProps) {
  return (
    <BoardListContainer>
      <BoardListHeader>
        <BoardListTitle width="55px">학번</BoardListTitle>
        <BoardListTitle width="80px">이름</BoardListTitle>
        <BoardListTitle width="150px">백준 아이디</BoardListTitle>
        <BoardListTitle width="75px">티어</BoardListTitle>
        <BoardListTitle width="70px">총 풀이</BoardListTitle>
        <BoardListTitle width="45px">정답률</BoardListTitle>
        <BoardListTitle width="70px">일일 풀이</BoardListTitle>
        <BoardListTitle width="60px">연속일수</BoardListTitle>
      </BoardListHeader>

      {items.map((student, idx) => (
        <BoardItem
          key={student.student_no ?? idx}
          studentId={student.student_no}
          name={student.name}
          baekjoonId={student.id}
          solvedAc={student.tierName}
          total={student.solved_total}
          accuracy={student.accuracy_pct}
          today={student.solved_today}
          streak={student.streak_days}
        />
      ))}
    </BoardListContainer>
  );
}

const BoardListContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 900px;
  min-height: 500px;
  height: auto;
  box-sizing: border-box;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 1024px) {
    max-width: 800px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    min-height: auto;
  }

  @media (max-width: 480px) {
    border-radius: 8px;
  }
`;

const BoardListHeader = styled.div`
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 700;
  font-size: 15px;

  display: flex;
  gap: 32px;
  padding: 12px 16px;
  height: auto;
  min-width: 900px;

  border-top: 1px solid #8a949e;
  border-bottom: 1px solid #8a949e;
  color: #0b50d0;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  flex-wrap: nowrap;

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

const BoardListTitle = styled.div<{ width?: string }>`
  width: ${({ width = "auto" }) => width};
  text-align: center;
  justify-content: center;
`;

export default BoardList;
