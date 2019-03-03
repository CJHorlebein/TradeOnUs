import React from 'react';
import * as css from './FooterCss'


let Footer = () => (
    <div style={css.box}>
        <div style={css.info}>
            <div>
                <div style={css.section}>Products</div>
                <div style={css.item}>Enterprise</div>
                <div style={css.item}>Commercial</div>
                <div style={css.item}>Finance</div>
            </div>
            <div>
                <div style={css.section}>Company</div>
                <div style={css.item}>Investor Relations</div>
                <div style={css.item}>Corporate Profile</div>
                <div style={css.item}>About</div>
            </div>
            <div>
                <div style={css.section}>Contact</div>
                <div style={css.item}>Employee Access</div>
                <div style={css.item}>Contact Us</div>
            </div>
            <div>
                <div style={css.section}>News</div>
                <div style={css.item}>Release</div>
                <div style={css.item}>Press</div>
            </div>
            <div>
                <div style={css.section}>Careers</div>
                <div style={css.item}>See Jobs</div>
            </div>
        </div>
        <div style = {css.bottom}>
            <div>
                <span style={css.itemBot}>Terms and Conditions</span> 
                <span style={css.itemBot}>|</span>
                <span style={css.itemBot}>Privacy Policy</span>
            </div>
            <div>
                <div style={css.item}>Copyright © 2019 Trade On LLC.</div>
            </div>
        </div>
    </div>
)



export default Footer;