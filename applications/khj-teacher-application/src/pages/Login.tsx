import styled from "@emotion/styled";
import { useState } from "react";
import { Input } from "@khj/user-interfaces";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginRequest, type LoginResponse } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

export default function Login() {
  const [Id, setId] = useState(() => localStorage.getItem("savedId") || "");
  const [password, setPassword] = useState("");

  const [saveId, setSaveId] = useState(!!localStorage.getItem("savedId"));

  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.accessToken);
      localStorage.setItem("currentUserId", Id);

      if (saveId) {
        localStorage.setItem("savedId", Id);
      } else {
        localStorage.removeItem("savedId");
      }
      console.log("로그인 성공:", data);
      navigate("/list");
    },
    onError: (error) => {
      let errorMessage = "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";

      if (axios.isAxiosError(error)) {
        const code = error.response?.data?.code;
        switch (code) {
          case "USR_400":
            errorMessage = "잘못된 요청입니다. 입력값을 확인해주세요.";
            break;
          case "USR_401":
            errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
            break;
          case "USR_404":
            errorMessage = "존재하지 않는 유저입니다.";
            break;
          default:
            break;
        }
      }
      console.error("로그인 실패:", error);
      alert(errorMessage);
    },
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutate({
      userName: Id,
      password: password,
    });
  };

  return (
    <PageWrapper>
      <Container>
        <TextContainer>
          <h1>Daedeok Software Coding Test System 로그인</h1>
          <p>아이디/비밀번호 로그인</p>
        </TextContainer>
        <InputContainer onSubmit={handleLogin}>
          <Input
            name="아이디"
            width="100%"
            height="87px"
            value={Id}
            next="을"
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            name="비밀번호"
            width="100%"
            height="87px"
            type="password"
            value={password}
            next="를"
            onChange={(e) => setPassword(e.target.value)}
          />
          <SaveIdContainer>
            <SaveIdCheckbox
              type="checkbox"
              checked={saveId}
              onChange={(e) => setSaveId(e.target.checked)}
            />
            <span>아이디 저장</span>
          </SaveIdContainer>
          <LoginButton type="submit" disabled={isPending}>
            {isPending ? "로그인 중..." : "로그인"}
          </LoginButton>
        </InputContainer>
      </Container>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 180px);
  padding: 24px 12px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-height: calc(100vh - 150px);
    padding: 20px 12px;
  }

  @media (max-width: 480px) {
    min-height: calc(100vh - 130px);
    padding: 16px 12px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 18px;
  margin: 0;

  width: min(100%, 560px);
  min-height: 620px;
  height: auto;
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid #b1b8be;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.08),
    0px 8px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;

  @media (max-width: 768px) {
    padding: 24px 14px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 18px 12px;
    max-width: calc(100% - 24px);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;

  h1 {
    width: 100%;
    height: auto;

    font-family: "Pretendard GOV";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
    text-align: center;

    color: #464c53;
  }
  p {
    width: 100%;
    height: auto;
    margin: 0;
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 150%;
    text-align: center;
    letter-spacing: 1px;

    color: #1e2124;
  }

  @media (max-width: 768px) {
    gap: 8px;

    p {
      font-size: 28px;
    }
  }

  @media (max-width: 480px) {
    p {
      font-size: 22px;
      letter-spacing: 0;
    }
  }
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  gap: 24px;
  margin-top: 30px;

  width: 100%;
  max-width: 400px;
  height: auto;

  border-bottom: 1px solid #8a949e;

  @media (max-width: 768px) {
    margin-top: 24px;
    padding: 12px 0;
    gap: 18px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
    padding: 8px 0;
    gap: 14px;
  }
`;

const SaveIdContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 100%;
  height: 26px;

  span {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    height: 24px;

    span {
      font-size: 13px;
    }
  }
`;

const SaveIdCheckbox = styled.input`
  display: flex;
  padding: 2px;

  width: 20px;
  height: 20px;

  background: #ffffff;
  border: 1px solid #58616a;
  border-radius: 4px;

  cursor: pointer;
`;

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  gap: 4px;

  width: 100%;
  max-width: 400px;
  min-width: 90px;
  min-height: 44px;
  height: 56px;

  border: none;
  background: #256ef4;
  border-radius: 8px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 150%;

  color: #ffffff;

  cursor: pointer;

  @media (max-width: 768px) {
    height: 48px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    height: 44px;
    font-size: 14px;
  }
`;
