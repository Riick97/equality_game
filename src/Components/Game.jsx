import React, { Component } from 'react'
import DifferenceCard from './DifferenceCard'
import '../Styles/Game.css'

export default class Game extends Component {
    state = {
        index: 0
    }

    getOnOrZero() {
        return (Math.random()>=0.5)? 1 : 0;
    }

    render() {
        return (
            <div className="game">
                <DifferenceCard />
                <DifferenceCard />
            </div>
        )
    }
}
