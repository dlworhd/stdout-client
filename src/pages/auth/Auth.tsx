import { Button, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store";
import { login } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Auth() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const handleLogin = async () => {
        await axios.post("http://localhost:8080/api/auth/login", {username: username, password: password}).then((response) => {
            console.log(response.data);
            localStorage.setItem('accessToken', response.data.accessToken.value)
            setUsername('');
            setPassword('');

            const userId = response.data.userInfo.userId;
            const username = response.data.userInfo.username;
            const nickname = response.data.userInfo.nickname;
            dispatch(login({id: userId, username: username, nickname: nickname}))
            navigate('/');
        })
        .catch((error: AxiosError) => {
            alert('로그인에 실패하였습니다.')
        });
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    return (
        <Container>
            <TextField
                id="username"
                label="아이디"
                variant="standard"
                defaultValue={username}
                onChange={handleUsernameChange}
            />
            <TextField
                id="password"
                label="패스워드"
                type="password"
                variant="standard"
                defaultValue={password}
                onChange={handlePasswordChange}
            />
            <ButtonContainer>
                <Button variant="text" onClick={handleLogin}>
                    로그인
                </Button>
                <NavLink to={'/'}>
                    <Button variant="text">홈화면</Button>
                </NavLink>
            </ButtonContainer>
        </Container>
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

const NavLink = styled(Link)`

`

const ButtonContainer = styled.div`
    margin-top: 1vh;
    display: flex;
`;

export default Auth;
