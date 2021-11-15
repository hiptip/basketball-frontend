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
  const [neutralColor, setNeutralColor] = useState([255, 201, 74])
  const [intervalId, setIntervalId] = useState()
  const [lightColorHex, setLightColorHex] = useState("#000000")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hueConfigured, setHueConfigured] = useState(false)
  const [hueUsername, setHueUsername] = useState() //"rpFOVnRT3f3nX484o6arbY-HzrnjjObfsihT3n82"
  const [bridgeIp, setBridgeIp] = useState()
  const [liveGames, setLiveGames] = useState([])
  const [homeTeam, setHomeTeam] = useState()
  const [awayTeam, setAwayTeam] = useState()
  const [timeStamp, setTimeStamp] = useState('')
  const [delay, setDelay] = useState(60000)
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
      console.log(colorXY)
      setColor(colorXY[0], colorXY[1], checkedLights) //seems like this isn't actually updating
    }
  }

  const scoreToXY = (hScore, vScore) => {
    const neutralHex = "#FFC94A"
    const home = "#00BA36"
    const away = "#1D60E5"
    if (hScore === vScore) {
      return RGBtoXY(neutralColor[0], neutralColor[1], neutralColor[2])
    }
    if (hScore > vScore) {
      let diff = hScore - vScore
      let percent = diff / 20
      let gradientColor = getGradientColor(neutralHex, home, percent) //update this
      setLightColorHex(gradientColor)
      let rgb = hexToRgb(gradientColor)
      if (rgb) {
        return RGBtoXY(rgb.r, rgb.g, rgb.b)
      }
    }
    if (hScore < vScore) {
      let diff = vScore - hScore
      let percent = diff / 20
      let gradientColor = getGradientColor(neutralHex, away, percent) //update this
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
    connectHue()
  }, [hueConfigured])

  const setColor = (x, y, lights) => {
    for (const light in lights) {
      fetch(`https://${bridgeIp}/api/${hueUsername}/lights/${light}/state`, { 
        method: 'PUT',
        body: JSON.stringify({ "xy": [x, y] })
      })
    }

  }

  const connectHue = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    var intId = setInterval(() => {
      getAllGames()
    }, 6000)
    setIntervalId(intId)
  }

  return (
    <div>
      {!hueConfigured && <ConnectHue setHueUsername={setHueUsername} setHueConfigured={setHueConfigured} hueUsername={hueUsername} setCheckedLights={setCheckedLights} setBridgeIp={setBridgeIp} />}
      { (hueConfigured && !gameView) &&
        <div className="App">
          <LiveGames liveGames={liveGames} setHomeTeam={setHomeTeam} setAwayTeam={setAwayTeam} setAwayColor={setAwayColor} setHomeColor={setHomeColor} awayTeam={awayTeam} homeTeam={homeTeam} setGameView={setGameView} setSingleGameData={setSingleGameData} />
          <PickColors setAwayColor={setAwayColor} setHomeColor={setHomeColor} awayTeam={awayTeam} homeTeam={homeTeam} setGameView={setGameView} />
        </div>
      }
      { (hueConfigured && gameView) &&
        <GamePage homeTeam={homeTeam} awayTeam={awayTeam} homeColor={homeColor} awayColor={awayColor} liveGames={liveGames} setGameView={setGameView} gameView={gameView} />
      }
    </div>
  );
}

export default App;