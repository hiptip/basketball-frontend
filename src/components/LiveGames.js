import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import NbaGameCard from './NbaGameCard';

const useStyles = makeStyles((theme) => ({
    '@keyframes livePulse': {
        from: {
            background:'#ff0000',
        },
        to: {
            background:'#ff0066',
        },
    },
    "@keyframes gradient": {
        "0%": {
            backgroundPosition: '0% 50%'
        },
        "50%": {
            backgroundPosition: '100% 50%'
        },
        "100%": {
            backgroundPosition: '0% 50%'
        }
    },
    '@keyframes pulse': {
        from: { opacity: 1 },
        to: { opacity: .7 },
    },
    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
        backgroundImage: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        backgroundPosition: 'center, center',
        backgroundSize: '400% 400%',
        backgroundRepeat: 'no-repeat, no-repeat',
        animation: '$gradient 15s ease infinite',
        fontFamily: 'Roboto Mono'
    },
    h2: {
        padding:0,
        margin:'0 0 20px 0',
        fontFamily: 'Roboto Mono',
        color:'white',
        fontSize:'32px',
        textTransform:'uppercase'
    },
    live: {
        marginTop:50,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        fontSize: '1em',
        display:'inline-flex',
        letterSpacing: 2,
        borderRadius:50,
        padding: '10px 15px',
        border:'2px solid white',
        color: 'white',
        animation: '$livePulse 1.5s infinite alternate linear',
        boxShadow:'0px 0px 20px rgba(255,255,255,1)'
    },
    liveGameHeading: {
        textAlign: 'center',
        fontFamily: 'Roboto Mono',
        margin:'20px 0 30px 0',
        textTransform:'uppercase',
        color:'white'
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
        homeScore: "88",
        awayTeam: "Knicks",
        awayScore: "105",
        quarter: "Q4",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Hornets",
        homeScore: "90",
        awayTeam: "Timberwolves",
        awayScore: "79",
        quarter: "Q3",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Suns",
        homeScore: "66",
        awayTeam: "76ers",
        awayScore: "46",
        quarter: "Q3",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Thunder",
        homeScore: "72",
        awayTeam: "Spurs",
        awayScore: "67",
        quarter: "3Q",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Nets",
        homeScore: "43",
        awayTeam: "Celtics",
        awayScore: "50",
        quarter: "2Q",
        timeRemaining: "2'"
    },
    {
        homeTeam: "Trail Blazers",
        homeScore: "23",
        awayTeam: "Hawks",
        awayScore: "30",
        quarter: "1Q",
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
        <Grid container className={classes.background} spacing={0} align="center" justify="center" alignItems="center">
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
