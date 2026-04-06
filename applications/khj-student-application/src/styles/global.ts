import { css } from "@emotion/react";

export const globalStyle = css`
  :root {
    color-scheme: dark;
    font-family:
      "Inter", "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
    background:
      radial-gradient(
        circle at top,
        rgba(255, 255, 255, 0.08),
        transparent 32%
      ),
      linear-gradient(180deg, #0b0d10 0%, #050607 100%);
    color: #f3f5f7;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  body {
    min-height: 100vh;
    background:
      radial-gradient(
        circle at top left,
        rgba(255, 255, 255, 0.08),
        transparent 26%
      ),
      radial-gradient(
        circle at 85% 10%,
        rgba(255, 255, 255, 0.04),
        transparent 20%
      ),
      linear-gradient(180deg, #0b0d10 0%, #050607 100%);
    color: #f3f5f7;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button,
  select,
  input {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
