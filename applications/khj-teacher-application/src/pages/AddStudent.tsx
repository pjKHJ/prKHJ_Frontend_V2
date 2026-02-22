import styled from "@emotion/styled";
import { Input } from "@khj/user-interfaces";
import { useState } from "react";

export default function AddStudent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true); // 드래그 중 상태로 설정
  };

  const handleDragLeave = () => {
    setIsDragging(false); // 드래그 종료 시 상태를 초기화
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false); // 드래그 종료 시 상태를 초기화
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file); // 드래그 앤 드롭한 파일을 상태에 저장
    }
  };

  return (
    <Container>
      <Title>학생등록</Title>

      <TextRecordArea>
        <Input name="학번" width="210px" height="80px" />
        <Input name="이름" width="210px" height="80px" />
        <Input name="아이디" width="280px" height="80px" />
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
              onChange={handleFileChange}
            />
            <FileButton htmlFor="file-upload">파일선택</FileButton>
          </UploadArea>
        ) : (
          <FileDetails>
            <span>{`${selectedFile.name} [${(selectedFile.size / 1024).toFixed(2)}KB]`}</span>
            <DeleteButton onClick={() => setSelectedFile(null)}>
              삭제
            </DeleteButton>
          </FileDetails>
        )}
      </UploadBox>

      <ButtonArea>
        <CancelButton>취소하기</CancelButton>
        <SubmitButton>등록하기</SubmitButton>
      </ButtonArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 70px auto;
  padding: 50px 0;

  width: 900px;
  height: 700px;

  background: #ffffff;
  border: 1px solid #b1b8be;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.08),
    0px 8px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const TextRecordArea = styled.div`
  display: flex;
  gap: 30px;
`;

const Divider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 50px 0;
  padding: 0 45px;
  color: #8a949e;

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
`;

const UploadBox = styled.div<{ isSelected: boolean; isDragging: boolean }>`
  width: 700px;
  height: 160px;
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
`;

const UploadText = styled.p`
  font-size: 16px;
  color: #5f6b76;
  margin-right: 20px;
`;

const FileButton = styled.label`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: #256ef4;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const UploadArea = styled.div`
  width: 700px;
  height: 150px;

  background: #f2f4f6;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  border: 1px solid #b1b8be;
  padding: 14px 22px;
  border-radius: 9px;
  color: #5f6b76;

  span {
    font-weight: 600;
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
  gap: 16px;
  margin-top: 80px;
  align-self: flex-end;
  padding-right: 60px;
`;

const FileInput = styled.input`
  display: none;
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

const DownloadLink = styled.a`
  color: #256ef4;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: none;
  }
`;
