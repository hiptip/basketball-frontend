import React, { useState, useEffect } from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Icons from "@material-ui/icons";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Calibration from "./Calibration";
import Grid from '@material-ui/core/Grid';
import PickSingleColor from './PickSingleColor';
import { nbaLogoMap } from '../util/logos'

const useStyles = makeStyles((theme) => ({
    '@keyframes livePulse': {
        from: {
            background:'#ff0000',
            // background:'transparent',
        },
        to: {
            background:'#ff0066',
            // background:'transparent',
        },
    },
    "@keyframes shadowPulse": {
        "0%": {
            boxShadow:'0px 0px 50px rgba(255,255,255,1), inset 0px 0px 20px rgba(0,0,0,.2)'
        },
        "50%": {
            boxShadow:'0px 0px 50px rgba(255,255,255,.5), inset 0px 0px 20px rgba(0,0,0,.5)'
        },
        "100%": {
            boxShadow:'0px 0px 50px rgba(255,255,255,1), inset 0px 0px 20px rgba(0,0,0,.2)'
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
        background: (props) => props.lightColorHex,
    },
    modalBox: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width:'400px',
        padding:'50px',
        borderRadius: 20,
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        // boxShadow:'0 0 100px rgba(255,255,255,1)',
        backgroundColor: "white",
        animation: '$lightGlow 20s ease infinite',
        '@media (max-width:600px)': {
            width: '100vw',
            height:'100vh',
            paddingTop:200
        },
    },
    goBack: {
        cursor: 'pointer',
        fontSize: '3vh',
        padding:50,
        color:'white',
        textTransform:'uppercase'
    },
    live: {
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        fontSize: '1em',
        display:'inline-flex',
        letterSpacing: 2,
        borderRadius:50,
        padding: '10px 15px',
        color: 'white',
        marginBottom:10,
        // border:'2px solid white',
        animation: '$livePulse 1.5s infinite alternate linear',
        boxShadow:'0px 0px 20px rgba(255,255,255,1)',
        [theme.breakpoints.down('xs')]: {
            color:'transparent',
            width:20,
            height:20,
            padding:0
        }
    },
    logoItems: {
        justifyContent:'center',
        textAlign:'center'
    },
    logoContainer: {
        position:'relative',
        overflow:'hidden',
        width: 300,
        height: 300,
        maxHeight: '100%',
        margin:'0 auto',
        borderRadius: '100%',
        animation: '$shadowPulse 5s linear infinite',
        // border:'3px solid white',
        backgroundColor:'rgba(255,255,255,.1)',
        [theme.breakpoints.down('md')]: {
            width: 150,
            height: 150,
        },
        [theme.breakpoints.down('sm')]: {
            width: 100,
            height: 100,
        },
        [theme.breakpoints.down('xs')]: {
            border:'2px solid white',
            width: 20,
            height: 20,
        }
    },
    logo: {
        width:600,
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
        margin:0,
        [theme.breakpoints.down('xs')]: {
            fontSize: '15vw',
        }
    },
    timeContainer: {
        background:'rgba(255,255,255,1)',
        width:'auto',
        display:'inline-block',
        padding:20,
        borderRadius:'40px'

    },
    homeTeamScore: {
        fontSize: '10vw',
        fontWeight: 700,
        margin: '10px 0',
        textAlign:'center',
        lineHeight:'1em',
        margin:0,
        [theme.breakpoints.down('xs')]: {
            fontSize: '15vw',
        }
    },
    timeItems: {
        justifyContent:'center',
        textAlign:'center'
    },
    gameTime: {
        fontSize: '1.7em',
        lineHeight:'1.4em',
        margin:0,
        // color:'white',
        textAlign:'center',
        [theme.breakpoints.down('xs')]: {
            fontSize:'1em'
        }
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
        fontWeight:'bold',
        fontSize:'1em',
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
        background: (props) => props.awayColor,
        padding:10,
        borderRadius:'50px'
    },
    homeColor: {
        display:'inline-block',
        textTransform:'uppercase',
        marginRight:10,
        background: (props) => props.homeColor,
        padding:10,
        borderRadius:'50px'
    },
    calibrateOverlay: {
        display:'none',
        position:'fixed',
        height:'200vh',
        width:'100vw',
        background:'rgba(0,0,0,.5)',
        zIndex:2
    },
    slider: {
        display:'flex',
        alignItems:'center',
        maxWidth:'80%',
        margin:'50px 10% 60px'
    },
    line: {
        background:'black',
        display:'flex',
        width:'100%',
        height:2
    },
    dot: {
        background:'black',
        display:'flex',
        left:'150px',
        position:'absolute',
        height:20,
        width:20,
        borderRadius:20,
    }
}))

