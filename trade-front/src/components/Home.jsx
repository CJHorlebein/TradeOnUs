import React from 'react';
import * as css from './HomeCss'


let Home = () => (
    <div style={css.box}>
        <div style={css.container}>
            <div style={css.div50}>
                <img style={css.coin} src={require('./img/coin.svg')} alt="Giant Coin" />
            </div>
            <div style={css.div50}>
                <div style={css.mainText}>
                    <h1 style={css.headText}>Risk Free Trades</h1>
                    <p style={css.subText}>Level up your portfolio by practicing with <em>real stocks!</em></p>
                    <h2 style={css.subHead}>Bring your A+ game</h2>
                </div>
            </div>
        </div>
        <div style={css.container}>
            <div style={css.div15}>
                <h2 style={css.headStocks}>Stocks</h2>
                <p>Invest in stocks you want, try new techniques, and feel confident without the risk</p>
            </div>
            <div style={css.div15}>
                <h2 style={css.headStocks}>Index Funds</h2>
                <p>Compare new trading strategies against other stocks or even use index funds as a baseline</p>
            </div>
            <div style={css.div15}>
                <h2 style={css.headStocks}>No limits</h2>
                <p>Unlike normal trading, even low balance portfolios can trade as often as you like!</p>
            </div>
            <div style={css.div15}>
                <h2 style={css.headStocks}>Earn Funds</h2>
                <p>Bad trade got you down? Waiting on a risky swing trade? Add funds with our challenging game mode!</p>
            </div>
        </div>
        {/* <div style={css.container}>
            <div style={css.div50}>
                <h1>Were Different!</h1>
            </div>
            <div style={css.div50}>
                <img style={css.coin} src={require('./img/bars.svg')} alt="Bars" />
            </div>
        </div> */}
    </div>
)



export default Home;