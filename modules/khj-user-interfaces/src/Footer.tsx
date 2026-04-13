import styled from "@emotion/styled";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterText>
        <p>
          © 2026 Daedeok Software Meister High School . All rights reserved.
        </p>
      </FooterText>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;

  width: 100%;
  min-height: 54px;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 12px 20px 20px;

  width: 100%;
  max-width: 1200px;
  min-height: auto;
  box-sizing: border-box;

  border-top: 1px solid #cdd1d5;

  p {
    font-family: "Pretendard GOV", sans-serif;
    font-weight: 400;
    margin: 0;
    font-size: 13px;
    color: #464c53;
    text-align: center;
    text-decoration: none;
    word-break: break-word;
  }

  @media (max-width: 768px) {
    padding: 10px 16px 16px;

    p {
      font-size: 12px;
    }
  }

  @media (max-width: 480px) {
    padding: 8px 12px 12px;

    p {
      font-size: 11px;
      line-height: 1.4;
    }
  }
`;
