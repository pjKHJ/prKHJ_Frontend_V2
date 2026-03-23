import { UserInfo } from "@khj/user-interfaces";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getUserInfo, type UserInfoResponse } from "../apis/data";
import { useState, useEffect } from "react";

export default function Detail() {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);

  const { id } = useParams();

  const { mutate: getUserInfoMutate } = useMutation({
    mutationFn: (id: number) => getUserInfo(id),
    onSuccess: (data: UserInfoResponse) => {
      console.log("유저 정보 조회 성공:", data);
      setUserInfo(data);
    },
    onError: (error) => {
      console.error("유저 정보 조회 실패:", error);
    },
  });

  useEffect(() => {
    if (id) {
      getUserInfoMutate(Number(id));
    }
  }, [id, getUserInfoMutate]);

  return (
    <Wrapper>
      <UserInfo
        id={Number(id)}
        studentNumber={userInfo?.studentNumber || 0}
        name={userInfo?.name || ""}
        bojId={userInfo?.bojId || ""}
        tier={userInfo?.tier || ""}
        totalSolved={userInfo?.totalSolved || 0}
        accuracyRate={userInfo?.accuracyRate || 0}
        streak={userInfo?.streak || 0}
        maxStreak={userInfo?.maxStreak || 0}
        flame={userInfo?.flame || 0}
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
