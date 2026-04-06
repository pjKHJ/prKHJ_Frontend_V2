import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Logo.svg";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <Container>
      <HeaderRow>
        <Link to="/" onClick={closeMobileMenu}>
          <ImgContainer src={Logo} alt="logo" />
        </Link>

        <DesktopNav>
          <DownText to="/list">데이터 조회</DownText>
          <DownText to="/add-student">학생 등록</DownText>
          <DownText to="/delete-student">학생 삭제</DownText>
        </DesktopNav>

        <DesktopAuth>
          <UpText to="/login">로그인</UpText>
          <Divider>|</Divider>
          <UpText to="/signup">회원가입</UpText>
          <Divider>|</Divider>
          <UpText to="/">About</UpText>
        </DesktopAuth>

        <HamburgerButton
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </HamburgerButton>
      </HeaderRow>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileSection>
          <DownText to="/list" onClick={closeMobileMenu}>
            데이터 조회
          </DownText>
          <DownText to="/add-student" onClick={closeMobileMenu}>
            학생 등록
          </DownText>
          <DownText to="/delete-student" onClick={closeMobileMenu}>
            학생 삭제
          </DownText>
        </MobileSection>

        <MobileSection>
          <UpText to="/login" onClick={closeMobileMenu}>
            로그인
          </UpText>
          <UpText to="/signup" onClick={closeMobileMenu}>
            회원가입
          </UpText>
          <UpText to="/" onClick={closeMobileMenu}>
            About
          </UpText>
        </MobileSection>
      </MobileMenu>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px 16px;
  gap: 0;

  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  min-height: 80px;
  height: auto;

  background: #ffffff;
  border-bottom: 1px solid #8a949e;
  box-sizing: border-box;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 8px 12px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    min-height: auto;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  gap: 16px;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 60px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-height: 52px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    min-height: 48px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DesktopAuth = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid #d0d5da;
  border-radius: 8px;
  background: #ffffff;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: #464c53;
    margin: 4px 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 100%;
    left: 12px;
    right: 12px;
    z-index: 1200;
    flex-direction: column;
    gap: 10px;
    width: auto;
    padding: 10px;
    border: 1px solid #e3e7eb;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? "260px" : "0")};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transform: translateY(${({ isOpen }) => (isOpen ? "8px" : "0")});
    transform-origin: top;
    pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
    transition:
      max-height 0.28s ease,
      opacity 0.22s ease,
      transform 0.28s ease;
  }

  @media (max-width: 480px) {
    left: 10px;
    right: 10px;
  }
`;

const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UpText = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  white-space: nowrap;

  width: fit-content;
  height: auto;
  min-height: 24px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;

  text-decoration: none;
  color: #1e2124;
  transition: color 0.2s;

  &:hover {
    color: #256ef4;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 2px 4px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 8px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 8px;
  }
`;

const Divider = styled.span`
  width: fit-content;
  color: #cdd1d5;
  margin: 0 6px;
  padding-bottom: 0;
  cursor: default;
  line-height: 1;

  @media (max-width: 1024px) {
    margin: 0 4px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const DownText = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  white-space: nowrap;

  width: fit-content;
  height: auto;
  min-height: 36px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 150%;

  color: #464c53;
  text-decoration: none;
  transition: color 0.2s;
  border-radius: 4px;

  &:hover {
    color: #256ef4;
  }

  @media (max-width: 1024px) {
    font-size: 15px;
    padding: 6px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 10px;
    min-height: 38px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 7px 9px;
    min-height: 34px;
  }
`;

const ImgContainer = styled.img`
  display: block;
  width: 273px;
  height: 60px;

  @media (max-width: 1024px) {
    width: 230px;
    height: 51px;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 44px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 33px;
  }
`;