const GamePage = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [colorPickTeam, setColorPickTeam] = useState();
    const [initialColor, setInitialColor] = useState();


    const classes = useStyles(props);

    const toggleGameView = () => {
        props.setGameView(!props.gameView)
    }

    const closeScreen = () => {
        setIsOpen(false)
    }

    const mockGameData = [
        {
            homeTeam: "Mavericks",
            homeScore: "88",
            awayTeam: "Knicks",
            awayScore: "105",
            timeRemaining: "2'",
            gameQuarter: "Q2",
            gameTime: "6'",
        }
    ]

    const getLogoUrl = (teamName) => {
        const teamData = nbaLogoMap.find(team => teamName.includes(team.mascot))
        return teamData.logoURL
    }

    const getShortName = (teamName) => {
        const teamData = nbaLogoMap.find(team => teamName.includes(team.mascot))
        return teamData.short
    }

    const getQuarter = (gameTime) => {
        var regex = /'\b\d'/
        var quarter = ''
        console.log(gameTime)
        if (regex.exec(gameTime)) {
            quarter = gameTime[0]
        }
        return quarter
    }

    
    const getTimeRemaining = (gameTime) => {
    }

    const togglePickColorModal = () => {
        setIsColorOpen(true);
    }

    const closeColorScreen = () => {
        setIsColorOpen(false)
    }

    const toggleCalibrateModal = () => {
        setIsOpen(true)
    }

    const changeColor = (team) => {
        setColorPickTeam(team)
        props.team === "home" ? setInitialColor(props.homeColor) : setInitialColor(props.awayScore)
        togglePickColorModal()
    }


    var game = mockGameData.find(game => game.homeTeam === props.homeTeam) //default to state if no value
    // console.log(game)

    return (
        <div className={classes.wrapper}>
            <div className={classes.calibrateOverlay}>
            <div className={classes.modalBox}>
                <h2 className={classes.h2}>CALIBRATE LATENCY</h2>
                <div className={classes.slider}>
                    <div className={classes.line}></div>
                    <div className={classes.dot}></div>
                </div>
                <button className={classes.calibrate}>CONFIRM</button>
            </div>
            </div>
            <h1 className={classes.goBack} onClick={toggleGameView}>🡐 See all games</h1>

            <Grid container className={classes.gameInfo}>
                <Grid item xs={1} sm={3} className={classes.logoItems}>
                    <div className={classes.logoContainer}>
                        <img className={classes.logo} src={getLogoUrl(props.awayTeam)} alt='team logo'></img>
                    </div>
                    <div className={classes.changeColor} onClick={() => changeColor("away")} ><div class={classes.awayColor}></div>Change Color</div>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <div className={classes.nameScore}>
                        <p className={classes.awayTeamName}>{getShortName(props.awayTeam)}</p>
                        <p className={classes.awayTeamScore}>{game ? game.awayScore : ""}</p>
                    </div>
                </Grid>
                <Grid item xs={2} className={classes.timeItems}>
                    <div className={classes.timeContainer}>
                        <div className={classes.live}>
                            LIVE
                        </div>
                        <p className={classes.gameTime}>{game ? "1Q": ""}</p>
                        <p className={classes.gameTime}>{game ? "11'" : ""}</p>
                    </div>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <div className={classes.nameScore}>
                        <p className={classes.homeTeamName}>{getShortName(props.homeTeam)}</p>
                        <p className={classes.homeTeamScore}>{game ? game.homeScore : ""}</p>
                    </div>
                </Grid>
                <Grid item xs={1} sm={3} className={classes.logoItems}>
                    <div className={classes.logoContainer}>
                        <img className={classes.logo} src={getLogoUrl(props.homeTeam)} alt='team logo'></img>
                    </div>
                    <div className={classes.changeColor} onClick={() => changeColor("home")} ><div class={classes.homeColor}></div>Change Color</div>
                </Grid>
            </Grid>
            <button className={classes.calibrate} onClick={toggleCalibrateModal} >CALIBRATE LATENCY</button>
            <Calibration isOpen={isOpen} closeScreen={closeScreen} intervalId={props.intervalId} setIntervalId={props.setIntervalId} setDelay={props.setDelay} delay={props.delay} />
            <PickSingleColor toggleModal={togglePickColorModal} isOpen={isColorOpen} closeScreen={closeColorScreen} team={colorPickTeam} setAwayColor={props.setAwayColor} setHomeColor={props.setHomeColor} awayTeam={props.awayTeam} homeTeam={props.homeTeam} setGameView={props.setGameView} initialColor={initialColor} />
        </div>
    )
}

export default GamePage
