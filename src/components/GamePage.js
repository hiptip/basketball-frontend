import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { nbaLogoMap } from '../util/logos'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        // border: '1px solid black',
        width: '80vw',
        height: '80vh',
        display: 'block',
        margin: 'auto',
        marginTop: 80,
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'Roboto Mono',
    },
    header: {
        cursor: 'pointer',
        fontSize: '3vh'
    },
    gameData: {
        // border: '1px solid black',
        width: '70%',
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex'
    },
    awayTeamData: {
        display: 'flex',
        flex: 1
    },
    homeTeamData: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end'
    },
    gameTime: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        display: 'inline-block',
        borderRadius: '50%',
        // height: '10%',
        width: '50%',
        margin: 'auto 0'
    },
    nameScore: {
        display: 'inline-block'
    },
    awayTeamName: {
        textAlign: 'start'
    },
    homeTeamName: {
        textAlign: 'end'
    },
    awayTeamScore: {
        fontSize: '6vw',
        fontWeight: 700,
        margin: '10px 0',
        textAlign: 'start'
    },
    homeTeamScore: {
        fontSize: '6vw',
        fontWeight: 700,
        margin: '10px 0',
        textAlign: 'end'
    },
    calibrate: {
        display: 'block'
    }
}))

const GamePage = (props) => {

    const classes = useStyles();

    const toggleGameView = () => {
        props.setGameView(!props.gameView)
    }

    const mockGameData = [
        {
            homeTeam: "Mavericks",
            homeScore: "23",
            awayTeam: "Knicks",
            awayScore: "30",
            quarter: "1Q",
            timeRemaining: "2'",
            gameTime: "1st Quarter 6 "
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

    const getLogoUrl = (teamName) => {
        const teamData = nbaLogoMap.find(team => teamName.includes(team.mascot))
        return teamData.logoURL
    }


    var game = mockGameData.find(game => game.homeTeam === props.homeTeam) //default to state if no value
    // console.log(game)

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.header} onClick={toggleGameView}>{'<- See all games'}</h1>
            <div className={classes.gameData}>
                <div className={classes.awayTeamData}>
                    <img className={classes.logo} src={getLogoUrl(props.awayTeam)} alt='team logo'></img>
                    <div className={classes.nameScore}>
                        <p className={classes.awayTeamName}>{props.awayTeam}</p>
                        <p className={classes.awayTeamScore}>{game ? game.awayScore : ""}</p>
                    </div>
                </div>
                <div className={classes.gameTime}>
                    <div></div>
                    {/* <p>{game.quarter}</p> */}
                    <p>{game ? game.gameTime : ""}</p>
                </div>
                <div className={classes.homeTeamData}>
                    <div className={classes.nameScore}>
                        <p className={classes.homeTeamName}>{props.homeTeam}</p>
                        <p className={classes.homeTeamScore}>{game ? game.homeScore : ""}</p>
                    </div>
                    <img className={classes.logo} src={getLogoUrl(props.homeTeam)} alt='team logo'></img>
                </div>
            </div>
            <button className={classes.calibrate}>CALIBRATE LATENCY</button>
        </div>
    )
}

export default GamePage