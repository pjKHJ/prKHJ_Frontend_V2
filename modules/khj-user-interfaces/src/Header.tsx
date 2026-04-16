import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";

export default function Header() {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("currentUserId");
  const isLoggedIn = (() => {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (!authStorage) {
        return false;
      }

      const parsed = JSON.parse(authStorage);
      return parsed?.state?.isLoggedIn === true;
    } catch {
      return false;
    }
  })();

  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) {
      return;
    }

    localStorage.removeItem("auth-storage");
    localStorage.removeItem("currentUserId");
    navigate("/login");
  };

  return (
    <Container>
      <UpContainer>
        {isLoggedIn && currentUserId ? (
          <>
            <UpUserText>{currentUserId}</UpUserText>
            <Divider>|</Divider>
            <UpActionButton type="button" onClick={handleLogout}>
              로그아웃
            </UpActionButton>
          </>
        ) : (
          <>
            <UpText to="/login">로그인</UpText>
            <Divider>|</Divider>
            <UpText to="/signup">회원가입</UpText>
          </>
        )}
        <Divider>|</Divider>
        <UpText to="/">About</UpText>
      </UpContainer>
      <DownContainer>
        <DownText to="/">데이터 조회</DownText>
        <DownText to="/add-student">학생 등록</DownText>
        <DownText to="/delete-student">학생 삭제</DownText>
      </DownContainer>
      <Link to="/">
        <ImgContainer src={Logo} alt="logo" />
      </Link>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px 14px;
  gap: 4px;

  position: relative;
  z-index: 1000;
  width: 100%;
  height: 120px;

  background: #ffffff;
  border-bottom: 1px solid #8a949e;
`;

const UpContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 12px;

  width: 100%;
  max-width: 1200px;
  height: 32px;
`;

const UpText = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: fit-content;
  height: 24px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;

  text-decoration: none;

  color: #1e2124;
`;

const UpActionButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: fit-content;
  height: 24px;

  border: none;
  background: transparent;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;

  color: #1e2124;
  cursor: pointer;
`;

const UpUserText = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: fit-content;
  height: 24px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;

  color: #1e2124;
`;

const Divider = styled.span`
  width: fit-content;
  color: #cdd1d5;
  margin: 0 12px;
  padding-bottom: 4px;
  cursor: default;
`;

const DownContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 16px;
  gap: 40px;

  width: 100%;
  max-width: 1200px;
  height: 56px;
`;

const DownText = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  width: fit-content;
  height: 56px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 150%;

  color: #464c53;

  text-decoration: none;
`;

const ImgContainer = styled.img`
  position: absolute;
  width: 273px;
  height: 60px;
  left: 374px;
  top: 30px;
`;
