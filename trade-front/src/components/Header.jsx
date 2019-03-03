import React from 'react';
import { NavLink } from 'react-router-dom';
import * as css from './HeaderCss'


let Header = () => (
    <div>
        <div style = {css.box}>
            <div style = {css.navLeft}>
                <NavLink style={css.link} to="/">TradeOn</NavLink>
                <NavLink style={css.link} to="/stocks">Stocks</NavLink>
                <NavLink style={css.link} to="/account">Account</NavLink>
                <NavLink style={css.link} to="/game">Game</NavLink>
            </div>
            <div>
                <NavLink style={css.link} to="/login">Login</NavLink>
            </div>
        </div>
        <div style = {css.space}></div>
    </div>
)



export default Header;