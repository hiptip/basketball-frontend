import React, { useState } from 'react'
import WaitingScreen from './WaitingScreen'
import { makeStyles } from "@material-ui/core/styles";
import BGImage from '../assets/bg1.svg';
import BBall from '../assets/splash-basketball.svg'
import Static from '../assets/splash-lockup.svg'
import BridgeGif from '../assets/philips-loader.gif'
import ChooseLights from './ChooseLights';

const useStyles = makeStyles((theme) => ({
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
    "@keyframes lightGlow": {
        "0%": {
            boxShadow:'0 0 10px rgba(255,255,255,.2)',
        },
        "50%": {
            boxShadow:'0 0 500px rgba(255,255,255,1)',
        },
        "100%": {
            boxShadow:'0 0 10px rgba(255,255,255,.2)',
        }
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
    lines: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
        backgroundImage: `url(${BBall})`,
        backgroundPosition: 'center',
        backgroundSize: '250% 250%',
        backgroundRepeat: 'no-repeat',
        opacity: 0.05,
        boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.5)'

    },
    center: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    },
    staticImage: {
        width: '100%',
        paddingBottom: 40,
        // filter: 'dropShadow(50px 5px 5px #222)' get this working
    },
    button: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '100px',
        width: 230,
        fontFamily: 'Roboto Mono',
        fontWeight: 700,
        '&:hover': {
            backgroundColor: '#333131',
        },
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
        backgroundColor: "white",
        animation: '$lightGlow 20s ease infinite',
        '@media (max-width:600px)': {
            width: '100vw',
            height:'100vh',
            paddingTop:200
        },
    },
    loader: {
        maxWidth: "150px",
    },
    heading: {
        textTransform:'uppercase',
        margin:'30px 0 0 0',
        '@media (max-width:600px)': {
            fontSize:'1.1em'
        },
    },
    info: {
        position: "absolute",
        width: "60%",
        margin: 'auto',
        bottom: "20%",
        right: 0,
        left: 0,
        fontSize: '1rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
    }
}));

const ConnectHue = (props) => {
    const classes = useStyles();
    const [intervalId, setIntervalId] = useState()
    const [waiting, setWaiting] = useState(false)
    // const [bridgeIp, setBridgeIp] = useState()
    const [hueConnected, setHueConnected] = useState(false)
    const [lights, setLights] = useState({})

    const getBridgeApi = () => {
        setWaiting(true)
        fetch("https://discovery.meethue.com/")
            .then(res => res.json())
            .then(res => linkHue(res))
    }

    const linkHue = (res) => {
        const ip = res[0].internalipaddress
        props.setBridgeIp(ip)
        const intId = setInterval(() => {
            fetch(`http://${ip}/api`, {
                method: 'POST',
                body: JSON.stringify({ "devicetype": "hue-nba" })
            })
                .then(res => res.json())
                .then(res => checkSuccess(res, ip))
        }, 3000)
        setIntervalId(intId)
        setTimeout(() => {
            clearInterval(intId)
        }, 30000)
    }

    const getLights = (ip) => {
        fetch(`https://${ip}/api/${props.hueUsername}/lights`)
            .then(res => res.json())
            .then(res => {
                setLights(res)
                props.setLights(res)
            })

    }

    const checkSuccess = (res, ip) => {
        const obj = res[0]
        if ('success' in obj) {
            clearInterval(intervalId)
            localStorage.setItem('hueUsername', obj["success"]["username"])
            props.setHueUsername(obj["success"]["username"])
            setHueConnected(true)
            getLights(ip)
        }
    }

    return (
        <div className={classes.background}>
            <div className={classes.lines}></div>
            {}
            {(!waiting && !hueConnected) &&
                <div className={classes.mymodal}>
                    <div className={classes.center}>
                        <img className={classes.staticImage} src={Static} alt="" />
                        <button className={classes.button} onClick={getBridgeApi}>Start Pairing</button>
                    </div>

                </div>
            }
            {(waiting && !hueConnected) &&
                <div class={classes.modalBox}>
                    <div>
                    <img className={classes.loader} src={BridgeGif} alt="" />
                    </div>
                    <h1 className={classes.heading}>Click the button on your hub to pair</h1>
                </div>
            }
            {hueConnected &&
                <ChooseLights lights={lights} setCheckedLights={props.setCheckedLights} setHueConfigured={props.setHueConfigured} bridgeIp={props.bridgeIp} hueUsername={props.hueUsername} />
            }
        </div>
    )
}

export default ConnectHue
