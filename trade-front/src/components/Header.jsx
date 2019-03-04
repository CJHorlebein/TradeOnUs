import React from 'react';
import { NavLink } from 'react-router-dom';
import * as css from './HeaderCss'


let Header = () => (
    <div>
        <div style = {css.box}>
            <div style = {css.navLeft}>
                <img style={css.logo} src={require('./img/bulb.svg')} alt="TradeOn logo"/>
                <NavLink style={css.leftLink} to="/">TradeOn</NavLink>
                <NavLink style={css.leftLink} to="/stocks">Stocks</NavLink>
                <NavLink style={css.leftLink} to="/account">Account</NavLink>
                <NavLink style={css.leftLink} to="/funds">Funds</NavLink>
            </div>
            <div>
                <NavLink style={css.button} to="/login">Login</NavLink>
            </div>
        </div>
        <div style = {css.space}></div>
    </div>
)



export default Header;