import styled from "styled-components";

function NotFound(){

    return(
        <S.Container>
            <S.Image src="404.png" />
            <S.Message>페이지를 찾을 수 없습니다.</S.Message>
        </S.Container>
    )
}


const S = {
    Container: styled.div`
        color: white;
        text-align: center;
        width: 50vh;
        margin: 10vh auto 34vh auto;
    `,
    Image: styled.img`
        width: 50%;
        margin-bottom: 5vh;
    `,
    Message: styled.h3`
        
    `
}

export default NotFound;