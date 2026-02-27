import styled from "@emotion/styled";
import { useState } from "react";

export default function DeleteStudent() {
  const [searchType, setSearchType] = useState<"학번" | "이름">("학번");
  const [searchValue, setSearchValue] = useState("");

  return (
    <PageWrapper>
      <Container>
        <Title>학생삭제</Title>

        {/* 라디오 버튼 영역 */}
        <SearchType>
          <RadioLabel>
            <RadioInput
              type="radio"
              name="searchType"
              checked={searchType === "학번"}
              onChange={() => setSearchType("학번")}
            />
            학번
          </RadioLabel>
          <RadioLabel>
            <RadioInput
              type="radio"
              name="searchType"
              checked={searchType === "이름"}
              onChange={() => setSearchType("이름")}
            />
            이름
          </RadioLabel>
        </SearchType>

        {/* 검색 입력 영역 */}
        <InputWrapper>
          <SearchInput
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="내용을 입력하세요"
          />
          <SearchButton type="button" aria-label="검색"></SearchButton>
        </InputWrapper>

        {/* 검색 결과 없음 안내 */}
        <InfoBox>
          <InfoHeader>
            <InfoTitle>검색 결과가 없습니다</InfoTitle>
          </InfoHeader>
          <InfoDescription>
            내용을 입력했는데 결과가 나오지 않는다면,
          </InfoDescription>
          <Divider />
          <InfoList>
            <InfoListItem>
              <span>-</span>
              <span>검색 내용을 확인해 주세요</span>
            </InfoListItem>
            <InfoListItem>
              <span>-</span>
              <span>검색내용과 선택한 형식이 일치하는지 확인해 주세요</span>
            </InfoListItem>
          </InfoList>
        </InfoBox>

        {/* 버튼 영역 */}
        <ButtonArea>
          <CancelButton>취소하기</CancelButton>
          <SubmitButton>삭제하기</SubmitButton>
        </ButtonArea>
      </Container>
    </PageWrapper>
  );
}

// ── 스타일링 ──

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);  
  padding: 64px 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 520px;
  padding: 48px;
  background: #ffffff;
  border: 1px solid #b1b8be;
  border-radius: 12px;
  box-shadow:
    0 0 2px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.12);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
  text-align: center;
`;

const SearchType = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #5f6b76;
  cursor: pointer;
`;

const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #3b5bdb;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 48px 0 16px;
  border: 1px solid #d0d5da;
  border-radius: 8px;
  background: #ffffff;
  font-size: 15px;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &::placeholder {
    color: #a0a8b0;
  }

  &:focus {
    border-color: #3b5bdb;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #a0a8b0;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #5f6b76;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 20px;
  background: #eef3fc;
  border: 1px solid #d0dff8;
  border-radius: 8px;
  margin-bottom: 32px;
  box-sizing: border-box;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const InfoTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
`;

const InfoDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #5f6b76;
  margin: 0 0 12px 0;
`;

const Divider = styled.div`
  border-top: 1px dashed #c0ccdb;
  margin-bottom: 12px;
`;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 14px;
  line-height: 1.6;
  color: #5f6b76;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.button`
  width: 110px;
  height: 44px;
  background: #8a949e;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 110px;
  height: 44px;
  background: #256ef4;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
