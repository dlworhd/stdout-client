import React from "react";
import styled from "styled-components";

function Users() {
    return <S.UsersLayout></S.UsersLayout>;
}

const S = {
    UsersLayout: styled.div`
        display: flex;
        flex-direction: column;
    `,
};

export default Users;
