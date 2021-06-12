import React, { useState, useEffect } from 'react';
import './App.css';
import { getMainColor, getFullName } from 'nba-color';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ConnectHue from './components/ConnectHue'
import LiveGames from './components/LiveGames';
import { RGBtoXY, getGradientColor, hexToRgb } from './util/colorFunctions'
import PickColors from './components/PickColors';
import "./styles.css";
import ChooseLights from './components/ChooseLights';
import GamePage from './components/GamePage';

const App = () => {
  const [homeColor, setHomeColor] = useState("#1271ff")
  const [awayColor, setAwayColor] = useState("#009e05")
  const [neutralColor, setNeutralColor] = useState([255, 201, 74])
  const [intervalId, setIntervalId] = useState()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hueConfigured, setHueConfigured] = useState(false)
  const [hueUsername, setHueUsername] = useState("rpFOVnRT3f3nX484o6arbY-HzrnjjObfsihT3n82")
  const [bridgeIp, setBridgeIp] = useState()
  const [liveGames, setLiveGames] = useState([])
  const [homeTeam, setHomeTeam] = useState()
  const [awayTeam, setAwayTeam] = useState()
  const [timeStamp, setTimeStamp] = useState('')
  const [delay, setDelay] = useState(45000)
  const [checkedLights, setCheckedLights] = useState([])
  const [gameView, setGameView] = useState(false)
  const [singleGameData, setSingleGameData] = useState({})

  const nbaTeams = [
    'ATLANTA HAWKS',
    'BOSTON CELTICS',
    'BROOKLYN NETS',
    'CHARLOTTE HORNETS',
    'CHICAGO BULLS',
    'CLEVELAND CAVALIERS',
    'DALLAS MAVERICKS',
    'DENVER NUGGETS',
    'DETROIT PISTONS',
    'GOLDEN STATE WARRIORS',
    'HOUSTON ROCKETS',
    'INDIANA PACERS',
    'LOS ANGELES CLIPPERS',
    'LOS ANGELES LAKERS',
    'MEMPHIS GRIZZLIES',
    'MIAMI HEAT',
    'MILWAUKEE BUCKS',
    'MINNESOTA TIMBERWOLVES',
    'NEW ORLEANS PELICANS',
    'NEW YORK KNICKS',
    'OKLAHOMA CITY THUNDER',
    'ORLANDO MAGIC',
    'PHILADELPHIA 76ERS',
    'PHOENIX SUNS',       
    'PORTLAND TRAIL BLAZERS',
    'SACRAMENTO KINGS',
    'SAN ANTONIO SPURS',
    'TORONTO RAPTORS',
    'UTAH JAZZ',
    'WASHINGTON WIZARDS'
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getAllGames = () => {
    fetch('/games?' + new URLSearchParams({
      delay: delay,
    }))
      .then(response => response.json())
      .then(response => {
        console.log("ASDFsadf")
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
          console.log(response[0])
          // setTimeStamp(response[0].timeStamp)
          return scoreToXY(parseInt(response[0].homeScore), parseInt(response[0].awayScore))
        }
      }) //calculate color from scores
      .then(colorXY => {
        setColor(colorXY[0], colorXY[1])
      }) //set color   
  }

  const controlLights = (game) => {
    console.log(game)
    let colorXY = scoreToXY(parseInt(game.homeScore), parseInt(game.awayScore))
    setColor(colorXY[0], colorXY[1], checkedLights)
  }

  const scoreToXY = (hScore, vScore) => {
    const neutralHex = "#FFC94A"
    const home = "#1271ff"
    const away = "#009e05"
    if (hScore === vScore) {
      return RGBtoXY(neutralColor[0], neutralColor[1], neutralColor[2])
    }
    if (hScore > vScore) {
      let diff = hScore - vScore
      let percent = diff / 15
      let gradientColor = getGradientColor(neutralHex, home, percent) //update this
      console.log(gradientColor)
      let rgb = hexToRgb(gradientColor)
      return RGBtoXY(rgb.r, rgb.g, rgb.b)
    }
    if (hScore < vScore) {
      let diff = vScore - hScore
      let percent = diff / 15
      let gradientColor = getGradientColor(neutralHex, away, percent) //update this
      let rgb = hexToRgb(gradientColor)
      return RGBtoXY(rgb.r, rgb.g, rgb.b)
    }
  }


  useEffect(() => {
    // check local storage for hue username
    let username = localStorage.getItem("hueUsername")
    if (username) {
      setHueUsername(username)
    }
    // fetchLiveGames()
  }, []);

  useEffect(() => {
    if (gameView) {
      console.log("controlling the lights")
      if (singleGameData) {
        controlLights(singleGameData, checkedLights)
      }
    }
  }, [liveGames])

  useEffect(() => { //update this logic
    connectHue()
  }, [hueConfigured])

  const setColor = (x, y, lights) => {
    console.log(lights)
    for (const light in lights) {
      fetch(`https://${bridgeIp}/api/${hueUsername}/lights/${light}/state`, { //get correct ip address
        method: 'PUT',
        body: JSON.stringify({ "xy": [x, y] })
      })
    }
    // fetch(`https://192.168.86.30/api/${hueUsername}/lights/2/state`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ "xy": [x, y] })
    // })
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
        <GamePage homeTeam={homeTeam} awayTeam={awayTeam} homeColor={homeColor} awayColor={awayColor} liveGames={liveGames} />
      }
    </div>
  );
}

export default App;