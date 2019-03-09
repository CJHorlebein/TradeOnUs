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
        <div style={css.text}> 
            Data provided for free by 
            <a style={css.text} href='https://iextrading.com/developer/' rel="noopener noreferrer" target='_blank'> IEX. </a>
            View 
            <a style={css.text} href='https://iextrading.com/api-exhibit-a/' rel="noopener noreferrer" target='_blank'> IEX’s Terms of Use.</a>
        </div>
        <div style={css.text}> 
            <a style={css.text} href="https://www.flaticon.com/authors/smashicons" rel="noopener noreferrer" target='_blank'>Smashicons</a> from 
            <a style={css.text} href="https://www.flaticon.com/" rel="noopener noreferrer" target='_blank'> www.flaticon.com</a> is licensed by 
            <a style={css.text} href="http://creativecommons.org/licenses/by/3.0/" rel="noopener noreferrer" target='_blank'> CC 3.0 BY</a>
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