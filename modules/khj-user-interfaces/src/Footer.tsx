import styled from "@emotion/styled";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterText>
        <p>
          © 2025 Daedeok Software Meister High School . All rights reserved.
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
  height: 54px;
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 10px 0px 20px;

  width: 1200px;
  max-width: 1200px;
  height: 54px;

  border-top: 1px solid #cdd1d5;

  p {
    font-family: "Pretendard GOV", sans-serif;
    font-weight: 400;
    margin: 5px;
    font-size: 13px;
    color: #464c53;
    text-align: center;
    text-decoration: none;
  }
`;
