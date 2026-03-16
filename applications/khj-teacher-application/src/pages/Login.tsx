import styled from "@emotion/styled";
import { useState } from "react";
import { Input } from "@khj/user-interfaces";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <TextContainer>
        <h1>Daedeok Software Coding Test System 로그인</h1>
        <p>이메일/비밀번호 로그인</p>
      </TextContainer>
      <InputContainer>
        <Input
          name="이메일"
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
          <SaveEmailCheckbox type="checkbox" />
          <span>이메일 저장</span>
        </SaveEmailContainer>
        <LoginButton>로그인</LoginButton>
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
  margin-top: 40px;

  width: 400px;
  height: 368px;

  border-bottom: 1px solid #8a949e;
`;

const SaveEmailContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 3px;

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
`;
