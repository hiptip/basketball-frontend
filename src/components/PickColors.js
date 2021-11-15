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
        padding: 20,
        height: '70%',
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width: '70%',
            height: '80%'
          },
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
        padding: 10,
        fontFamily: 'Roboto Mono'
    },
    logo: {
        borderRadius: '50%',
        // borderStyle: 'solid',
        // borderWidth: '1',
        // borderColor: 'black',
        height: 100,
        width: 100,
        display: 'block',
        margin: 'auto',
        padding: 15
    },
    colorPicker: {
        display: 'block',
        margin: 'auto',
        width: 500
        
    },
    modalFooter: {
        display: 'flex',
        margin: 60,
        justifyContent: 'center',
        fontFamily: 'Roboto Mono',
        fontWeight: 700
    },
    nextButton: {
        width: 220,
        height: 45,
        borderStyle: 'solid',
        borderWidth: '1',
        borderColor: 'black',
        borderRadius: 100,
        background: 'black',
        color: 'white',
        margin: 10
        // flex: 1
    },
    prevButton: {
        width: 220,
        height: 45,
        borderStyle: 'solid',
        borderWidth: '1',
        borderColor: 'black',
        borderRadius: 100,
        background: 'white',
        color: 'black',
        margin: 10
        // flex: 1
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
                    <img className={classes.logo} src={getLogoUrl(team)}></img>
                    {/* <h1 className={classes.modalHeader}>Choose Team {team} Color</h1> */}
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