import styled from "@emotion/styled";
import { useState } from "react";
import { BoardList } from "@khj/user-interfaces";
import { SearchIcon } from "@khj/user-interfaces";

function List() {
  const tierMap = {
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

  const dummyItems = [
    {
      student_no: "10101",
      name: "김철수",
      id: "chulsoo01",
      tier: "12",
      solved_total: 320,
      accuracy_pct: 86,
      solved_today: 3,
      streak_days: 14,
    },
    {
      student_no: "10102",
      name: "이영희",
      id: "younghee02",
      tier: "16",
      solved_total: 410,
      accuracy_pct: 90,
      solved_today: 5,
      streak_days: 22,
    },
    {
      student_no: "10103",
      name: "박민수",
      id: "minsoo03",
      tier: "9",
      solved_total: 205,
      accuracy_pct: 78,
      solved_today: 2,
      streak_days: 7,
    },
    {
      student_no: "10104",
      name: "최지훈",
      id: "jihoon04",
      tier: "21",
      solved_total: 580,
      accuracy_pct: 93,
      solved_today: 8,
      streak_days: 45,
    },
    {
      student_no: "10105",
      name: "정다은",
      id: "daeun05",
      tier: "6",
      solved_total: 150,
      accuracy_pct: 72,
      solved_today: 1,
      streak_days: 3,
    },
  ];

  const [filteredItems, setFilteredItems] = useState(dummyItems);

  const [searchTerm, setSearchTerm] = useState("");
  const [grade, setGrade] = useState("");
  const [classNum, setClassNum] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [sortKey, setSortKey] = useState(""); // 선택한 정렬 기준
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  return (
    <Content>
      <BoardContainer>
        <BoardTitle>
          <div>List</div>

          <SearchInputContainer>
            <SearchInput
              type="text"
              placeholder="학번 또는 이름으로 검색"
              value={searchTerm}
              maxLength={9}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIconContainer>
              <img
                src={SearchIcon}
                alt="icon"
                style={{ width: "auto", height: "100%" }}
              />
            </SearchIconContainer>
          </SearchInputContainer>
        </BoardTitle>

        {filteredItems.length > 0 ? (
          <BoardList
            items={filteredItems.map((item) => ({
              ...item,
              tierName:
                tierMap[parseInt(item.tier) as keyof typeof tierMap] ||
                "Unknown",
            }))}
          />
        ) : (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#555", // 기본 텍스트 색
              fontSize: "18px",
              fontWeight: "500",
              backgroundColor: "#fdfdfd", // 밝은 배경
              border: "2px solid #CDD1D5", // primary 컬러 테두리
              borderRadius: "12px",
              marginTop: "20px",
              boxShadow: "0 6px 12px rgba(0,0,0,0.1)", // 그림자 더 진하게
              lineHeight: "1.6",
            }}
          >
            <span style={{ color: "#2E7DFF" }}>"검색 결과가 없습니다"</span>
            <br />
            철자를 확인해주세요
          </div>
        )}
      </BoardContainer>
      <SearchFilterBox>
        <SectionContainer>
          <SectionTitle>Sort</SectionTitle>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={sortOrder === "asc"}
                onChange={(e) => setSortOrder(e.target.value)}
              />
              오름차순
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="sortOrder"
                value="desc"
                checked={sortOrder === "desc"}
                onChange={(e) => setSortOrder(e.target.value)}
              />
              내림차순
            </RadioLabel>
          </RadioGroup>

          <FilterSelect
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="">정렬 기준 선택</option>
            <option value="name">이름</option>
            <option value="tier">티어</option>
            <option value="solved_total">총 풀이</option>
            <option value="accuracy_pct">정답률</option>
            <option value="solved_today">일일 풀이</option>
            <option value="streak_days">연속일수</option>
          </FilterSelect>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Filter</SectionTitle>
          <FilterLabel htmlFor="grade">학년</FilterLabel>
          <FilterSelect
            id="grade"
            value={grade}
            onChange={(e) => {
              console.log("[Grade Changed]", e.target.value);
              setGrade(e.target.value);
            }}
          >
            <option value="">선택해주세요.</option>
            <option value="1">1학년</option>
            {/* <option value="2">2학년</option> */}
            {/* <option value="3">3학년</option> */}
          </FilterSelect>
          <FilterLabel htmlFor="classNum">반</FilterLabel>
          <FilterSelect
            id="classNum"
            value={classNum}
            onChange={(e) => {
              console.log("[ClassNum Changed]", e.target.value);
              setClassNum(e.target.value);
            }}
          >
            <option value="">선택해주세요.</option>
            <option value="1">1반</option>
            <option value="2">2반</option>
            <option value="3">3반</option>
            <option value="4">4반</option>
          </FilterSelect>
          <FilterLabel>일일 풀이 현황</FilterLabel>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="submissionStatus"
                value="풀이"
                checked={submissionStatus === "풀이"}
                onChange={(e) => {
                  console.log("[SubmissionStatus Changed] 풀이");
                  setSubmissionStatus(e.target.value);
                }}
              />
              풀이
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="submissionStatus"
                value="미풀이"
                checked={submissionStatus === "미풀이"}
                onChange={(e) => {
                  console.log("[SubmissionStatus Changed] 미풀이");
                  setSubmissionStatus(e.target.value);
                }}
              />
              미풀이
            </RadioLabel>
          </RadioGroup>
          <ResetButton
            onClick={() => {
              setSearchTerm("");
              setGrade("");
              setClassNum("");
              setSubmissionStatus("");
              setSortKey("");
              setSortOrder("asc");
              setFilteredItems(dummyItems);
            }}
          >
            초기화
          </ResetButton>
        </SectionContainer>
        <SectionContainer>
          <FilterLabel>Excel Download</FilterLabel>
          <ExcelButton
            onClick={() => {
              console.log("[Excel Download] Items:", filteredItems);
            }}
          >
            Excel Download
          </ExcelButton>
        </SectionContainer>
      </SearchFilterBox>
    </Content>
  );
}

