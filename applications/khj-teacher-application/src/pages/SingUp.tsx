import styled from "@emotion/styled";
import { useState } from "react";
import { Input } from "@khj/user-interfaces";
import { useMutation } from "@tanstack/react-query";
import { signUp, type SignUpRequest, type SignUpResponse } from "../apis/auth";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");

  const { mutate: signUpMutate } = useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
    onSuccess: (data: SignUpResponse) => {
      console.log("회원가입 성공:", data);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedUserId = userId.trim();
    const normalizedSignupCode = signupCode.trim();

    if (!normalizedUserId || !password || !normalizedSignupCode) {
      return;
    }

    signUpMutate({
      userName: normalizedUserId,
      password: password,
      signupCode: normalizedSignupCode,
    });
  };

  return (
    <PageWrapper>
      <Container>
        <TextContainer>
          <h1>회원가입</h1>
        </TextContainer>
        <InputContainer onSubmit={handleSignUp}>
          <Input
            name="아이디"
            width="100%"
            height="87px"
            value={userId}
            next="를"
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            name="인증코드"
            next="를"
            width="100%"
            height="87px"
            value={signupCode}
            onChange={(e) => setSignupCode(e.target.value)}
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
          <LoginButton>회원가입</LoginButton>
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
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 100%;
  height: auto;

  h1 {
    margin: 0;
    font-size: 34px;
    line-height: 150%;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 28px;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 22px;
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
    gap: 18px;
    margin-top: 24px;
    padding: 12px 0;
  }

  @media (max-width: 480px) {
    gap: 14px;
    margin-top: 20px;
    padding: 8px 0;
  }
`;

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  gap: 4px;

  margin-top: 20px;

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
    margin-top: 12px;
    height: 44px;
    font-size: 14px;
  }
`;
