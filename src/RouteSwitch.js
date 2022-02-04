import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

const RouteSwitch = () => {
  const [gameOver, setGameOver] = useState(true);
  useEffect(() => {
    setGameOver(true);
  }, [gameOver]);
  const [gameId, setGameId] = useState(1);
  const [centiseconds, setCentiseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [centiSpanse, setCentiSpanse] = useState(0);
  const [secSpanse, setSecSpanse] = useState(0);
  const [minSpanse, setMinSpanse] = useState(0);
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

  const handleStop = () => {
    console.log(`${minutes}:${seconds}:${centiseconds}`);
    let total = parseInt(minutes) * 60 + parseInt(seconds);
    let totalSeconds = total + '.' + parseInt(centiseconds);
    console.log(totalSeconds);
    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    setGameOver(true);
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
              gameOver={gameOver}
              setGameOver={setGameOver}
              setGameId={setGameId}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
