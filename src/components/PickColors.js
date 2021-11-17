import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";
import { nbaLogoMap } from '../util/logos'

Modal.setAppElement("#root");

const useStyles = makeStyles((theme) => ({
    mymodal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        borderRadius: 10,
        outline: 'none',
        padding: '40px 0',
        width: '40%',
        minWidth:'500px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%'
        }
    },
    myoverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    modalHeader: {
        textAlign: 'center',
        fontFamily: 'Roboto Mono',
        margin:'20px 0 30px 0',
        textTransform:'uppercase'
    },
    logo: {
        height: 200,
        width: 200,
        marginLeft:'-50%',
        marginTop:'-50%',
    },
    logoContainerColorPicker: {
        position:'relative',
        overflow:'hidden',
        width:100,
        maxWidth: '100%',
        height:100,
        margin:'auto',
        borderRadius: '100%',
        border:'5px solid black',
        backgroundColor:'#eee',
    },
    colorPicker: {
        display: 'block',
        margin: 'auto',
        minWidth: 300,
        height: 'auto'

    },
    modalFooter: {
        display: 'flex',
        margin:'40px 0 0px',
        justifyContent: 'center',
        fontFamily: 'Roboto Mono',
        fontWeight: 700
    },
    nextButton: {
        padding:'15px 30px',
        cursor:'pointer',
        fontFamily:'Roboto Mono',
        margin:5,
        borderStyle: 'solid',
        borderWidth: '1',
        borderColor: 'black',
        borderRadius: 100,
        background: 'black',
        color: 'white',
        fontSize:'1em',
        fontWeight:'bold'
    },
    prevButton: {
        padding:'15px 30px',
        cursor:'pointer',
        fontFamily:'Roboto Mono',
        margin:5,
        borderStyle: 'solid',
        borderWidth: '1',
        borderColor: 'black',
        borderRadius: 100,
        background: 'white',
        color: 'black',
        fontSize:'1em',
        fontWeight:'bold'
    }
}));

const PickColors = React.memo((props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [teamColor, setTeamColor] = useState()
    const [team, setTeam] = useState(1)
    const [logo, setLogo] = useState()
    const [name, setName] = useState()

    const handleChangeComplete = (color) => {
        console.log(color.hex)
        setTeamColor(color.hex)
    }

    // const toggleModal = () => {
    //     setIsOpen(!isOpen);
    // }

    // const closeScreen = () => {
    //     props.setIsOpen(false)
    // }

    const nextScreen = () => {
        if (team === 2) {
            props.setHomeColor(teamColor)
            props.setGameView(true)
            props.toggleModal()
        }
        props.setAwayColor(teamColor)
        setTeam(team + 1)
        setLogo(props.homeLogo)
        setName(props.homeName)

    }

    const prevScreen = () => {
        setTeam(team - 1)
        setLogo(props.awayLogo)
        setName(props.awayName)
    }

    const getLogoUrl = (teamNum) => {
        const teamName = teamNum === 1 ? props.awayTeam : props.homeTeam
        if (teamName) {
            const teamData = nbaLogoMap.find(t => teamName.includes(t.mascot))
            return teamData.logoURL
        }
        return ""
    }

    return (
        <div className="App">

            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.closeScreen}
                contentLabel="My dialog"
                className={classes.mymodal}
                overlayClassName={classes.myoverlay}
                closeTimeoutMS={300}
                shouldCloseOnOverlayClick={true}
            >
                <div>
                    <div class={classes.logoContainerColorPicker}>
                    <img className={classes.logo} src={getLogoUrl(team)}></img>
                    </div>
                    <h1 className={classes.modalHeader}>Choose {props.awayTeam} Color</h1>
                    <ChromePicker
                        color={teamColor}
                        onChangeComplete={handleChangeComplete}
                        className={classes.colorPicker}
                    />
                    <footer className={classes.modalFooter}>
                        {(team === 1) ? <button className={classes.nextButton} onClick={nextScreen}>NEXT</button> : <div><button className={classes.prevButton} onClick={prevScreen}>BACK</button><button className={classes.nextButton} onClick={nextScreen}>NEXT</button></div>}
                    </footer>
                </div>
            </Modal>
        </div>
    )
})

export default PickColors
