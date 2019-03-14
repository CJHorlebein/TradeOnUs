import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'


class Scores extends Component{
    componentDidMount(){
        axios.get('/api/scores')
            .then(res => this.props.updateScores(res.data))
    }
    render(){
        console.log(this.props)
        return (
            <div>
                {this.props.state.scores.map(({name, funds}, i) => <div key={i}>{name}:{funds}</div>)}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state: state
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateScores: (scores) => dispatch({ type: 'UPDATE_SCORES', payload: scores})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scores)