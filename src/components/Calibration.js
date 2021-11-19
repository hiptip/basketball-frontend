import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";  
import Modal from "react-modal";

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
        borderRadius: 20,
        outline: 'none',
        padding: '40px 0',
        width:'700px',
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
        margin:'20px auto 30px auto',
        maxWidth:500,
        textTransform:'uppercase',
        [theme.breakpoints.down('xs')]: {
            fontSize:'1.1em'
        }
    },
    modalFooter: {
        display: 'flex',
        margin:'40px 0 0px',
        justifyContent: 'center',
        fontFamily: 'Roboto Mono',
        fontWeight: 700
    },
}));

const Calibration = React.memo((props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const submitDelay = () => {
        clearInterval(props.currentIntervalId)
        props.setDelay(value * 1000)
        props.closeScreen()
    }


    // const toggleModal = () => {
    //     setIsOpen(!isOpen);
    // }

    // const closeScreen = () => {
    //     props.setIsOpen(false)
    // }


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
                    {/* <img className={classes.logo} src={getLogoUrl(team)}></img> */}
                    </div>
                    <h1 className={classes.modalHeader}>CALIBRATE LATENCY</h1>
                    <h2>{value}s</h2>
                    <Slider value={value} min={0} max={240} aria-label="Disabled slider" onChange={handleChange} />
                    <footer className={classes.modalFooter}>
                        <button onClick={submitDelay}>CONFIRM</button>
                        {/* {(team === 1) ? <button className={classes.nextButton} onClick={nextScreen}>NEXT</button> : <div><button className={classes.prevButton} onClick={prevScreen}>BACK</button><button className={classes.nextButton} onClick={nextScreen}>NEXT</button></div>} */}
                    </footer>
                </div>
            </Modal>
        </div>
    )
})

export default Calibration
