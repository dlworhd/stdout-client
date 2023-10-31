import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../util/CustomAxios";

function SignUp() {
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const navigate = useNavigate();

    const handleSignUp = () => {
        if (password !== passwordCheck) {
            alert("패스워드가 일치하지 않습니다.");
            return;
        }

        instance.post("/v1/users", {
                username: username,
                password: password,
                nickname: nickname,
            })
            .then(() => {
                setUsername("");
                setPassword("");
                setPasswordCheck("");
                navigate("/");
            });
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handleNicknameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNickname(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handlePasswordCheckChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordCheck(event.target.value);
    };

    return (
        <>
            <Container>
                <TextField
                    id="standard-basic"
                    label="아이디"
                    variant="standard"
                    defaultValue={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    id="standard-basic"
                    label="패스워드"
                    type="password"
                    variant="standard"
                    defaultValue={password}
                    onChange={handlePasswordChange}
                />
                <TextField
                    id="standard-basic"
                    label="패스워드 확인"
                    type="password"
                    variant="standard"
                    defaultValue={passwordCheck}
                    onChange={handlePasswordCheckChange}
                />
                <TextField
                    id="standard-basic"
                    label="닉네임"
                    variant="standard"
                    defaultValue={nickname}
                    onChange={handleNicknameChange}
                />
                <ButtonContainer>
                    <Button variant="text" onClick={handleSignUp}>
                        회원가입
                    </Button>
                    <NavLink to={'/'}>
                        <Button variant="text">홈화면</Button>
                    </NavLink>
                </ButtonContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 50%;
    top: 45%;
    position: fixed;
    transform: translateX(-50%) translateY(-45%);
`;

const ButtonContainer = styled.div`
    margin-top: 1vh;
    display: flex;
`;

const NavLink = styled(Link)`
`

export default SignUp;
