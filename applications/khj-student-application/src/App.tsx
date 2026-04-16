import { Global } from "@emotion/react";
import { globalStyle } from "./styles/global";
import LeaderboardPage from "./pages/Leaderboard";

export default function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <LeaderboardPage />
    </>
  );
}
