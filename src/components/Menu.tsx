import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

const menuList = [
    { name: "전체", path: "/" },
    { name: "국내", path: "/domestic" },
    { name: "해외", path: "/international" },
];

function Menu() {

    const location = useLocation();


    return (
        <S.MenuContainer>
            <S.MenuList>
                {menuList.map((menu, index) => (
                    <S.MenuItem
                        key={index}
                        to={menu.path}
                        style={menu.path === location.pathname ? { color: 'white' } : { color: '#696969'}}
                    >
                        {menu.name}
                    </S.MenuItem>
                ))}
            </S.MenuList>
        </S.MenuContainer>
    );
}

const S = {
    MenuContainer: styled.div``,
    MenuList: styled.ul`
        justify-content: center;
        list-style: none;
        display: flex;
        width: 100vw;
        height: 10vh;
        margin: 10vh 0 0 0;
        padding: 0;
        
    `,

    MenuItem: styled(Link)<{ isActive: boolean }>`
        text-decoration: none;

        margin: 0 1vw;
        text-align: center;

        &:hover {
            color: #93a79c;
        }

    `,
};

export default Menu;
