import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import NbaGameCard from './NbaGameCard';

const useStyles = makeStyles((theme) => ({
    '@keyframes pulse': {
        from: { opacity: 1 },
        to: { opacity: .7 },
    },

    live: {
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        borderRadius: 25,
        padding: 10,
        color: 'white',
        backgroundColor: 'red',
        animation: '$pulse 1.5s infinite alternate ease-in-out',
        marginTop:50
    },
    liveGameHeading: {
        textAlign: 'center',
        fontFamily: 'Roboto Mono',
        margin:'20px 0 30px 0'
    },

    heading: {
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        color:'black',
        margin:0,
        marginBottom:50
    }
}));

const mockGameData = [
    {
        homeTeam: "Mavericks",
        homeScore: "23",
        awayTeam: "Knicks",
        awayScore: "30",
        quarter: "1Q",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Hornets",
        homeScore: "23",
        awayTeam: "Wizards",
        awayScore: "30",
        quarter: "1Q",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Kings",
        homeScore: "23",
        awayTeam: "Bulls",
        awayScore: "30",
        quarter: "3Q",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Rockets",
        homeScore: "23",
        awayTeam: "Spurs",
        awayScore: "30",
        quarter: "3Q",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Nets",
        homeScore: "23",
        awayTeam: "Celtics",
        awayScore: "30",
        quarter: "3Q",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Trail Blazers",
        homeScore: "23",
        awayTeam: "Hawks",
        awayScore: "30",
        quarter: "3Q",
        timeRemaining: "2'"
    }
]

const LiveGames = (props) => {
    const classes = useStyles();

    // if (props.liveGames.length === 0) {    uncomment this out for no live games
    //     return (
    //         <h1>No Live Games</h1>
    //     )
    // }

    return (
        <Grid container spacing={0} align="center" justify="center" alignItems="center">
            <Grid item>
                <h2 className={classes.live}>
                    LIVE
                </h2>
            </Grid>
            <Grid item xs={12}>
                <h1 className={classes.liveGameHeading}>Choose a live game</h1>
            </Grid>
            {mockGameData.map(data => //change to props.liveGames
                <Grid item xs={12}>
                    <NbaGameCard {...data} setHomeTeam={props.setHomeTeam} setAwayTeam={props.setAwayTeam} setAwayColor={props.setAwayColor} setHomeColor={props.setHomeColor} setGameView={props.setGameView} setSingleGameData={props.setSingleGameData} />
                </Grid>
            )}
        </Grid>
    )
}

export default LiveGames
