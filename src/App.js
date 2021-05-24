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

const App = () => {
  const [homeColor, setHomeColor] = useState("#FF00A2")
  const [visitorColor, setVisitorColor] = useState("#0061FF")
  const [neutralColor, setNeutralColor] = useState([255, 201, 74])
  const [intervalId, setIntervalId] = useState()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hueConnected, setHueConnected] = useState(false)
  const [hueUsername, setHueUsername] = useState()
  const [liveGames, setLiveGames] = useState([])
  const [homeTeam, setHomeTeam] = useState()
  const [awayTeam, setAwayTeam] = useState()

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

  const getGameScore = () => {
    fetch('/games?' + new URLSearchParams({
      homeTeam: homeTeam
    }))
      .then(response => response.json())
      .then(scores => scoreToXY(parseInt(scores.currentHomeScore), parseInt(scores.currentAwayScore))) //calculate color from scores
      .then(colorXY => setColor(colorXY[0], colorXY[1])) //set color   
  }

  const scoreToXY = (hScore, vScore) => {
    console.log(hScore, vScore)
    const neutralHex = "#FFC94A"
    if (hScore === vScore) {
      return RGBtoXY(neutralColor[0], neutralColor[1], neutralColor[2])
    }
    if (hScore > vScore) {
      let diff = hScore - vScore
      let percent = diff / 10
      let gradientColor = getGradientColor(neutralHex, homeColor, percent)
      let rgb = hexToRgb(gradientColor)
      return RGBtoXY(rgb.r, rgb.g, rgb.b)
    }
    if (hScore < vScore) {
      let diff = vScore - hScore
      let percent = diff / 10
      let gradientColor = getGradientColor(neutralHex, visitorColor, percent)
      let rgb = hexToRgb(gradientColor)
      return RGBtoXY(rgb.r, rgb.g, rgb.b)
    }
  }


  useEffect(() => {
    // check local storage for hue username
    let username = localStorage.getItem("hueUsername")
    if (username) {
      setHueUsername(username)
      setHueConnected(true)
    }
    fetchLiveGames()
  }, []);
  
  useEffect(() => {
    if (homeTeam) {
      connectHue() 
      
    }
  }, [homeTeam])

  const setColor = (x, y) => {
    fetch(`https://192.168.86.30/api/${hueUsername}/lights/3/state`, {
      method: 'PUT',
      body: JSON.stringify({ "xy": [x, y] })
    })
    fetch(`https://192.168.86.30/api/${hueUsername}/lights/2/state`, {
      method: 'PUT',
      body: JSON.stringify({ "xy": [x, y] })
    })
  }

  const fetchLiveGames = () => {
    fetch('/games/games')
      .then(res => res.json())
      .then(res => setLiveGames(res))
  }


  const connectHue = () => {
    // const delay = ms => new Promise(res => setTimeout(res, ms));
    // const { hex: hHex } = getMainColor(hName);
    // const { hex: vHex } = getMainColor(vName);
    // await delay(1000)
    // setHomeColor(hHex, )
    // setVisitorColor(vHex)
    // await delay(3000)
    const intervalId = setInterval(() => {
      getGameScore()
    }, 6000)
    setIntervalId(intervalId)
  }

  const clearInt = () => {
    clearInterval(intervalId)
  }

  return (
    <div>
      {!hueConnected && <ConnectHue setHueUsername={setHueUsername} setHueConnected={setHueConnected} />}
      { hueConnected &&
        <div className="App">
          <LiveGames liveGames={liveGames} setHomeTeam={setHomeTeam} setAwayTeam={setAwayTeam}/>
          <PickColors />
        </div>
      }
    </div>
  );
}

export default App;