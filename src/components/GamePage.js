import React, { useState, useEffect } from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Icons from "@material-ui/icons";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import PickColors from './PickColors';
import { nbaLogoMap } from '../util/logos'

const useStyles = makeStyles((theme) => ({
    "@keyframes shadowPulse": {
        "0%": {
            boxShadow:'0px 0px 50px rgba(255,255,255,1)'
        },
        "50%": {
            boxShadow:'0px 0px 30px rgba(255,255,255,.2)'
        },
        "100%": {
            boxShadow:'0px 0px 50px rgba(255,255,255,1)'
        }
    },
    wrapper: {
        // border: '1px solid black',
        width: '100vw',
        height: '101vh',
        display: 'block',
        margin: 'auto',
        marginTop: -22,
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'Roboto Mono',
        background:'#F58426',
    },
    goBack: {
        cursor: 'pointer',
        fontSize: '3vh',
        padding:50,
        color:'white',
        textTransform:'uppercase'
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
    logoItems: {
        justifyContent:'center',
        textAlign:'center'
    },
    logoContainer: {
        position:'relative',
        overflow:'hidden',
        width: 250,
        height: 250,
        maxHeight: '100%',
        margin:'0 auto',
        borderRadius: '100%',
        animation: '$shadowPulse 5s linear infinite',
        // border:'10px solid black',
        backgroundColor:'#f2f2f2',
        [theme.breakpoints.down('md')]: {
            width: 150,
            height: 150,
            border:'8px solid black',
        },
        [theme.breakpoints.down('sm')]: {
            width: 100,
            height: 100,
            border:'5px solid black',
        },
        [theme.breakpoints.down('xs')]: {
            width: 20,
            height: 20,
        }
    },
    logo: {
        width:500,
        height:'auto',
        marginLeft:'-50%',
        marginTop:'-50%',
        [theme.breakpoints.down('md')]: {
            width: 300,
            height: 300,
            marginLeft:'-55%',
            marginTop:'-55%',
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            height: 200,
            marginLeft:'-50%',
            marginTop:'-50%',
        },
        [theme.breakpoints.down('xs')]: {
            display:'none'
        }
    },
    gameInfo: {
        margin:'auto',
        marginTop:'15vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',        /* for single line flex container */
        alignContent: 'center'      /* for multi-line flex container */
    },
    nameScore: {
        color:'white'
    },
    awayTeamName: {
        fontSize: '3vw',
        textTransform: 'uppercase',
        fontWeight:'bold',
        textAlign:'center',
        lineHeight:'1em',
        margin:0,
        [theme.breakpoints.down('sm')]: {
            fontSize:'3vw'
        },
    },
    homeTeamName: {
        fontSize: '3vw',
        textTransform: 'uppercase',
        fontWeight:'bold',
        textAlign:'center',
        lineHeight:'1em',
        margin:0,
        [theme.breakpoints.down('sm')]: {
            fontSize:'3vw'
        },
    },
    awayTeamScore: {
        fontSize: '10vw',
        fontWeight: 700,
        margin: '10px 0',
        textAlign:'center',
        lineHeight:'1em',
        margin:0
    },
    homeTeamScore: {
        fontSize: '10vw',
        fontWeight: 700,
        margin: '10px 0',
        textAlign:'center',
        lineHeight:'1em',
        margin:0
    },
    gameTime: {
        fontSize: '2.5vw',
        lineHeight:'1.2em',
        color:'white',
        textAlign:'center',
    },
    calibrate: {
        display: 'block',
        backgroundColor:'black',
        color:'white',
        padding:'20px 30px',
        border:'none',
        fontFamily:'Roboto Mono',
        fontSize:'1em',
        fontWeight:'bold',
        margin:'40px auto',
        borderRadius:'50px',
        cursor:'pointer'
    },
    changeColor: {
        margin:'0 auto',
        marginTop:'20px',
        lineHeight:'1em',
        display:'inline-flex',
        alignItems:'center',
        color:'black',
        textTransform:'uppercase',
        background:'white',
        padding:'10px 15px',
        borderRadius:'100px',
        '&:hover': {
            cursor:'pointer'
        },
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    },
    awayColor: {
        display:'inline-block',
        textTransform:'uppercase',
        marginRight:10,
        background:'#F58426',
        padding:10,
        borderRadius:'50px'
    },
    homeColor: {
        display:'inline-block',
        textTransform:'uppercase',
        marginRight:10,
        background:'#00538C',
        padding:10,
        borderRadius:'50px'
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
            <h1 className={classes.goBack} onClick={toggleGameView}>🡐 See all games</h1>

            <Grid container className={classes.gameInfo}>
                <Grid item xs={3} className={classes.logoItems}>
                    <div className={classes.logoContainer}>
                        <img className={classes.logo} src={getLogoUrl(props.awayTeam)} alt='team logo'></img>
                    </div>
                    <div className={classes.changeColor}><div class={classes.awayColor}></div>Change Color</div>
                </Grid>
                <Grid item xs={2}>
                    <div className={classes.nameScore}>
                        <p className={classes.awayTeamName}>{props.awayTeam}</p>
                        <p className={classes.awayTeamScore}>{game ? game.awayScore : ""}</p>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    {/* <p>{game.quarter}</p> */}
                    <p className={classes.gameTime}>{game ? game.gameTime : ""}</p>
                </Grid>
                <Grid item xs={2}>
                    <div className={classes.nameScore}>
                        <p className={classes.homeTeamName}>{props.homeTeam}</p>
                        <p className={classes.homeTeamScore}>{game ? game.homeScore : ""}</p>
                    </div>
                </Grid>
                <Grid item xs={3} className={classes.logoItems}>
                    <div className={classes.logoContainer}>
                        <img className={classes.logo} src={getLogoUrl(props.homeTeam)} alt='team logo'></img>
                    </div>
                    <div className={classes.changeColor}><div class={classes.homeColor}></div>Change Color</div>
                </Grid>
            </Grid>
            <button className={classes.calibrate}>CALIBRATE LATENCY</button>
        </div>
    )
}

export default GamePage
