import styled from "@emotion/styled";
import { Input } from "@khj/user-interfaces";
import { useState } from "react";
import * as XLSX from "xlsx";
import {
  bulkCreateStudents,
  createStudent,
  type BulkStudentItem,
} from "../apis/management";
import { useAuthStore } from "../store/authStore";

const ACCEPTED_EXTENSIONS = ["xlsx", "xls"];

const normalizeHeader = (value: string) =>
  value.toLowerCase().replace(/\s|_|-|\(|\)|\./g, "");

const findHeaderIndex = (headers: string[], candidates: string[]) => {
  const normalizedCandidates = candidates.map((candidate) =>
    normalizeHeader(candidate),
  );

  return headers.findIndex((header) =>
    normalizedCandidates.includes(normalizeHeader(header)),
  );
};

const parseStudentFile = async (file: File): Promise<BulkStudentItem[]> => {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ACCEPTED_EXTENSIONS.includes(extension)) {
    throw new Error("엑셀(.xlsx, .xls) 파일만 업로드할 수 있습니다.");
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new Error("시트가 비어있습니다. 양식 파일을 확인해주세요.");
  }

  const worksheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<(string | number | null)[]>(worksheet, {
    header: 1,
    raw: false,
    defval: "",
  });

  if (rows.length < 2) {
    throw new Error("등록할 학생 데이터가 없습니다.");
  }

  const headerRow = rows[0].map((cell) => String(cell).trim());

  const studentNumberIndex = findHeaderIndex(headerRow, [
    "studentNumber",
    "student_no",
    "학번",
  ]);
  const nameIndex = findHeaderIndex(headerRow, ["name", "이름"]);
  const bojIdIndex = findHeaderIndex(headerRow, ["bojId", "boj", "아이디"]);

  const hasAllHeaders =
    studentNumberIndex >= 0 && nameIndex >= 0 && bojIdIndex >= 0;

  if (!hasAllHeaders) {
    throw new Error(
      "학번, 이름, 아이디 열을 찾을 수 없습니다. 샘플 양식을 사용해주세요.",
    );
  }

  const parsed = rows
    .slice(1)
    .map((row) => {
      const studentNumber = String(row[studentNumberIndex]).trim();
      const name = String(row[nameIndex]).trim();
      const bojId = String(row[bojIdIndex]).trim();

      return {
        studentNumber,
        name,
        bojId,
      };
    })
    .filter(
      ({ studentNumber, name, bojId }) =>
        studentNumber.length > 0 || name.length > 0 || bojId.length > 0,
    );

  if (parsed.length === 0) {
    throw new Error("유효한 학생 데이터가 없습니다.");
  }

  const hasIncompleteRow = parsed.some(
    ({ studentNumber, name, bojId }) => !studentNumber || !name || !bojId,
  );

  if (hasIncompleteRow) {
    throw new Error(
      "학번, 이름, 아이디 값이 모두 채워진 행만 등록할 수 있습니다.",
    );
  }

  return parsed;
};

