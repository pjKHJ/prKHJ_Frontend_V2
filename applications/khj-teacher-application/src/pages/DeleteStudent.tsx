import styled from "@emotion/styled";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteStudents,
  getManagementStudents,
  type ErrorResponse,
} from "../apis/management";
import { useAuthStore } from "../store/authStore";

type InfoVariant = "info" | "success" | "error";

interface InfoState {
  variant: InfoVariant;
  title: string;
  lines: string[];
}

const defaultInfo: InfoState = {
  variant: "info",
  title: "학생을 선택해 삭제할 수 있습니다",
  lines: [
    "목록에서 학번 또는 이름으로 검색하세요.",
    "삭제할 학생을 체크한 뒤 삭제하기를 누르세요.",
  ],
};

const errorMessages: Record<string, InfoState> = {
  GLB_400: {
    variant: "error",
    title: "잘못된 요청입니다",
    lines: ["요청 데이터를 다시 확인해 주세요."],
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
    lines: ["이미 삭제된 학생이 포함됐는지 확인해 주세요."],
  },
};

const toErrorInfo = (fallbackTitle: string): InfoState => ({
  variant: "error",
  title: fallbackTitle,
  lines: ["잠시 후 다시 시도해 주세요."],
});

const detectSearchType = (input: string): "학번" | "이름" => {
  const trimmed = input.trim();
  if (!trimmed) return "학번";
  if (/^[\d\s,]*$/.test(trimmed)) {
    return "학번";
  }
  return "이름";
};

export default function DeleteStudent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [info, setInfo] = useState<InfoState>(defaultInfo);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  const searchType = detectSearchType(searchValue);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["managementStudents"],
    queryFn: () => getManagementStudents(accessToken),
    enabled: !!accessToken,
  });

  const students = data?.students ?? [];

  const filteredStudents = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) {
      return students;
    }

    if (searchType === "학번") {
      return students.filter((student) =>
        student.studentNumber.toLowerCase().includes(keyword),
      );
    }

    return students.filter((student) =>
      student.name.toLowerCase().includes(keyword),
    );
  }, [searchType, searchValue, students]);

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: (ids: number[]) => deleteStudents(ids, accessToken),
    onSuccess: (response) => {
      const deletedCount = response.deletedIds.length;
      setInfo({
        variant: "success",
        title: "삭제를 완료했습니다",
        lines: [
          deletedCount > 0
            ? `${deletedCount}명의 학생을 삭제했습니다.`
            : "삭제된 학생이 없습니다.",
        ],
      });
      setSelectedIds([]);
      void queryClient.invalidateQueries({ queryKey: ["managementStudents"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const code = (error.response?.data as ErrorResponse | undefined)?.code;
        const mapped = code ? errorMessages[code] : undefined;

        if (code === "GLB_403") {
          logout();
          navigate("/login");
        }

        setInfo(mapped ?? toErrorInfo("삭제에 실패했습니다"));
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

      setInfo(toErrorInfo("알 수 없는 오류가 발생했습니다"));
    },
  });

  const toggleStudent = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((target) => target !== id)
        : [...prev, id],
    );
  };

  const toggleAllFiltered = (checked: boolean) => {
    if (!checked) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(filteredStudents.map((student) => student.id));
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      setInfo({
        variant: "error",
        title: "삭제할 학생을 선택해 주세요",
        lines: ["목록 왼쪽 체크박스를 클릭해 학생을 선택하세요."],
      });
      return;
    }

    deleteMutate(selectedIds);
  };

  const handleReset = () => {
    setSearchValue("");
    setSelectedIds([]);
    setInfo(defaultInfo);
  };

  const allChecked =
    filteredStudents.length > 0 &&
    filteredStudents.every((student) => selectedIds.includes(student.id));

  return (
    <PageWrapper>
      <Container>
        <Title>학생삭제</Title>

        <InputWrapper>
          <SearchInput
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="학번 또는 이름으로 검색하세요"
          />
        </InputWrapper>

        <ListHeader>
          <CountText>총 {filteredStudents.length}명</CountText>
          <SelectAllLabel>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={(e) => toggleAllFiltered(e.target.checked)}
              disabled={filteredStudents.length === 0 || isPending}
            />
            전체선택
          </SelectAllLabel>
        </ListHeader>

        <ListBox>
          {isLoading || isFetching ? (
            <ListMessage>학생 목록을 불러오는 중입니다...</ListMessage>
          ) : null}

          {!isLoading && !isFetching && isError ? (
            <ListMessage>
              학생 목록을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.
            </ListMessage>
          ) : null}

          {!isLoading &&
          !isFetching &&
          !isError &&
          filteredStudents.length === 0 ? (
            <ListMessage>검색 결과가 없습니다.</ListMessage>
          ) : null}

          {!isLoading &&
            !isFetching &&
            !isError &&
            filteredStudents.map((student) => (
              <StudentRow key={student.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(student.id)}
                  onChange={() => toggleStudent(student.id)}
                  disabled={isPending}
                />
                <StudentMeta>
                  <StudentLine>
                    {student.studentNumber} | {student.name}
                  </StudentLine>
                  <BojId>@{student.bojId}</BojId>
                </StudentMeta>
              </StudentRow>
            ))}
        </ListBox>

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

        <ButtonArea>
          <CancelButton
            type="button"
            onClick={handleReset}
            disabled={isPending}
          >
            취소하기
          </CancelButton>
          <ReloadButton
            type="button"
            onClick={() => void refetch()}
            disabled={isPending}
          >
            새로고침
          </ReloadButton>
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

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
  padding: 36px 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 560px;
  padding: 34px 18px;
  background: #ffffff;
  border: 1px solid #b1b8be;
  border-radius: 12px;
  box-shadow:
    0 0 2px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;

  @media (max-width: 1200px) {
    max-width: 520px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 32px 16px;
    margin: 20px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 20px 12px;
    margin: 10px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 26px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
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

  @media (max-width: 768px) {
    height: 44px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    height: 40px;
    font-size: 13px;
  }
`;

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CountText = styled.span`
  color: #5f6b76;
  font-size: 14px;
  font-weight: 600;
`;

const SelectAllLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #5f6b76;
`;

const ListBox = styled.div`
  width: 100%;
  min-height: 220px;
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid #d0d5da;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 8px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-height: 300px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    min-height: 180px;
    max-height: 250px;
    margin-bottom: 12px;
    padding: 6px;
  }
`;

const StudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 8px;
  border-radius: 8px;

  &:hover {
    background: #f8fafc;
  }
`;

const StudentMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StudentLine = styled.span`
  font-size: 14px;
  color: #344054;
  font-weight: 600;
`;

const BojId = styled.span`
  font-size: 13px;
  color: #667085;
`;

const ListMessage = styled.p`
  font-size: 14px;
  color: #667085;
  text-align: center;
  margin: 12px 0;
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
  margin-bottom: 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin-bottom: 12px;
  }
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
  gap: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: stretch;
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const BaseButton = styled.button<{ disabled?: boolean }>`
  min-height: 44px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  padding: 0 18px;
  min-width: 110px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-height: 42px;
    font-size: 13px;
    padding: 0 16px;
    flex: 1;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-height: 44px;
    font-size: 14px;
    padding: 0 14px;
    flex: none;
  }
`;

const CancelButton = styled(BaseButton)`
  background: #8a949e;
`;

const ReloadButton = styled(BaseButton)`
  background: #4b5563;
`;

const SubmitButton = styled(BaseButton)`
  background: #256ef4;
  font-weight: 600;
`;
