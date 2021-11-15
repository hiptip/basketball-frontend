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
        width: 600,
        height: 121,
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            // height: '40%'
          },
        left: 398,
        top: 231,
        background: '#FFFFFF',
        // opacity: 0.2,
        boxShadow: '1px 5px 10px 4px rgb(242, 245, 248)',
        borderRadius: 12,
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        '&:hover': {
            border: '1px solid grey'
        }
        // display: 'inline-block'
    },
    // awayTeam: {
    //     display: 'inline-block'
    // },
    // homeTeam: {
    //     display: 'inline-block'
    // },
    teamName: {
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        // lineHeight: 21,
        // display: 'flex',
        // alignItems: 'center'
    },
    score: {
        fontFamily: 'Roboto Mono',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 32,
    },
    // centerSpread: {
    //     alignItems: 'center'
    // },
    stats: {
        display: 'inline-block',
    },
    vl: {
        position: 'relative',
        borderLeft: '2px solid #EFEFEF',
        height: 15.5,
        left: '50%'
    },
    logo: {
        // background: 'url("https://dl.dropbox.com/s/xghc9v5bvlu9d1s/bucks.png")',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: '150% 150%',
        // backgroundPosition: 'center',
        borderRadius: '50%',
        height: 60,
        width: 60
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
            <Grid container onClick={() => setTeams(props.homeTeam, props.awayTeam)}>
                <Grid item xs={5}>
                    <div className={classes.awayTeam}>
                        <img className={classes.logo} src={getLogoUrl(props.awayTeam)}></img>
                        <div className={classes.stats}>
                            <p className={classes.teamName}>{props.awayTeam}</p>
                            <p className={classes.score}>{props.awayScore}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className={classes.centerSpread}>
                        <div className={`${classes.vl} ${classes.topLine}`}></div>
                        <p>{props.gameTime}</p>
                        <p>{ props.timeRemaining }</p>
                        <div className={`${classes.vl} ${classes.bottomLine}`}></div>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className={classes.homeTeam}>
                        <div className={classes.stats}>
                            <p className={classes.teamName}>{props.homeTeam}</p>
                            <p className={classes.score}>{props.homeScore}</p>
                        </div>
                        <img className={classes.logo} src={getLogoUrl(props.homeTeam)}></img>
                    </div>
                </Grid>
            </Grid>
            <PickColors toggleModal={toggleModal} isOpen={isOpen} closeScreen={closeScreen} setAwayColor={props.setAwayColor} setHomeColor={props.setHomeColor} awayTeam={props.awayTeam} homeTeam={props.homeTeam} setGameView={props.setGameView} />
        </div>
    );
}

export default NbaGameCard