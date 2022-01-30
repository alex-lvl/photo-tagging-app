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
  const [games, setGames] = useState([
    {
      id: 1,
      gameImage: beautyGame,
      characters: [
        {
          src: sleepingBeauty,
          name: 'sleeping beauty',
          id: 0,
        },
        {
          src: kindFairy,
          name: 'kind fairy',
          id: 1,
        },
        {
          src: wickedFairy,
          name: 'wicked fairy',
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
          id: 0,
        },
        {
          src: prince,
          name: 'prince',
          id: 1,
        },
        {
          src: wickedStepMother,
          name: 'wicked step mother',
          id: 2,
        },
      ],
    },
  ]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        {/* change route element */}
        <Route
          path="/game/:gameId"
          element={
            <Game
              image={games[0].gameImage}
              alt={'beauty game'}
              id={games[0].id}
              characters={games[0].characters}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
