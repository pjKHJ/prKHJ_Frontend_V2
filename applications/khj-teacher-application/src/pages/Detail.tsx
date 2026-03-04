import { UserInfo } from "@khj/user-interfaces";
import styled from "@emotion/styled";

export default function Detail() {
  return (
    <Wrapper>
      <UserInfo />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 39px 0px 69px 0px;
  width: 100%;
`;
