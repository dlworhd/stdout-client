import styled from "styled-components";

function MobileApp(){
    return(
        <S.Container>
            모바일 환경은 아직 지원하지 않습니다:)
        </S.Container>
    )
}

const S = {

    Container: styled.div`
        color: white;
        text-align: center;
        width: 50vh;
        margin: 25vh auto;
    `
}

export default MobileApp;