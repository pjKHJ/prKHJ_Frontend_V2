import styled from "@emotion/styled";

export default function Input({
  name,
  width,
  height,
}: {
  name: string;
  width?: string;
  height?: string;
}) {
  return (
    <InputSubContainer width={width} height={height}>
      <InputLabel>{name}</InputLabel>
      <InputBar type="text" placeholder={`${name}을 입력해주세요`} />
    </InputSubContainer>
  );
}

const InputSubContainer = styled.div<{ width?: string; height?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: ${(props) => props.width || "400px"};
  height: ${(props) => props.height || "87px"};
`;

const InputBar = styled.input`
  align-items: center;
  padding: 0px 16px;
  gap: 8px;

  width: 100%;
  height: 100%;

  background: #ffffff;
  border: 1px solid #58616a;
  border-radius: 8px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;

  color: #000000;
  ::placeholder {
    color: #8a949e;
  }
`;

const InputLabel = styled.label`
  width: 100%;
  height: 23px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;

  color: #464c53;
`;
