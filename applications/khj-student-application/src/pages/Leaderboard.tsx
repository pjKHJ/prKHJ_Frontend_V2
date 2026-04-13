import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";
import {
  getClassLeaderboard,
  type ClassLeaderboardItem,
  getStudentLeaderboard,
} from "../apis/leaderboard";

type SortKey =
  | "class"
  | "tier"
  | "totalSolved"
  | "accuracyRate"
  | "todaySolved"
  | "streak"
  | "maxStreak";

type StudentSortKey =
  | "rank"
  | "studentNumber"
  | "name"
  | "bojId"
  | "tier"
  | "totalSolved"
  | "accuracyRate"
  | "todaySolved"
  | "streak"
  | "maxStreak";

const tierNames: Record<number, string> = {
  0: "Banned",
  1: "Bronze 5",
  2: "Bronze 4",
  3: "Bronze 3",
  4: "Bronze 2",
  5: "Bronze 1",
  6: "Silver 5",
  7: "Silver 4",
  8: "Silver 3",
  9: "Silver 2",
  10: "Silver 1",
  11: "Gold 5",
  12: "Gold 4",
  13: "Gold 3",
  14: "Gold 2",
  15: "Gold 1",
  16: "Platinum 5",
  17: "Platinum 4",
  18: "Platinum 3",
  19: "Platinum 2",
  20: "Platinum 1",
  21: "Diamond 5",
  22: "Diamond 4",
  23: "Diamond 3",
  24: "Diamond 2",
  25: "Diamond 1",
  26: "Ruby 5",
  27: "Ruby 4",
  28: "Ruby 3",
  29: "Ruby 2",
  30: "Ruby 1",
  31: "Master",
};

function formatRate(value: number) {
  return `${value.toFixed(1)}%`;
}

function rankMedal(rank: number) {
  if (rank === 1) return "1";
  if (rank === 2) return "2";
  if (rank === 3) return "3";
  return "";
}

