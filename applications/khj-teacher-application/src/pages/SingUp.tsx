import styled from "@emotion/styled";
import { useState } from "react";
import { Input } from "@khj/user-interfaces";
import { useMutation } from "@tanstack/react-query";
import { signUp, type SignUpRequest } from "../apis/auth";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");

  const { mutate: signUpMutate } = useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: (data) => {
      console.log("회원가입 성공:", data);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUpMutate({
      userName: userId,
      password: password,
      signupCode: signupCode,
    });
  };

  return (
    <Container>
      <TextContainer>
        <h1>회원가입</h1>
      </TextContainer>
      <InputContainer onSubmit={handleSignUp}>
        <Input
          name="이름"
          width="400px"
          height="87px"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          name="이메일"
          width="400px"
          height="87px"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          name="비밀번호"
          width="400px"
          height="87px"
          type="password"
          value={signupCode}
          onChange={(e) => setSignupCode(e.target.value)}
        />
        <LoginButton>회원가입</LoginButton>
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
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  gap: 32px;
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

  margin-top: -8px;

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
`;
