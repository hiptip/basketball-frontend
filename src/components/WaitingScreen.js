import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const WaitingScreen = (props) => {
    return (
        <div>
            <h1>Waiting for you to press the button on your hue</h1>
            <CircularProgress />
        </div>
    )
}

export default WaitingScreen   