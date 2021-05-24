import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import NbaGameCard from './NbaGameCard';

const useStyles = makeStyles({
    '@keyframes testAnimation': {
        from: { opacity: 1 },
        to: { opacity: .2 },
      },

    live: {
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        borderStyle: 'solid',
        borderRadius: 15,    
        padding: 3,
        color: 'red',
        animation: '$testAnimation 1.5s infinite alternate ease-in-out'
        
    },
});

const mockGameData = [
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

const LiveGames = (props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3} align="center" justify="center" alignItems="center">
            <Grid item>
                <h1 className={classes.live}>
                    LIVE    
                </h1>
            </Grid>
            {mockGameData.map(data => //change to props.liveGames
                <Grid item xs={12}>
                    <NbaGameCard {...data} setHomeTeam={props.setHomeTeam} setAwayTeam={props.setAwayTeam}/>
                </Grid>
            )}
        </Grid>
    )
}

export default LiveGames