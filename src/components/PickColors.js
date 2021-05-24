import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";

Modal.setAppElement("#root");

const useStyles = makeStyles({
    mymodal: {
        position: 'fixed',
        top: 50,
        left: 50,
        transform: 'translate(-50 %, -50 %)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        borderRadius: 4,
        outline: 'none',
        padding: 20,
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

const PickColors = (props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
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
                <div>My modal dialog.</div>
                <button onClick={toggleModal}>Close modal</button>
            </Modal>
        </div>
    )
}

export default PickColors