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
  const isValidId = Number.isInteger(numericId) && numericId > 0;

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useQuery<UserInfoResponse>({
    queryKey: ["userInfo", id],
    queryFn: () => getUserInfo(numericId),
    enabled: isValidId,
  });

  const {
    data: userGrassResponse,
    isLoading: isUserGrassLoading,
    isError: isUserGrassError,
  } = useQuery({
    queryKey: ["userGrass", id, 7],
    queryFn: () => getUserGrass(numericId, 7),
    enabled: isValidId,
  });

  const userGrass: GrassItem[] = userGrassResponse?.grass ?? [];

  if (!isValidId) {
    return <Wrapper>유효하지 않은 ID입니다.</Wrapper>;
  }

  if (isUserInfoLoading || isUserGrassLoading) {
    return <Wrapper>로딩 중...</Wrapper>;
  }

  if (isUserInfoError || isUserGrassError) {
    return <Wrapper>데이터를 불러오는 중 오류가 발생했습니다.</Wrapper>;
  }

  return (
    <Wrapper>
      <UserInfo
        studentNumber={userInfo?.studentNumber ?? 0}
        name={userInfo?.name ?? ""}
        bojId={userInfo?.bojId ?? ""}
        tier={userInfo?.tier ?? ""}
        totalSolved={userInfo?.totalSolved ?? 0}
        todaySolved={userInfo?.todaySolved ?? 0}
        accuracyRate={userInfo?.accuracyRate ?? 0}
        streak={userInfo?.streak ?? 0}
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
