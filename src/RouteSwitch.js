import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import './App.css';
import App from './App';
import Nav from './components/Nav';
import Game from './components/Game';
import beautyGame from './images/princess-beauty.png';
import cinderellaGame from './images/princess-cinderella.png';
import cinderella from './images/cinderella-cinderella.png';
import prince from './images/prince-cinderella.png';
import wickedStepMother from './images/wickedstepmother-cinderella.png';
import sleepingBeauty from './images/sleepingbeauty.png';
import kindFairy from './images/kindfairy-sleepbeauty.png';
import wickedFairy from './images/wickedfairy-sleepbeauty.png';
import Leaderboard from './components/Leaderboard';

const RouteSwitch = () => {
  const [gameOver, setGameOver] = useState(true);
  useEffect(() => {
    return () => setGameOver(false);
  }, []);
  const [gameId, setGameId] = useState(1);
  const [centiseconds, setCentiseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [centiSpanse, setCentiSpanse] = useState(0);
  const [secSpanse, setSecSpanse] = useState(0);
  const [minSpanse, setMinSpanse] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [games, setGames] = useState([
    {
      id: 1,
      gameImage: beautyGame,
      characters: [
        {
          src: sleepingBeauty,
          name: 'sleeping beauty',
          coordinate: [6.5, 34],
          id: 0,
        },
        {
          src: kindFairy,
          name: 'kind fairy',
          coordinate: [55, 59],
          id: 1,
        },
        {
          src: wickedFairy,
          name: 'wicked fairy',
          coordinate: [27, 55],
          id: 2,
        },
      ],
    },
    {
      id: 2,
      gameImage: cinderellaGame,
      characters: [
        {
          src: cinderella,
          name: 'cinderella',
          coordinate: [36, 68],
          id: 0,
        },
        {
          src: prince,
          name: 'prince',
          coordinate: [28.5, 33],
          id: 1,
        },
        {
          src: wickedStepMother,
          name: 'wicked step mother',
          coordinate: [55, 52],
          id: 2,
        },
      ],
    },
  ]);

  const handleReset = () => {
    handleStop();
    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    setCentiSpanse(0);
    setSecSpanse(0);
    setMinSpanse(0);
    setGameOver(false);
    handleStart();
  };

  const handleStop = () => {
    console.log(`${minutes}:${seconds}:${centiseconds}`);
    let total = parseInt(minutes) * 60 + parseInt(seconds);
    setTotalSeconds(total + '.' + parseInt(centiseconds));
    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    clearInterval(centiSpanse);
    clearInterval(secSpanse);
    clearInterval(minSpanse);
  };

  const handleStart = () => {
    if (!gameOver) {
      let startTime = Date.now();

      const milliInterval = setInterval(function () {
        let elapsedTime = Date.now() - startTime;
        let milli = ((elapsedTime / 1000) % 1).toFixed(2);
        let parsedMilli = milli.toString().split('.')[1];
        setCentiseconds(parsedMilli);
      }, 10);
      setCentiSpanse(milliInterval);

      const secInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        setSeconds((seconds) => {
          if (seconds <= 60) {
            return Math.floor((elapsedTime / 1000 / 1) % 60);
          } else {
            return 0;
          }
        });
      }, 1000);
      setSecSpanse(secInterval);

      const minInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        setMinutes(Math.floor((elapsedTime / 1000 / 60) % 60));
      }, 60000);
      setMinSpanse(minInterval);
    } else {
      return handleStop;
    }
  };

  //wrong method of hooks. exhaustive dependecy
  useEffect(() => {
    if (gameOver) {
      handleStop();
    } else {
      handleStart();
    }
  }, [gameOver]);

  //this synchronizes the change of state from a child component
  const wrapperSetGameOver = useCallback(
    (val) => {
      setGameOver(val);
    },
    [setGameOver]
  );

  return (
    <BrowserRouter>
      <Nav minutes={minutes} seconds={seconds} centiseconds={centiseconds} />
      <Routes>
        <Route
          path="/"
          element={
            <App
              cinderellaGame={cinderellaGame}
              beautyGame={beautyGame}
              handleStart={handleStart}
              games={games}
              setGameId={setGameId}
            />
          }
        />
        <Route
          path="/game/:gameId"
          element={
            <Game
              image={games[gameId].gameImage}
              alt={'beauty game'}
              id={games[gameId].id}
              characters={games[gameId].characters}
              handleStart={handleStart}
              handleStop={handleStop}
              handleReset={handleReset}
              gameOver={gameOver}
              wrapperSetGameOver={wrapperSetGameOver}
              setGameId={setGameId}
              totalSeconds={totalSeconds}
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              cinderellaGame={cinderellaGame}
              beautyGame={beautyGame}
              games={games}
              setGameId={setGameId}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
