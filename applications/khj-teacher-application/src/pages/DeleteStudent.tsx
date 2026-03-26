import styled from "@emotion/styled";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteStudents, type ErrorResponse } from "../apis/management";
import { useAuthStore } from "../store/authStore";

type InfoVariant = "info" | "success" | "error";

interface InfoState {
  variant: InfoVariant;
  title: string;
  lines: string[];
}

const defaultInfo: InfoState = {
  variant: "info",
  title: "삭제할 학번을 입력하세요",
  lines: [
    "쉼표(,)나 공백으로 여러 학번을 한 번에 보낼 수 있습니다.",
    "삭제 API는 학번(ID) 배열만 받습니다.",
  ],
};

const errorMessages: Record<string, InfoState> = {
  GLB_400: {
    variant: "error",
    title: "잘못된 요청입니다",
    lines: ["학번 형식을 다시 확인해 주세요."],
  },
  GLB_500: {
    variant: "error",
    title: "서버 오류가 발생했습니다",
    lines: ["잠시 후 다시 시도해 주세요."],
  },
  GLB_403: {
    variant: "error",
    title: "권한이 없습니다",
    lines: ["다시 로그인 후 시도해 주세요."],
  },
  STD_400_03: {
    variant: "error",
    title: "잘못된 학생 삭제 요청입니다",
    lines: ["이미 삭제된 학번이 포함됐는지 확인해 주세요."],
  },
};

const parseIds = (raw: string): number[] => {
  const parts = raw
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value > 0);

  return Array.from(new Set(parts));
};

export default function DeleteStudent() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<"학번" | "이름">("학번");
  const [searchValue, setSearchValue] = useState("");
  const [info, setInfo] = useState<InfoState>(defaultInfo);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: (ids: number[]) => deleteStudents(ids, accessToken),
    onSuccess: (data) => {
      setInfo({
        variant: "success",
        title: "삭제를 완료했습니다",
        lines: [
          data.deletedIds.length
            ? `삭제된 학생 ID: ${data.deletedIds.join(", ")}`
            : "삭제된 학생이 없습니다.",
        ],
      });
      setSearchValue("");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const code = (error.response?.data as ErrorResponse | undefined)?.code;
        const mapped = code ? errorMessages[code] : undefined;

        if (code === "GLB_403") {
          logout();
          navigate("/login");
        }

        setInfo(
          mapped ?? {
            variant: "error",
            title: "삭제에 실패했습니다",
            lines: ["잠시 후 다시 시도해 주세요."],
          },
        );
        return;
      }

      if (
        error instanceof Error &&
        error.message === "AUTHORIZATION_TOKEN_MISSING"
      ) {
        setInfo({
          variant: "error",
          title: "로그인이 필요합니다",
          lines: ["다시 로그인해 주세요."],
        });
        logout();
        navigate("/login");
        return;
      }

      setInfo({
        variant: "error",
        title: "알 수 없는 오류가 발생했습니다",
        lines: ["잠시 후 다시 시도해 주세요."],
      });
    },
  });

  const handleDelete = () => {
    if (searchType === "이름") {
      setInfo({
        variant: "error",
        title: "삭제는 학번(ID)으로만 요청할 수 있습니다",
        lines: ["학번을 선택한 뒤 숫자만 입력해 주세요."],
      });
      return;
    }

    const ids = parseIds(searchValue);

    if (ids.length === 0) {
      setInfo({
        variant: "error",
        title: "삭제할 학번을 입력해 주세요",
        lines: ["쉼표나 공백으로 여러 건을 구분할 수 있습니다."],
      });
      return;
    }

    deleteMutate(ids);
  };

  const handleReset = () => {
    setSearchValue("");
    setSearchType("학번");
    setInfo(defaultInfo);
  };

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
            placeholder={
              searchType === "학번"
                ? "삭제할 학번을 쉼표/공백으로 구분해 입력하세요"
                : "이름 검색은 지원하지 않습니다"
            }
          />
          <SearchButton
            type="button"
            aria-label="검색"
            onClick={handleDelete}
            disabled={isPending}
          ></SearchButton>
        </InputWrapper>

        {/* 상태 안내 */}
        <InfoBox variant={info.variant}>
          <InfoHeader>
            <InfoTitle>{info.title}</InfoTitle>
          </InfoHeader>
          <InfoDescription>
            <InfoList>
              {info.lines.map((line) => (
                <InfoListItem key={line}>
                  <span>-</span>
                  <span>{line}</span>
                </InfoListItem>
              ))}
            </InfoList>
          </InfoDescription>
        </InfoBox>

        {/* 버튼 영역 */}
        <ButtonArea>
          <CancelButton
            type="button"
            onClick={handleReset}
            disabled={isPending}
          >
            취소하기
          </CancelButton>
          <SubmitButton
            type="button"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "삭제 중..." : "삭제하기"}
          </SubmitButton>
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

const InfoBox = styled.div<{ variant: InfoVariant }>`
  width: 100%;
  padding: 20px;
  background: ${({ variant }) =>
    variant === "success"
      ? "#e7f4ec"
      : variant === "error"
        ? "#fff4f4"
        : "#eef3fc"};
  border: 1px solid
    ${({ variant }) =>
      variant === "success"
        ? "#b7e0c6"
        : variant === "error"
          ? "#f5c2c7"
          : "#d0dff8"};
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

const InfoDescription = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #5f6b76;
  margin: 0;
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

const CancelButton = styled.button<{ disabled?: boolean }>`
  width: 110px;
  height: 44px;
  background: #8a949e;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 110px;
  height: 44px;
  background: #256ef4;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
