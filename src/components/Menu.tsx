import { Link } from "react-router-dom";
import styled from "styled-components";

interface MenuProps {
    currentPath: string;
}

const menuList = [
    { name: "All", path: "/all" },
    { name: "Domestic", path: "/domestic" },
    { name: "International", path: "/international" },
];

function Menu() {
    return (
        <S.MenuContainer>
            <S.MenuList>
                {menuList.map((menu) => (
                    <S.MenuItem
                        to={menu.path}
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
        color: white;
        text-decoration: none;
        // font-weight: ${(props: { isActive: boolean }) => props.isActive ? 600 : 100 };

        margin: 0 1vw;
        text-align: center;

        &:hover {
            color: #93a79c;
        }
    `,
};

export default Menu;
