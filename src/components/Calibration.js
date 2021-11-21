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
        padding: '40px',
        width:'700px',
        [theme.breakpoints.down('sm')]: {
            width: '100vw',
            height: '100vh',
        }
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
            paddingTop:200,
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
        fontFamily:'Roboto',
        fontWeight:500,
        margin:'0 0 30px 0',
    },
    modalFooter: {
        display: 'flex',
        margin:'40px 0 0px',
        justifyContent: 'center',
        fontFamily: 'Roboto Mono',
        fontWeight: 700
    },
    buttonStyle: {
        display:'flex',
        alignItems:'center',
        cursor: 'pointer',
        fontSize: '1em',
        fontFamily:'Roboto',
        fontWeight:'500',
        border:'none',
        margin:'0 auto',
        padding:'20px 30px',
        textTransform:'uppercase',
        borderRadius:'50px',
    },
    buttonBlack: {
        backgroundColor:'black',
        color:'white'
    },
    modalSlider: {
        marginBottom:30,
        '@media (max-width:600px)': {
            width: '80vw'
        },
    }
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
                className={classes.modalBox}
                overlayClassName={classes.myoverlay}
                closeTimeoutMS={300}
                shouldCloseOnOverlayClick={true}
            >
                <div>
                    <div class={classes.logoContainerColorPicker}>
                    {/* <img className={classes.logo} src={getLogoUrl(team)}></img> */}
                    </div>
                    <h1 className={classes.modalHeader}>Calibrate Latency</h1>
                    <h2>{value}s</h2>
                    <Slider className={classes.modalSlider} value={value} min={0} max={240} aria-label="Disabled slider" onChange={handleChange} />
                        <button onClick={submitDelay} className={`${classes.buttonStyle} ${classes.buttonBlack}`}>CONFIRM</button>
                </div>
            </Modal>
        </div>
    )
})

export default Calibration