function LeaderboardPage() {
  const currentYear = new Date().getFullYear();
  const [sortKey, setSortKey] = useState<SortKey>("totalSolved");
  const [studentSortKey, setStudentSortKey] =
    useState<StudentSortKey>("totalSolved");

  const {
    data: classData,
    isLoading: isClassLoading,
    isError: isClassError,
  } = useQuery({
    queryKey: ["class-leaderboard"],
    queryFn: getClassLeaderboard,
  });

  const {
    data: studentData,
    isLoading: isStudentLoading,
    isError: isStudentError,
  } = useQuery({
    queryKey: ["student-leaderboard"],
    queryFn: getStudentLeaderboard,
  });

  const classRows = useMemo(() => {
    const classes = classData?.class ?? [];

    return [...classes].sort((left, right) => {
      const leftValue = left[sortKey];
      const rightValue = right[sortKey];

      const diff =
        typeof leftValue === "number" && typeof rightValue === "number"
          ? leftValue - rightValue
          : String(leftValue).localeCompare(String(rightValue));

      return -diff;
    });
  }, [classData, sortKey]);

  const studentRows = useMemo(() => {
    const students = studentData?.students ?? [];
    const ranked = [...students].sort((left, right) => {
      const leftValue =
        left[studentSortKey === "rank" ? "totalSolved" : studentSortKey];
      const rightValue =
        right[studentSortKey === "rank" ? "totalSolved" : studentSortKey];

      const diff =
        typeof leftValue === "number" && typeof rightValue === "number"
          ? leftValue - rightValue
          : String(leftValue).localeCompare(String(rightValue));

      return -diff;
    });

    return ranked.map((student, index) => ({
      ...student,
      rank: index + 1,
    }));
  }, [studentData, studentSortKey]);

  const classErrorMessage = isClassError
    ? "반 리더보드를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
    : "";
  const studentErrorMessage = isStudentError
    ? "개인 리더보드를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
    : "";

  const isLoading = isClassLoading || isStudentLoading;
  const isError = isClassError || isStudentError;

  return (
    <Page>
      <Shell>
        <Header>
          <HeaderCopy>
            <Eyebrow></Eyebrow>
            <Title>KHJ</Title>
            <Description>
              백준 온라인 저지에서의 성과를 반 대항 랭킹과 개인 랭킹을 확인해
              보세요.
            </Description>
          </HeaderCopy>
        </Header>

        {isLoading && <StateBox>리더보드를 불러오는 중입니다.</StateBox>}

        {isError && !isLoading && (
          <StateBox $isError>
            {classErrorMessage ||
              studentErrorMessage ||
              "리더보드를 불러오지 못했습니다."}
          </StateBox>
        )}

        {!isLoading && !isError && classRows.length === 0 && (
          <StateBox>표시할 반 데이터가 없습니다.</StateBox>
        )}

        <BoardsGrid>
          {!isLoading && !isError && classRows.length > 0 && (
            <LeaderboardSection>
              <SectionCard>
                <SectionHeader>
                  <div>
                    <SectionTitle>반 대항 랭킹</SectionTitle>
                  </div>
                  <SectionBadge>Class Board</SectionBadge>
                </SectionHeader>

                <SectionControlBar>
                  <ControlGroup>
                    <ControlLabel htmlFor="sort-key">정렬 기준</ControlLabel>
                    <Select
                      id="sort-key"
                      value={sortKey}
                      onChange={(event) =>
                        setSortKey(event.target.value as SortKey)
                      }
                    >
                      <option value="totalSolved">총 풀이</option>
                      <option value="accuracyRate">정답률</option>
                      <option value="todaySolved">오늘 풀이</option>
                      <option value="streak">연속일수</option>
                    </Select>
                  </ControlGroup>
                </SectionControlBar>

                <RankList>
                  {classRows.map((item: ClassLeaderboardItem, index) => {
                    const rank = index + 1;
                    return (
                      <RankRow
                        key={`${item.class}-${item.tier}-${index}`}
                        $rank={rank}
                      >
                        <RankBubble $rank={rank}>
                          <span>{rankMedal(rank) || `#${rank}`}</span>
                        </RankBubble>

                        <RankMain>
                          <PrimaryText>{item.class}반</PrimaryText>
                          <SecondaryText>
                            {tierNames[item.tier] ?? `Tier ${item.tier}`}
                          </SecondaryText>
                        </RankMain>

                        <StatRail>
                          <StatChip>
                            <StatLabel>총</StatLabel>
                            <StatValue>
                              {item.totalSolved.toLocaleString()}
                            </StatValue>
                          </StatChip>
                          <StatChip>
                            <StatLabel>정답률</StatLabel>
                            <StatValue>
                              {formatRate(item.accuracyRate)}
                            </StatValue>
                          </StatChip>
                          <StatChip>
                            <StatLabel>오늘</StatLabel>
                            <StatValue>{item.todaySolved}개</StatValue>
                          </StatChip>
                          <StatChip>
                            <StatLabel>연속</StatLabel>
                            <StatValue>{item.streak}일</StatValue>
                          </StatChip>
                        </StatRail>
                      </RankRow>
                    );
                  })}
                </RankList>
              </SectionCard>
            </LeaderboardSection>
          )}

          {!isLoading && !isError && studentRows.length > 0 && (
            <LeaderboardSection>
              <SectionCard>
                <SectionHeader>
                  <div>
                    <SectionTitle>개인 랭킹</SectionTitle>
                  </div>
                  <SectionBadge>Personal Board</SectionBadge>
                </SectionHeader>

                <SectionControlBar>
                  <ControlGroup>
                    <ControlLabel htmlFor="student-sort-key">
                      정렬 기준
                    </ControlLabel>
                    <Select
                      id="student-sort-key"
                      value={studentSortKey}
                      onChange={(event) =>
                        setStudentSortKey(event.target.value as StudentSortKey)
                      }
                    >
                      <option value="totalSolved">총 풀이</option>
                      <option value="accuracyRate">정답률</option>
                      <option value="todaySolved">오늘 풀이</option>
                      <option value="streak">연속일수</option>
                      <option value="tier">티어</option>
                    </Select>
                  </ControlGroup>
                </SectionControlBar>

                <RankList>
                  {studentRows.map((item) => (
                    <RankRow key={item.id} $rank={item.rank}>
                      <RankBubble $rank={item.rank}>
                        <span>{rankMedal(item.rank) || `#${item.rank}`}</span>
                      </RankBubble>

                      <RankMain>
                        <PrimaryText>{item.name}</PrimaryText>
                        <SecondaryText>
                          {item.studentNumber} · {item.bojId}
                        </SecondaryText>
                      </RankMain>

                      <StatRail>
                        <StatChip>
                          <StatLabel>티어</StatLabel>
                          <StatValue>
                            {tierNames[item.tier] ?? `Tier ${item.tier}`}
                          </StatValue>
                        </StatChip>
                        <StatChip>
                          <StatLabel>총</StatLabel>
                          <StatValue>
                            {item.totalSolved.toLocaleString()}
                          </StatValue>
                        </StatChip>
                        <StatChip>
                          <StatLabel>정답률</StatLabel>
                          <StatValue>{formatRate(item.accuracyRate)}</StatValue>
                        </StatChip>
                        <StatChip>
                          <StatLabel>오늘</StatLabel>
                          <StatValue>{item.todaySolved}개</StatValue>
                        </StatChip>
                      </StatRail>
                    </RankRow>
                  ))}
                </RankList>
              </SectionCard>
            </LeaderboardSection>
          )}
        </BoardsGrid>

        <Footer>
          <FooterSupportText>
            solved.ac로부터 지원을 받아 정보를 제공합니다.{" "}
            <FooterLink
              href="https://solved.ac"
              target="_blank"
              rel="noreferrer"
            >
              solved.ac
            </FooterLink>
          </FooterSupportText>
          <FooterText>© {currentYear} KHJ. All rights reserved.</FooterText>
        </Footer>
      </Shell>
    </Page>
  );
}