export default function AddStudent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [studentNumber, setStudentNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [bojId, setBojId] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const accessToken = useAuthStore((state) => state.accessToken);

  const hasTextInput =
    !selectedFile &&
    (studentNumber.trim().length > 0 ||
      studentName.trim().length > 0 ||
      bojId.trim().length > 0);
  const isFileMode = Boolean(selectedFile);
  const isManualMode = hasTextInput;
  const isFileUploadDisabled = isManualMode || isSubmitting;
  const isManualInputDisabled = isFileMode || isSubmitting;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFileUploadDisabled) {
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setStatusMessage(null);
      setStatusType("success");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (isFileUploadDisabled) {
      return;
    }

    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (isFileUploadDisabled) {
      return;
    }

    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setStatusMessage(null);
      setStatusType("success");
    }
  };

  const handleSubmit = async () => {
    if (!accessToken) {
      setStatusType("error");
      setStatusMessage("로그인 정보가 없습니다. 다시 로그인 후 시도해주세요.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      if (isFileMode) {
        const file = selectedFile;
        if (!file) {
          setStatusType("error");
          setStatusMessage("업로드할 파일을 먼저 선택해주세요.");
          return;
        }

        const students = await parseStudentFile(file);
        const result = await bulkCreateStudents({ students }, accessToken);

        setStatusType("success");
        setStatusMessage(
          `${result.created.length}명의 학생이 등록되었습니다. (${file.name})`,
        );
        setSelectedFile(null);
        return;
      }

      if (isManualMode) {
        const trimmedStudentNumber = studentNumber.trim();
        const trimmedName = studentName.trim();
        const trimmedBojId = bojId.trim();

        if (!trimmedStudentNumber || !trimmedName || !trimmedBojId) {
          setStatusType("error");
          setStatusMessage("학번, 이름, 아이디를 모두 입력해주세요.");
          return;
        }

        const created = await createStudent(
          {
            studentNumber: trimmedStudentNumber,
            name: trimmedName,
            bojId: trimmedBojId,
          },
          accessToken,
        );

        setStatusType("success");
        setStatusMessage(
          `${created.name}(${created.studentNumber}) 학생이 등록되었습니다.`,
        );
        setStudentNumber("");
        setStudentName("");
        setBojId("");
        setSelectedFile(null);
        return;
      }

      setStatusType("error");
      setStatusMessage("입력칸을 채우거나 업로드할 파일을 먼저 선택해주세요.");
      return;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "학생 등록 중 오류가 발생했습니다.";
      setStatusType("error");
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>학생등록</Title>

      <TextRecordArea>
        <Input
          name="학번"
          next="을"
          width="180px"
          height="80px"
          value={studentNumber}
          disabled={isManualInputDisabled}
          onChange={(e) => {
            setStudentNumber(e.target.value);
            setStatusMessage(null);
            setStatusType("success");
          }}
        />
        <Input
          name="이름"
          next="을"
          width="180px"
          height="80px"
          value={studentName}
          disabled={isManualInputDisabled}
          onChange={(e) => {
            setStudentName(e.target.value);
            setStatusMessage(null);
            setStatusType("success");
          }}
        />
        <Input
          name="아이디"
          next="를"
          width="230px"
          height="80px"
          value={bojId}
          disabled={isManualInputDisabled}
          onChange={(e) => {
            setBojId(e.target.value);
            setStatusMessage(null);
            setStatusType("success");
          }}
        />
      </TextRecordArea>

      <Divider>
        <span>또는</span>
      </Divider>

      {/* 파일 업로드 영역 */}
      <UploadBox
        isSelected={selectedFile !== null}
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!selectedFile ? (
          <UploadArea>
            <UploadText>
              첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 클릭해주세요.
              <br />
              엑셀 파일의 서식은
              <DownloadLink href="/sample.xlsx" download>
                이곳을 클릭해 다운받으세요.
              </DownloadLink>
            </UploadText>
            <FileInput
              type="file"
              id="file-upload"
              accept=".xlsx,.xls"
              disabled={isFileUploadDisabled}
              onChange={handleFileChange}
            />
            <FileButton disabled={isFileUploadDisabled} htmlFor="file-upload">
              파일선택
            </FileButton>
          </UploadArea>
        ) : (
          <FileDetails>
            <span>{`${selectedFile.name} [${(selectedFile.size / 1024).toFixed(2)}KB]`}</span>
            <DeleteButton
              onClick={() => {
                setSelectedFile(null);
                setStatusMessage(null);
                setStatusType("success");
              }}
            >
              삭제
            </DeleteButton>
          </FileDetails>
        )}
      </UploadBox>

      {statusMessage && (
        <StatusMessage isError={statusType === "error"}>
          {statusMessage}
        </StatusMessage>
      )}

      <ButtonArea>
        <CancelButton>취소하기</CancelButton>
        <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "등록중..." : "등록하기"}
        </SubmitButton>
      </ButtonArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 760px;
  min-height: 560px;
  height: auto;
  margin: 44px auto;
  padding: 36px 18px;
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid #b1b8be;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.08),
    0px 8px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;

  @media (max-width: 1200px) {
    max-width: 700px;
  }

  @media (max-width: 768px) {
    margin: 40px auto;
    padding: 30px 16px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    margin: 20px auto;
    padding: 20px 12px;
    max-width: calc(100% - 24px);
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const TextRecordArea = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
`;

const Divider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 36px 0;
  padding: 0 45px;
  color: #8a949e;
  box-sizing: border-box;

  span {
    padding: 0 16px;
    font-size: 18px;
    font-weight: 600;
    background: #ffffff;
    z-index: 1;
  }

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 2px;
    background: #c9ced3;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 30px 0;

    span {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    padding: 0 16px;
    margin: 20px 0;

    span {
      font-size: 14px;
    }
  }
`;

const UploadBox = styled.div<{ isSelected: boolean; isDragging: boolean }>`
  width: 100%;
  max-width: 620px;
  height: 148px;
  background: ${({ isSelected, isDragging }) =>
    isDragging ? "#e5e8e9" : isSelected ? "#ffffff" : "#f2f4f6"};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border: ${({ isDragging }) => (isDragging ? "2px dashed #256ef4" : "none")};
  transition:
    background-color 0.3s ease,
    border 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 140px;
    padding: 15px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    min-height: 120px;
  }
`;

const UploadText = styled.p`
  font-size: 16px;
  color: #5f6b76;
  margin-right: 20px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-right: 0;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const FileButton = styled.label<{ disabled?: boolean }>`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: ${({ disabled }) => (disabled ? "#8fb3f8" : "#256ef4")};
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const UploadArea = styled.div`
  width: 100%;
  max-width: 620px;
  height: 140px;

  background: #f2f4f6;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: auto;
    min-height: 120px;
    padding: 15px;
    gap: 16px;
  }

  @media (max-width: 480px) {
    min-height: 100px;
    padding: 12px;
    gap: 12px;
  }
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 620px;
  font-size: 14px;
  border: 1px solid #b1b8be;
  padding: 14px 22px;
  border-radius: 9px;
  color: #5f6b76;
  box-sizing: border-box;

  span {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    font-size: 13px;
    padding: 12px 16px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px 12px;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  color: #ff4d4f;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 44px;
  align-self: stretch;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-self: center;
    margin-top: 40px;
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
    gap: 10px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const BaseActionButton = styled.button`
  min-height: 44px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  padding: 0 18px;
  min-width: 110px;
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

const CancelButton = styled(BaseActionButton)`
  background: #8a949e;
`;

const SubmitButton = styled(BaseActionButton)`
  background: #256ef4;
  font-weight: 500;

  &:disabled {
    background: #8fb3f8;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p<{ isError: boolean }>`
  margin-top: 12px;
  width: 100%;
  max-width: 700px;
  padding: 10px 14px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ isError }) => (isError ? "#b42318" : "#475467")};
  background: ${({ isError }) =>
    isError ? "rgba(217, 45, 32, 0.12)" : "transparent"};
  border: ${({ isError }) =>
    isError ? "1px solid rgba(217, 45, 32, 0.35)" : "none"};

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

const DownloadLink = styled.a`
  color: #256ef4;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: none;
  }
`;
