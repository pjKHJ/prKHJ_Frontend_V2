import { EntryPoint } from "@khj/user-interfaces";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function Entry() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Wrapper>
      <img src={EntryPoint} alt="entry point" />
      <Box>
        <h2>로그인 후 서비스를 이용해 보세요</h2>
        <span>Deadok Software Coding Test System</span>
        <button onClick={handleLogin}>로그인하러 가기</button>
      </Box>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 1208px;
  max-height: 852px;

  margin: 54px auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Box = styled.div`
  width: 330px;
  font-family: "Pretendard GOV", sans-serif;
  font-weight: 700;
  background: #fafafa;
  padding: 35px 20px;
  position: absolute;
  border-radius: 12px;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.2);
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #131416;

  h2 {
    display: block;
    margin-bottom: 12px;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
  }

  span {
    display: block;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 150%;
  }

  button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    background-color: #256ef4;
    color: #ffffff;
    cursor: pointer;
    font-size: 15px;
    margin-top: 30px;
    font-weight: 700;

    &:hover {
      background-color: #1a56c4;
    }

    &:active {
      background-color: #0f3d8a;
    }
  }
`;