const Page = styled.main`
  min-height: 100vh;
  padding: 32px 20px 40px;
`;

const Shell = styled.section`
  width: min(1200px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const BoardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 1080px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const Footer = styled.footer`
  margin-top: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 14px 6px 2px;
`;

const FooterText = styled.p`
  color: #8c96a5;
  font-size: 12px;
  letter-spacing: 0.03em;
  text-align: center;
`;

const FooterSupportText = styled.p`
  color: #a0aaba;
  font-size: 12px;
  text-align: center;
  margin-bottom: 6px;
`;

const FooterLink = styled.a`
  color: #b3ff96;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #c6ffaf;
  }
`;

const LeaderboardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    180deg,
    rgba(15, 18, 23, 0.96) 0%,
    rgba(8, 10, 13, 0.96) 100%
  );
  border-radius: 28px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 10px;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: start;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  letter-spacing: -0.03em;
`;

const SectionBadge = styled.div`
  flex: 0 0 auto;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: #ced5df;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  background: linear-gradient(
    135deg,
    rgba(15, 18, 23, 0.96) 0%,
    rgba(8, 10, 13, 0.96) 72%
  );
  padding: 24px;

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const HeaderCopy = styled.div`
  display: flex;
  flex-direction: column;
`;

const Eyebrow = styled.div`
  color: #aab1bb;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 14px;
`;

const Title = styled.h1`
  font-size: clamp(34px, 5vw, 54px);
  line-height: 1.05;
  margin-bottom: 10px;
  letter-spacing: -0.04em;
`;

const Description = styled.p`
  color: #b9c2ce;
  line-height: 1.6;
  max-width: 56ch;
`;

const SectionControlBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: end;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(10, 12, 15, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 12px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
`;

const ControlLabel = styled.label`
  color: #9aa3b2;
  font-size: 13px;
`;

const Select = styled.select`
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0d1014;
  color: #f5f7fa;
  border-radius: 12px;
  padding: 10px 12px;
  min-width: 200px;
  outline: none;

  &:focus {
    border-color: rgba(255, 255, 255, 0.28);
  }
`;

const StateBox = styled.div<{ $isError?: boolean }>`
  border: 1px solid
    ${({ $isError }) =>
      $isError ? "rgba(244, 67, 54, 0.25)" : "rgba(255, 255, 255, 0.08)"};
  background: ${({ $isError }) =>
    $isError ? "rgba(244, 67, 54, 0.08)" : "rgba(10, 12, 15, 0.72)"};
  color: ${({ $isError }) => ($isError ? "#ffb3ab" : "#d7dde5")};
  border-radius: 20px;
  padding: 22px 20px;
  text-align: center;
`;

const RankList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RankRow = styled.div<{ $rank: number }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: ${({ $rank }) =>
    $rank === 1
      ? "linear-gradient(90deg, rgba(255, 215, 64, 0.16), rgba(255, 255, 255, 0.02))"
      : $rank === 2
        ? "linear-gradient(90deg, rgba(192, 192, 192, 0.15), rgba(255, 255, 255, 0.02))"
        : $rank === 3
          ? "linear-gradient(90deg, rgba(205, 127, 50, 0.15), rgba(255, 255, 255, 0.02))"
          : "rgba(13, 16, 20, 0.88)"};
`;

const RankBubble = styled.div<{ $rank: number }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 15px;
  font-weight: 800;
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #fff;
  background: ${({ $rank }) =>
    $rank === 1
      ? "#bf8a07"
      : $rank === 2
        ? "#7d8791"
        : $rank === 3
          ? "#8d5d3b"
          : "#13171d"};
`;

const RankMain = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 140px;
`;

const PrimaryText = styled.div`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const SecondaryText = styled.div`
  font-size: 12px;
  color: #9fa9b8;
`;

const StatRail = styled.div`
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 820px) {
    margin-left: 0;
    justify-content: flex-start;
  }
`;

const StatChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const StatLabel = styled.span`
  color: #8f99a9;
  font-size: 11px;
`;

const StatValue = styled.span`
  color: #eef3f7;
  font-size: 12px;
  font-weight: 700;
`;

export default LeaderboardPage;
