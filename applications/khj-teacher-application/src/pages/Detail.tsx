import { UserInfo } from "@khj/user-interfaces";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getUserGrass,
  getUserInfo,
  type GrassItem,
  type UserInfoResponse,
} from "../apis/data";

export default function Detail() {
  const { id } = useParams();
  const numericId = Number(id);
  const isValidId = Number.isFinite(numericId);

  const { data: userInfo } = useQuery<UserInfoResponse>({
    queryKey: ["userInfo", id],
    queryFn: () => getUserInfo(numericId),
    enabled: isValidId,
  });

  const { data: userGrassResponse } = useQuery({
    queryKey: ["userGrass", id, 7],
    queryFn: () => getUserGrass(numericId, 7),
    enabled: isValidId,
  });

  const userGrass: GrassItem[] = userGrassResponse?.grass ?? [];

  return (
    <Wrapper>
      <UserInfo
        id={numericId}
        studentNumber={userInfo?.studentNumber || 0}
        name={userInfo?.name || ""}
        bojId={userInfo?.bojId || ""}
        tier={userInfo?.tier || ""}
        totalSolved={userInfo?.totalSolved || 0}
        accuracyRate={userInfo?.accuracyRate || 0}
        streak={userInfo?.streak || 0}
        maxStreak={userInfo?.maxStreak || 0}
        flame={userInfo?.flame || 0}
        grass={userGrass}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 39px 0px 69px 0px;
  width: 100%;
`;
