import React from 'react';
import { NavLink } from 'react-router-dom';
import * as css from './HeaderCss';
import LogBtn from './LogBtn';

let Header = () => (
    <div>
        <div style = {css.box}>
            <div style = {css.navLeft}>
                <img style={css.logo} src={require('./img/bulb.svg')} alt="TradeOn logo"/>
                <NavLink style={css.leftLink} to="/">TradeOn</NavLink>
                <NavLink style={css.leftLink} to="/stocks">Stocks</NavLink>
                <NavLink style={css.leftLink} to="/account">Account</NavLink>
                <NavLink style={css.leftLink} to="/Market">Market</NavLink>
            </div>
            <div>
                <LogBtn />
            </div>
        </div>
        <div style = {css.space}></div>
    </div>
)


export default Header;