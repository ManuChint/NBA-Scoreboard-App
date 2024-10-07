import React, { useState, useEffect } from 'react';
import './App.css';

const nbaTeams = [
  "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
  "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors",
  "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies",
  "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks",
  "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers",
  "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"
];

const colors = [
  "White", "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Black", "Gray"
];

const quarters = ["1st", "2nd", "3rd", "4th"];

function Team(props) {
  const teamStyle = {
    color: props.color,
    fontSize: "24px",
    fontWeight: "bold",
  };

  return (
    <div className="team">
      <h2 style={teamStyle}>{props.name}</h2>
      <div className="abbreviation">{props.abbreviation}</div>
      <div className="score">{props.score}</div>
      <div className="buttons">
        <button onClick={props.onThreePointer}>+3</button>
        <button onClick={props.onTwoPointer}>+2</button>
        <button onClick={props.onFreeThrow}>+1</button>
      </div>
      <div className="buttons">
        <button onClick={props.onSubtractOne}>-1</button>
        <button onClick={props.onSubtract}>-2</button>
        <button onClick={props.onTimeoutAdd}>Add Timeout</button>
        <button onClick={props.onTimeoutSubtract}>Subtract Timeout</button>
        <button onClick={props.onFoulAdd}>Add Foul</button>
        <button onClick={props.onFoulSubtract}>Subtract Foul</button>
      </div>
      <div className="timeout">Timeouts: {props.timeouts}</div>
      <div className="foul">Fouls: {props.fouls}</div>
    </div>
  );
}

