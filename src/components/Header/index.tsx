import { HeaderContainer } from "./styles";

import logoIgnite from '../../assets/Logo.svg';
import { Timer, Scroll } from "phosphor-react";

import { NavLink } from "react-router";

export function Header() {
    return (
        <HeaderContainer>
            <span>
                <img src={logoIgnite} alt=""/>
            </span>
            <nav>
                <NavLink to="/" title="Timer">
                    < Timer />
                </NavLink>
                <NavLink to="/history" title="History">
                    <Scroll />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}