import React, { useState, useEffect } from 'react';
import './App.css';
import { getMainColor, getFullName } from 'nba-color';
import ConnectHue from './components/ConnectHue'
import LiveGames from './components/LiveGames';
import { RGBtoXY, getGradientColor, hexToRgb } from './util/colorFunctions'
import PickColors from './components/PickColors';
import "./styles.css";
import GamePage from './components/GamePage';

const App = () => {
  const [homeColor, setHomeColor] = useState("#1271ff")
  const [awayColor, setAwayColor] = useState("#009e05")
  const [neutralColor, setNeutralColor] = useState([247, 232, 195])
  const [currentIntervalId, setCurrentIntervalId] = useState()
  const [lightColorHex, setLightColorHex] = useState("#f7e8c3")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hueConfigured, setHueConfigured] = useState(false)
  const [hueUsername, setHueUsername] = useState() //"rpFOVnRT3f3nX484o6arbY-HzrnjjObfsihT3n82"
  const [bridgeIp, setBridgeIp] = useState()
  const [liveGames, setLiveGames] = useState([])
  const [homeTeam, setHomeTeam] = useState()
  const [awayTeam, setAwayTeam] = useState()
  const [timeStamp, setTimeStamp] = useState('')
  const [delay, setDelay] = useState(30000)
  const [checkedLights, setCheckedLights] = useState([])
  const [gameView, setGameView] = useState(false)
  const [singleGameData, setSingleGameData] = useState({})

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const getAllGames = () => {
    fetch('/games?' + new URLSearchParams({
      delay: delay,
    }))
      .then(response => response.json())
      .then(response => {
        setLiveGames(response)
      })
  }

  const getGameScore = () => {
    console.log(timeStamp)
    fetch('/games?' + new URLSearchParams({
      homeTeam: homeTeam,
      delay: delay,
      // timeStamp: timeStamp
    }))
      .then(response => response.json())
      .then(response => {
        if (response[0]) {
          // setTimeStamp(response[0].timeStamp) @TODO
          return scoreToXY(parseInt(response[0].homeScore), parseInt(response[0].awayScore))
        }
      }) //calculate color from scores
      .then(colorXY => {
        setColor(colorXY[0], colorXY[1])
      }) //set color   
  }

  const controlLights = (game) => {
    if (game) {
      let colorXY = scoreToXY(parseInt(game.homeScore), parseInt(game.awayScore))
      setColor(colorXY[0], colorXY[1], checkedLights) //seems like this isn't actually updating
    }
  }

  const scoreToXY = (hScore, vScore) => {
    const neutralHex = "#FFC94A"
    if (hScore === vScore) {
      return RGBtoXY(neutralColor[0], neutralColor[1], neutralColor[2])
    }
    if (hScore > vScore) {
      let diff = hScore - vScore
      let percent = diff / 20
      let gradientColor = getGradientColor(neutralHex, homeColor, percent) //update this
      setLightColorHex(gradientColor)
      let rgb = hexToRgb(gradientColor)
      if (rgb) {
        return RGBtoXY(rgb.r, rgb.g, rgb.b)
      }
    }
    if (hScore < vScore) {
      let diff = vScore - hScore
      let percent = diff / 20
      let gradientColor = getGradientColor(neutralHex, awayColor, percent) //update this
      setLightColorHex(gradientColor)
      let rgb = hexToRgb(gradientColor)
      if (rgb) {
        return RGBtoXY(rgb.r, rgb.g, rgb.b)
      }
    }
  }


  useEffect(() => {
    // check local storage for hue username
    let username = localStorage.getItem("hueUsername")
    if (username) {
      setHueUsername(username)
    }
  }, []);

  useEffect(() => {
    if (gameView) {
      var singleGame = liveGames.find(game => game.homeTeam === homeTeam)
      controlLights(singleGame, checkedLights)
    }
  }, [liveGames])

  useEffect(() => { //update this logic
    gamePolling()
  }, [hueConfigured, delay])

  const setColor = (x, y, lights) => {
    for (let [index, val] of lights.entries()) {
      fetch(`http://${bridgeIp}/api/${hueUsername}/lights/${val}/state`, { 
        method: 'PUT',
        body: JSON.stringify({ "xy": [x, y] })
      })
    }

  }

  // const gamePolling = () => {
  //   if (currentIntervalId) {
  //     clearInterval(currentIntervalId)
  //   }
  //   var intId = setInterval(() => {
  //     getAllGames()
  //   }, 6000)
  //   setCurrentIntervalId(intId)
  // }

  const gamePolling = () => {
    if (currentIntervalId) {
      clearInterval(currentIntervalId)
    }
    var intId = setInterval(() => {
      getAllGames()
    }, 1000)
    setCurrentIntervalId(intId)
  }

  return (
    <div>
      {!hueConfigured && <ConnectHue setHueUsername={setHueUsername} setHueConfigured={setHueConfigured} hueUsername={hueUsername} setCheckedLights={setCheckedLights} setBridgeIp={setBridgeIp} bridgeIp={bridgeIp} />}
      { (hueConfigured && !gameView) &&
        <div className="App">
          <LiveGames lightColorHex={lightColorHex} liveGames={liveGames} setHomeTeam={setHomeTeam} setAwayTeam={setAwayTeam} setAwayColor={setAwayColor} setHomeColor={setHomeColor} awayTeam={awayTeam} homeTeam={homeTeam} setGameView={setGameView} setSingleGameData={setSingleGameData} />
          <PickColors setAwayColor={setAwayColor} setHomeColor={setHomeColor} awayTeam={awayTeam} homeTeam={homeTeam} setGameView={setGameView} />
        </div>
      }
      { (hueConfigured && gameView) &&
        <GamePage setDelay={setDelay} setIntervalId={setCurrentIntervalId} intervalId={currentIntervalId} delay={delay} homeTeam={homeTeam} awayTeam={awayTeam} homeColor={homeColor} awayColor={awayColor} liveGames={liveGames} setGameView={setGameView} gameView={gameView} lightColorHex={lightColorHex} />
      }
    </div>
  );
}

export default App;