function App() {
  const [teamAName, setTeamAName] = useState("Sacramento Kings");
  const [teamBName, setTeamBName] = useState("New Orleans Pelicans");
  const [teamAColor, setTeamAColor] = useState("White");
  const [teamBColor, setTeamBColor] = useState("darkblue");
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [teamATimeouts, setTeamATimeouts] = useState(7);
  const [teamBTimeouts, setTeamBTimeouts] = useState(7);
  const [teamAFouls, setTeamAFouls] = useState(0);
  const [teamBFouls, setTeamBFouls] = useState(0);
  const [inputScore, setInputScore] = useState('');

  const [clock, setClock] = useState(720);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState("1st");


  useEffect(() => {
    if (isRunning && clock > 0) {
      const timer = setTimeout(() => setClock(clock - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isRunning, clock]);

  const handleTeamAChange = (event) => {
    setTeamAName(event.target.value);
  };

  const handleTeamBChange = (event) => {
    setTeamBName(event.target.value);
  };

  const handleTeamAColorChange = (event) => {
    setTeamAColor(event.target.value);
  };

  const handleTeamBColorChange = (event) => {
    setTeamBColor(event.target.value);
  };

  const incrementScore = (team, points) => {
    if (team === 'A') {
      setTeamAScore(prevScore => prevScore + points);
    } else {
      setTeamBScore(prevScore => prevScore + points);
    }
  };

  const decrementScore = (team, points) => {
    if (team === 'A') {
      setTeamAScore(prevScore => prevScore - points);
    } else {
      setTeamBScore(prevScore => prevScore - points);
    }
  };

  const handleTimeoutAdd = (team) => {
    if (team === 'A') {
      setTeamATimeouts(prevTimeouts => prevTimeouts + 1);
    } else {
      setTeamBTimeouts(prevTimeouts => prevTimeouts + 1);
    }
  };

  const handleTimeoutSubtract = (team) => {
    if (team === 'A' && teamATimeouts > 0) {
      setTeamATimeouts(prevTimeouts => prevTimeouts - 1);
    } else if (team === 'B' && teamBTimeouts > 0) {
      setTeamBTimeouts(prevTimeouts => prevTimeouts - 1);
    }
  };

  const handleFoulAdd = (team) => {
    if (team === 'A') {
      setTeamAFouls(prevFouls => prevFouls + 1);
    } else {
      setTeamBFouls(prevFouls => prevFouls + 1);
    }
  };

  const handleFoulSubtract = (team) => {
    if (team === 'A' && teamAFouls > 0) {
      setTeamAFouls(prevFouls => prevFouls - 1);
    } else if (team === 'B' && teamBFouls > 0) {
      setTeamBFouls(prevFouls => prevFouls - 1);
    }
  };

  const updateScore = (team) => {
    const parsedScore = parseInt(inputScore);
    if (!isNaN(parsedScore)) {
      if (team === 'A') {
        setTeamAScore(parsedScore);
      } else {
        setTeamBScore(parsedScore);
      }
    }
    setInputScore('');
  };

  const resetScores = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setTeamATimeouts(7);
    setTeamBTimeouts(7);
    setTeamAFouls(0);
    setTeamBFouls(0);
  };

  const resetClock = () => {
    setClock(720);
  };

  const incrementClock = (seconds) => {
    setClock((prevClock) => prevClock + seconds);
  };

  const decrementClock = (seconds) => {
    if (clock - seconds >= 0) {
      setClock((prevClock) => prevClock - seconds);
    }
  };

  const toggleClock = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Basketball Scoreboard</h1>
      <div className="team-dropdowns">
        <select value={teamAName} onChange={handleTeamAChange}>
          {nbaTeams.map((team, index) => (
            <option key={index} value={team}>{team}</option>
          ))}
        </select>
        <select value={teamBName} onChange={handleTeamBChange}>
          {nbaTeams.map((team, index) => (
            <option key={index} value={team}>{team}</option>
          ))}
        </select>
      </div>
      <div className="color-dropdowns">
        <select value={teamAColor} onChange={handleTeamAColorChange}>
          {colors.map((color, index) => (
            <option key={index} value={color}>{color}</option>
          ))}
        </select>
        <select value={teamBColor} onChange={handleTeamBColorChange}>
          {colors.map((color, index) => (
            <option key={index} value={color}>{color}</option>
          ))}
        </select>
      </div>

      <div className="scoreboard">
        <Team
          name={teamAName}
          color={teamAColor}
          score={teamAScore}
          timeouts={teamATimeouts}
          fouls={teamAFouls}
          onThreePointer={() => incrementScore('A', 3)}
          onTwoPointer={() => incrementScore('A', 2)}
          onFreeThrow={() => incrementScore('A', 1)}
          onSubtractOne={() => decrementScore('A', 1)}
          onSubtract={() => decrementScore('A', 2)}
          onTimeoutAdd={() => handleTimeoutAdd('A')}
          onTimeoutSubtract={() => handleTimeoutSubtract('A')}
          onFoulAdd={() => handleFoulAdd('A')}
          onFoulSubtract={() => handleFoulSubtract('A')}
        />
        <Team
          name={teamBName}
          color={teamBColor}
          score={teamBScore}
          timeouts={teamBTimeouts}
          fouls={teamBFouls}
          onThreePointer={() => incrementScore('B', 3)}
          onTwoPointer={() => incrementScore('B', 2)}
          onFreeThrow={() => incrementScore('B', 1)}
          onSubtractOne={() => decrementScore('B', 1)}
          onSubtract={() => decrementScore('B', 2)}
          onTimeoutAdd={() => handleTimeoutAdd('B')}
          onTimeoutSubtract={() => handleTimeoutSubtract('B')}
          onFoulAdd={() => handleFoulAdd('B')}
          onFoulSubtract={() => handleFoulSubtract('B')}
        />
      </div>

      <div className="clock-container">
        <h2>Clock: {formatTime(clock)}</h2>
        <button onClick={toggleClock}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={() => incrementClock(1)}>+1 sec</button>
        <button onClick={() => incrementClock(5)}>+5 sec</button>
        <button onClick={() => decrementClock(1)}>-1 sec</button>
        <button onClick={() => decrementClock(5)}>-5 sec</button>
        <button onClick={resetClock}>Reset Clock</button>
        <div>
          <label>Quarter: </label>
          <select value={selectedQuarter} onChange={(e) => setSelectedQuarter(e.target.value)}>
            {quarters.map((quarter, index) => (
              <option key={index} value={quarter}>{quarter}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="reset-button" onClick={resetScores}>Reset All</button>
    </div>
  );
}

export default App;
