import styled from "@emotion/styled";

interface InputProps {
  name: string;
  next: string;
  width?: string;
  height?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  next,
  width,
  height,
  type,
  value,
  onChange,
}: InputProps) {
  return (
    <InputSubContainer width={width} height={height}>
      <InputLabel>{name}</InputLabel>
      <InputBar
        type={type || "text"}
        placeholder={`${name}${next} 입력해주세요`}
        value={value}
        onChange={onChange}
      />
    </InputSubContainer>
  );
}

const InputSubContainer = styled.div<{ width?: string; height?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: ${(props) => props.width || "100%"};
  max-width: 400px;
  height: ${(props) => props.height || "auto"};
  box-sizing: border-box;
  min-width: 160px;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const InputBar = styled.input`
  align-items: center;
  padding: 0px 16px;
  gap: 8px;

  width: 100%;
  height: 44px;
  box-sizing: border-box;

  background: #ffffff;
  border: 1px solid #58616a;
  border-radius: 8px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;

  color: #000000;
  ::placeholder {
    color: #8a949e;
  }

  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #256ef4;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    height: 40px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    height: 36px;
    padding: 0px 12px;
  }
`;

const InputLabel = styled.label`
  width: 100%;
  height: auto;
  min-height: 20px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;

  color: #464c53;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
