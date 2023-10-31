import styled from "styled-components";

function Footer(){

    return(
        <S.Container>
            <S.BorderLine></S.BorderLine>
            <S.InnerContainer>
                <S.Copyright>
                    Copyright© 2022-2023 j. All rights reserved. 
                </S.Copyright>
                <S.Address>
                    서울특별시 관악구 은천로 1길
                </S.Address>
            </S.InnerContainer>
        </S.Container>
    )
}

const S = {

    Container: styled.div`
        display: flex;
        flex-direction: column;
    `,

    InnerContainer: styled.div`
        display: flex;
        bottom: 1vh;
        justify-content: center;
        margin: 1vh 0 2vh 0;
    `,
    BorderLine: styled.div`
        border-top: 0.5px solid grey;  
        display: flex;
        width: 98vw;
        margin: 1vh auto;
        wid
    `,

    Address: styled.div`
        color:white;
        font-size: 0.5rem;
    `,
    Copyright: styled.div`
        color:white;
        font-size: 0.5rem;
        margin-right: 5vw;
    `,

}

export default Footer;