const Content = styled.div`
  background-color: #e6e8ea;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  gap: 35px;
  padding: 35px 0px;
`;

const BoardContainer = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  flex-direction: column;

  width: 950px;
  min-height: 800px;
  height: auto;
`;

const BoardTitle = styled.h1`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #1e2124;
  margin-bottom: 50px;
`;

// --- 검색 및 필터 컴포넌트 스타일 ---
const SearchFilterBox = styled.div`
  width: 255px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionContainer = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 700;
  font-size: 23px;

  color: #1e2124;
  margin-bottom: 16px;
`;

const RadioGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 16px;
  margin-bottom: 16px;
`;

const RadioLabel = styled.label`
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 700;
  font-size: 16px;

  display: flex;
  align-items: center;
  color: #1e2124;
  cursor: pointer;

  input[type="radio"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 8px;
    position: relative;

    &:checked {
      border-color: #256ef4;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 9px;
        height: 9px;
        background-color: #256ef4;
        border-radius: 50%;
      }
    }
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #b1b8be;
  border-radius: 8px;
  padding: 0 12px;
  width: 235px;
  height: 45px;

  &:focus-within {
    border-color: #256ef4;
    box-shadow: 0 0 0 2px rgba(37, 110, 244, 0.2);
  }
`;

const SearchInput = styled.input`
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 400;
  font-size: 17px;
  cursor: text;

  width: 100%;
  border: none;
  outline: none;
  color: #6d7882;
  background-color: transparent;
`;

const SearchIconContainer = styled.span`
  margin-left: 8px;
  height: 25px;
  cursor: pointer;
`;

const FilterSelect = styled.select`
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 400;

  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 16px;
  color: #1e2124;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  &:focus {
    border-color: #256ef4;
    box-shadow: 0 0 0 2px rgba(37, 110, 244, 0.2);
    outline: none;
  }
`;

const FilterLabel = styled.label`
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: #1e2124;
  margin-bottom: 8px;
  margin-top: 15px;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ResetButton = styled(Button)`
  background-color: #fafafa;
  color: #0b50d0;
  border: 1px solid #b1b8be;
  margin-top: 16px;

  &:hover {
    background-color: #d8e5fd;
  }

  &:active {
    background-color: #b1cefb;
  }
`;

const ExcelButton = styled(Button)`
  background-color: #256ef4;
  color: #fafafa;
  margin-top: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0b50d0;
  }

  &:active {
    background-color: #083891;
  }
`;

export default List;
