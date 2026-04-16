import styled from "@emotion/styled";
import { useState } from "react";
import { Input } from "@khj/user-interfaces";
import { useMutation } from "@tanstack/react-query";
import { signUp, type SignUpRequest, type SignUpResponse } from "../apis/auth";
import axios from "axios";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");

  const { mutate: signUpMutate, isPending } = useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: (data: SignUpResponse) => {
      console.log("회원가입 성공:", data);
      location.href = "/login";
    },
    onError: (error) => {
      let errorMessage = "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";

      if (axios.isAxiosError(error)) {
        const code = error.response?.data?.code;
        switch (code) {
          case "USR_401":
            errorMessage = "이름 또는 비밀번호가 올바르지 않습니다.";
            break;
          case "USR_404":
            errorMessage = "존재하지 않는 유저입니다.";
            break;
          case "USR_409":
            errorMessage = "이미 가입된 이름입니다.";
            break;
          case "USR_400":
            errorMessage = "인증 코드가 올바르지 않습니다.";
            break;
          default:
            break;
        }
      }

      console.error("회원가입 실패:", error);
      alert(errorMessage);
    },
  });

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("회원가입 버튼 눌림");

    const normalizedUserId = userId.trim();
    const normalizedSignupCode = signupCode.trim();
    console.log(
      `현재 입력값 - ID: ${normalizedUserId}, PW: ${password}, CODE: ${normalizedSignupCode}`,
    );

    if (!normalizedUserId || !password || !normalizedSignupCode) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    signUpMutate({
      userName: normalizedUserId,
      password: password,
      signupCode: normalizedSignupCode,
    });
  };

  return (
    <Container>
      <TextContainer>
        <h1>회원가입</h1>
      </TextContainer>
      <InputContainer onSubmit={handleSignUp}>
        <Input
          name="아이디"
          width="400px"
          height="87px"
          value={userId}
          next="를"
          onChange={(e) => setUserId(e.target.value)}
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
        <Input
          name="인증코드"
          next="를"
          width="400px"
          height="87px"
          value={signupCode}
          onChange={(e) => setSignupCode(e.target.value)}
        />
        <LoginButton type="submit" disabled={isPending}>
          {isPending ? "회원가입 중..." : "회원가입"}
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
  margin: 83px auto;

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
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 650px;
  height: 60px;
  h1 {
    font-size: 40px;
    line-height: 150%;
  }
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  gap: 24px;
  margin-top: 30px;

  width: 400px;
  height: 445px;

  border-bottom: 1px solid #8a949e;
`;

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  gap: 4px;

  margin-top: 20px;

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
