import React from 'react'
import '../App.css';

function Score(props:{score:number, maxscore:number}) {
    return (
        <div className="score">

            <div id="Title"> The Memory Game </div>
            <div id="High"> High Score : {props.maxscore} </div>
            <div id="current"> Score : {props.score} </div>
        </div>
    )
}

export default Score
