import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";

Modal.setAppElement("#root");

const useStyles = makeStyles({
    mymodal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        borderRadius: 4,
        outline: 'none',
        padding: 20,
        height: '70%',
        width: '40%'
    },
    myoverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    }
})

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

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const nextScreen = () => {
        if (team === 2) {
            props.setHomeColor(teamColor)
            props.setGameView(true)
            toggleModal()
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

    return (
        <div className="App">
            <button onClick={toggleModal}>Open modal</button>

            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className={classes.mymodal}
                overlayClassName={classes.myoverlay}
                closeTimeoutMS={500}
            >
                <div>
                    <p>Logo</p>
                    <h1>Choose Team {team} Color</h1>
                    <ChromePicker
                        // onChangeComplete={handleChangeComplete} 
                    />
                    {(team === 1) ? <button onClick={nextScreen}>NEXT</button> : <div><button onClick={prevScreen}>BACK</button><button onClick={nextScreen}>NEXT</button></div>}
                </div>
            </Modal>
        </div>
    )
})

export default PickColors