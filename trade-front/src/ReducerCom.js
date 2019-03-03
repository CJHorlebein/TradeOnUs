import React, { Component } from 'react';
import * as css from './AppCSS.js';
import { withRouter } from 'react-router-dom';
import ColorBlock from './ColorBlock';
import { connect } from 'react-redux'

class App extends Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        saveColors: state.saveColors,
        nextColors: state.nextColors,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        saveColor: () => dispatch({ type: `SAVE_COLOR` }),
        nextColor: () => dispatch({ type: `NEXT_COLOR` })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));