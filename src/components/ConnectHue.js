import React, { useState } from 'react'
import WaitingScreen from './WaitingScreen'

const ConnectHue = (props) => {
    const [intervalId, setIntervalId] = useState()
    const [waiting, setWaiting] = useState(false)
    const [bridgeIp, setBridgeIp] = useState()

    const getBridgeApi = () => {
        setWaiting(true)
        fetch("https://discovery.meethue.com/")
            .then(res => res.json())
            .then(res => linkHue(res))
    }

    const linkHue = (res) => {
        const ip = res[0].internalipaddress
        setBridgeIp(ip)
        const intId = setInterval(() => {
            fetch(`https://${ip}/api/`, {
                method: 'POST',
                body: JSON.stringify({ "devicetype": "hue-nba" })
            })
                .then(res => res.json())
                .then(res => checkSuccess(res))
        }, 3000)
        setIntervalId(intId)
        setTimeout(() => {
            clearInterval(intId)
        }, 30000)
    }

    const checkSuccess = (res) => {
        const obj = res[0]
        if ('success' in obj) {
            console.log("ASDFASDFASDFASDFASDF")
            clearInterval(intervalId)
            localStorage.setItem('hueUsername', obj["success"]["username"])
            props.setHueUsername(obj["success"]["username"])
            props.setHueConnected(true)
        }
    }

    return (
        <div>
            {!waiting && 
                <div>
                <button onClick={getBridgeApi}>Pair with Hue</button> 
                <h1>{bridgeIp}</h1>
                </div>
            }
            {waiting && 
                <WaitingScreen />
            }
        </div>
    )
}

export default ConnectHue