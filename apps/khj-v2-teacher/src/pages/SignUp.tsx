import styled from "@emotion/styled";

export default function SignUp() {
	return (
		<Container>
			<TextContainer>
				<h1>회원가입</h1>
			</TextContainer>
			<InputContainer>
				<InputSubContainer>
					<InputLabel>이름</InputLabel>
					<Input type="text" placeholder="이름을 입력해주세요" />
				</InputSubContainer>
				<InputSubContainer>
					<InputLabel>이메일</InputLabel>
					<Input type="text" placeholder="이메일을 입력해주세요" />
				</InputSubContainer>
				<InputSubContainer>
					<InputLabel>비밀번호</InputLabel>
					<Input type="password" placeholder="비밀번호를 입력해주세요" />
				</InputSubContainer>
				<LoginButton>로그인</LoginButton>
			</InputContainer>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0px;

	width: 640px;
	height: 720px;

	background: #FFFFFF;
	border: 1px solid #B1B8BE;
	box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.12);
	border-radius: 12px;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0px;
	gap: 10px;

	width: 650px;
	height: 60px;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 0px;
	gap: 32px;
	margin-top: 30px;

	width: 400px;
	height: 445px;
	
	border-bottom: 1px solid #8A949E;
`;

const InputSubContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: 8px;

	width: 400px;
	height: 87px;
`;

const Input = styled.input`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 16px;
	gap: 8px;

	width: 400px;
	height: 56px;

	background: #FFFFFF;
	border: 1px solid #58616A;
	border-radius: 8px;

	::placeholder {
		font-family: 'Pretendard GOV';
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 150%;

		color: #8A949E;
	}
`;

const InputLabel = styled.label`
	width: 400px;
	height: 23px;

	font-family: 'Pretendard GOV';
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 150%;

	color: #464C53;
`;

const LoginButton = styled.button`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0px 20px;
	gap: 4px;

	margin-top: -8px;

	width: 400px;
	min-width: 90px;
	height: 56px;

	border: none;
	background: #256EF4;
	border-radius: 8px;

	font-family: 'Pretendard GOV';
	font-style: normal;
	font-weight: 400;
	font-size: 19px;
	line-height: 150%;

	color: #FFFFFF;
`;