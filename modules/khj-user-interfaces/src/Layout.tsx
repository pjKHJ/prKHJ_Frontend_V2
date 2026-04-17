import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const authStorage = localStorage.getItem("auth-storage");
  let isLoggedIn = false;

  if (authStorage) {
    try {
      isLoggedIn = Boolean(JSON.parse(authStorage).state?.isLoggedIn);
    } catch {
      isLoggedIn = false;
    }
  }

  const currentUserId = localStorage.getItem("currentUserId");

  const handleLogout = () => {
    localStorage.removeItem("auth-storage");
    localStorage.removeItem("currentUserId");
  };

  return (
    <Wrapper>
      <Header
        isLoggedIn={isLoggedIn}
        currentUserId={currentUserId}
        onLogout={handleLogout}
      />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;
