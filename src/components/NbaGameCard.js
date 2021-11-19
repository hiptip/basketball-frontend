import React, { useState, useEffect } from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import PickColors from './PickColors';
import { nbaLogoMap } from '../util/logos'


const useStyles = makeStyles((theme) => ({
    root: {
        // position: 'absolute',
        width: 750,
        [theme.breakpoints.down('sm')]: {
            width: 'calc(95% - 24px)',
        },
        padding:'30px 20px',
        marginBottom:20,
        boxShadow: '0px 0px 0px rgba(255, 255, 255, 1)',
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,.1)',
        border: '2px solid rgba(255,255,255,0)',
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        cursor:'pointer',
        [theme.breakpoints.up('sm')]: {
            '&:hover': {
                border: '2px solid rgba(255,255,255,1)',
                boxShadow: '0px 0px 20px rgba(255, 255, 255, .6), inset 0px 0px 20px rgba(255, 255, 255, .4)',
                transform:'scale(1.01)',
                transition:'all .2s ease-out'
            }
        }
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    teamNameAway: {
        fontFamily: 'Roboto Mono',
        fontSize: 16,
        color:'white',
        textTransform:'uppercase',
        margin:0,
        marginLeft:10,
        textAlign:'left'
    },
    scoreAway: {
        fontFamily: 'Roboto Mono',
        fontSize: 52,
        margin:0,
        color:'white',
        marginLeft:10,
        textAlign:'left',
        width:'100%',
        [theme.breakpoints.down('xs')]: {
            fontSize: 32
        }
    },
    teamNameHome: {
        fontFamily: 'Roboto Mono',
        textTransform:'uppercase',
        fontSize: 16,
        color:'white',
        margin:0,
        marginRight:10,
        textAlign:'right'
    },
    scoreHome: {
        fontFamily: 'Roboto Mono',
        fontSize: 50,
        color:'white',
        margin:0,
        marginRight:10,
        textAlign:'right',
        [theme.breakpoints.down('xs')]: {
            fontSize: 32
        }
    },
    centerSpread: {
        alignItems: 'center',
        fontSize: 20,
        padding:20,
        color:'white',
        // borderRadius:20,
        // background:'rgba(255,255,255,.1)',
        borderRight:'1px solid white',
        borderLeft:'1px solid white',
        display:'block'
    },
    quarter: {
        margin:0,
    },
    timeRemaining: {
        margin:0,
        marginTop:10
    },
    stats: {
        display: 'inline-block',
        width:'100%',
    },
    vl: {
        position: 'relative',
        borderLeft: '2px solid #EFEFEF',
        height: 15.5,
        left: '50%'
    },
    logo: {
        height: 200,
        width: 200,
        marginLeft:'-50%',
        marginTop:'-50%',
        [theme.breakpoints.down('xs')]: {
            display:'none'
        }
    },
    logoContainer: {
        position:'relative',
        overflow:'hidden',
        width:100,
        maxWidth: '100%',
        height:100,
        borderRadius: '100%',
        // border:'5px solid black',
        backgroundColor:'rgba(255,255,255,.2)',
        [theme.breakpoints.down('xs')]: {
            width: 20,
            height: 20,
            // backgroundColor: props.lightColorHex,
        }
    }
}));


const NbaGameCard = (props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);


    // const routes = {
    //     '/': () => <Home />,
    //     '/teamOneColor': () => <SetColor />,
    //     '/teamTwoColor': () => <SetColor />,
    // };
    // const routeResults = useRoutes(routes);

    const toggleModal = () => {
        console.log()
        setIsOpen(true);
    }

    const closeScreen = () => {
        setIsOpen(false)
    }

    const setTeams = (hTeam, aTeam) => {
        toggleModal()
        props.setHomeTeam(hTeam)
        props.setAwayTeam(aTeam)
        props.setSingleGameData({ //change this logic -- we need to get the info from all games and search for specfiic game there @TODO
            homeTeam: props.homeTeam,
            awayTeam: props.awayTeam,
            homeScore: props.homeScore,
            awayScore: props.awayScore,
            gameTime: props.gameTime
        })
    }

    const getLogoUrl = (teamName) => {
        const team = nbaLogoMap.find(team => teamName.includes(team.mascot))
        return team.logoURL
    }

    return (
        <div className={classes.root} >
            <Grid container className={classes.center} onClick={() => setTeams(props.homeTeam, props.awayTeam)}>
                <Grid item xs={2}>
                        <div className={classes.logoContainer}>
                            <img className={classes.logo} src={getLogoUrl(props.awayTeam)}></img>
                        </div>
                </Grid>
                <Grid item xs={3}>
                        <div className={classes.stats}>
                            <p className={classes.teamNameAway}>{props.awayTeam}</p>
                            <p className={classes.scoreAway}>{props.awayScore}</p>
                        </div>
                </Grid>
                <Grid item xs={2}>
                    <div className={classes.centerSpread}>
                        <p className={classes.quarter}>{props.quarter}</p>
                        <p className={classes.timeRemaining}>{ props.timeRemaining }</p>
                    </div>
                </Grid>
                <Grid item xs={3}>
                        <div className={classes.stats}>
                            <p className={classes.teamNameHome}>{props.homeTeam}</p>
                            <p className={classes.scoreHome}>{props.homeScore}</p>
                        </div>
                </Grid>
                <Grid item xs={2}>
                        <div className={classes.logoContainer}>
                            <img className={classes.logo} src={getLogoUrl(props.homeTeam)}></img>
                        </div>
                </Grid>
            </Grid>
            <PickColors toggleModal={toggleModal} isOpen={isOpen} closeScreen={closeScreen} setAwayColor={props.setAwayColor} setHomeColor={props.setHomeColor} awayTeam={props.awayTeam} homeTeam={props.homeTeam} setGameView={props.setGameView} />
        </div>
    );
}

export default NbaGameCard
