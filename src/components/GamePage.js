import React from 'react'

const GamePage = (props) => {

    const mockGameData = [
        {
            homeTeam: "Dallas Mavericks",
            homeScore: "23",
            awayTeam: "Knicks",
            awayScore: "30",
            quarter: "1Q",
            timeRemaining: "2'"
        },
        {
            homeTeam: "Knicks",
            homeScore: "23",
            awayTeam: "Knicks",
            awayScore: "30",
            quarter: "1Q",
            timeRemaining: "2'"
        },
        {
            homeTeam: "Knicks",
            homeScore: "23",
            awayTeam: "Knicks",
            awayScore: "30",
            quarter: "1Q",
            timeRemaining: "2'"
        }
    ]


    var game = props.liveGames.find(game => game.homeTeam === props.homeTeam)
    // console.log(game)

    return (
        <div>
            <h1>{'<-- See all games'}</h1>
            <div>
                <img></img>
                <div>
                    <p>{props.awayTeam}</p>
                    <p>{game.awayScore}</p>
                </div>
                <div>
                    <div></div>
                    <p>{game.quarter}</p>
                    <p>{game.timeRemaining}</p>
                </div>
                <div>
                    <p>{game.homeScore}</p>
                    <p>{props.homeTeam}</p>
                </div>
                <img></img>
            </div>
            <button>CALIBRATE LATENCY</button>
        </div>
    )
}

export default GamePage