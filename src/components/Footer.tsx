
import React from "react";
import styled from "styled-components";

function Footer(){

    return(
        <>
        <S.BorderLine></S.BorderLine>
        <S.Container>
            <S.Copyright>
                Copyright© 2022-2023 j. All rights reserved. 
            </S.Copyright>
            <S.Address>
                서울특별시 어느 곳에서
            </S.Address>
            
        </S.Container>
        </>
    )
}

const S = {

    Container: styled.div`
        display: flex;
        justify-content: center;
        margin: 2vh 0;
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