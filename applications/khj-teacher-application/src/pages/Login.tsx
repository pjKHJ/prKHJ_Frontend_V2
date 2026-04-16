import styled from "@emotion/styled";
import { useState } from "react";
import { Input } from "@khj/user-interfaces";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginRequest, type LoginResponse } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState(
    () => localStorage.getItem("savedEmail") || "",
  );
  const [password, setPassword] = useState("");

  const [saveEmail, setSaveEmail] = useState(
    !!localStorage.getItem("savedEmail"),
  );

  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.accessToken);
      localStorage.setItem("currentUserId", email);

      if (saveEmail) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
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
      userName: email,
      password: password,
    });
  };

  return (
    <Container>
      <TextContainer>
        <h1>Daedeok Software Coding Test System 로그인</h1>
        <p>아이디/비밀번호 로그인</p>
      </TextContainer>
      <InputContainer onSubmit={handleLogin}>
        <Input
          name="아이디"
          width="400px"
          height="87px"
          value={email}
          next="을"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="비밀번호"
          width="400px"
          height="87px"
          type="password"
          value={password}
          next="를"
          onChange={(e) => setPassword(e.target.value)}
        />
        <SaveEmailContainer>
          <SaveEmailCheckbox
            type="checkbox"
            checked={saveEmail}
            onChange={(e) => setSaveEmail(e.target.checked)}
          />
          <span>아이디 저장</span>
        </SaveEmailContainer>
        <LoginButton type="submit" disabled={isPending}>
          {isPending ? "로그인 중..." : "로그인"}
        </LoginButton>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 93px auto;

  width: 640px;
  height: 720px;

  background: #ffffff;
  border: 1px solid #b1b8be;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.08),
    0px 8px 16px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;

  h1 {
    width: 650px;
    height: 23px;

    font-family: "Pretendard GOV";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
    text-align: center;

    color: #464c53;
  }
  p {
    width: 650px;
    height: 60px;

    font-family: "Pretendard GOV";
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 150%;
    text-align: center;
    letter-spacing: 1px;

    color: #1e2124;
  }
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 24px;
  margin-top: 60px;

  width: 400px;
  height: 348px;

  border-bottom: 1px solid #8a949e;
`;

const SaveEmailContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 320px;
  height: 26px;
`;

const SaveEmailCheckbox = styled.input`
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

  width: 400px;
  min-width: 90px;
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
`;
