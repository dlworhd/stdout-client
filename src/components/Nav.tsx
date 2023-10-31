import { Link } from "react-router-dom";
import styled from "styled-components";

function Nav() {

    return (
        <S.NavContainer>
            <S.NavLogoLink to="/" >
                <S.NavLogo src="logo.png" />
            </S.NavLogoLink>
            {/* <S.NavProfile src="profile.png" /> */}
        </S.NavContainer>
    );
}

const S = {
    NavLogo: styled.img`
        width: 150px;
        margin: 0 auto;
        cursor: pointer;
    `,
    NavContainer: styled.div`
        margin: 3vh 0 10vh;
        box-sizing: inline;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 6vh;
        // width: 100vw;
        position: relative;
        background-color: #171717;
    `,
    NavLogoLink: styled(Link)`
        text-align: center;
    `,
    NavProfile: styled.img`
        width: 2%;
        position: absolute;
        right: 2vw;
    `,
};

export default Nav;
