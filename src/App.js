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

const App = () => {
  const [homeColor, setHomeColor] = useState("#2626ff")
  const [visitorColor, setVisitorColor] = useState("#fa0021")
  const [neutralColor, setNeutralColor] = useState([255, 201, 74])
  const [intervalId, setIntervalId] = useState()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hueConnected, setHueConnected] = useState(false)
  const [hueUsername, setHueUsername] = useState("rpFOVnRT3f3nX484o6arbY-HzrnjjObfsihT3n82")
  const [liveGames, setLiveGames] = useState([])
  const [homeTeam, setHomeTeam] = useState("Dallas Mavericks")
  const [awayTeam, setAwayTeam] = useState()
  const [timeStamp, setTimeStamp] = useState('')
  const [delay, setDelay] = useState(67000)

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
        console.log(response)
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
          console.log(response[0].games)
          // setTimeStamp(response[0].timeStamp)
          return scoreToXY(parseInt(response[0].homeScore), parseInt(response[0].awayScore))
        }
      }) //calculate color from scores
      .then(colorXY => {
        setColor(colorXY[0], colorXY[1])
      }) //set color   
  }

  const scoreToXY = (hScore, vScore) => {
    console.log("asdfasdfasdfasd")
    const neutralHex = "#FFC94A"
    if (hScore === vScore) {
      console.log("ASDFASDFSADF")
      return RGBtoXY(neutralColor[0], neutralColor[1], neutralColor[2])
    }
    if (hScore > vScore) {
      let diff = hScore - vScore
      console.log("ASDFASDFASDF")
      let percent = diff / 15
      let gradientColor = getGradientColor(neutralHex, homeColor, percent)
      let rgb = hexToRgb(gradientColor)
      return RGBtoXY(rgb.r, rgb.g, rgb.b)
    }
    if (hScore < vScore) {
      let diff = vScore - hScore
      console.log("ASDFASDFASDF")
      let percent = diff / 15
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
    // fetchLiveGames()
  }, []);

  useEffect(() => {
    if (homeTeam) {
      connectHue()

    }
  }, [homeTeam])

  const setColor = (x, y) => {
    fetch(`https://192.168.1.219/api/dVMIVrgTp3H-EXQSGMk1R-30s2Oej4Fs3T-Wx0m9/lights/7/state`, { //get correct ip address
      method: 'PUT',
      body: JSON.stringify({ "xy": [x, y] })
    })
    // fetch(`https://192.168.86.30/api/${hueUsername}/lights/2/state`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ "xy": [x, y] })
    // })
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
      getAllGames()
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
          <LiveGames liveGames={liveGames} setHomeTeam={setHomeTeam} setAwayTeam={setAwayTeam} />
          <PickColors />
          <ChooseLights />
        </div>
      }
    </div>
  );
}

export default App;