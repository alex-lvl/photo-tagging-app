import { useNavigate } from 'react-router-dom';
import Options from './components/Options';

function App(props) {
  let navigate = useNavigate();
  const handleClick = async (e) => {
    let game = e.target;
    props.setGameId(game.id);
    props.handleStart();
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="App">
      <h2>Choose a game to play</h2>
      <div className="games">
        <Options
          characters={props.games[0].characters}
          game={'sleeping beauty'}
          image={props.beautyGame}
          handleClick={handleClick}
          alt={'sleeping beauty game option'}
          id={0}
        />
        <Options
          characters={props.games[1].characters}
          game={'cinderella'}
          image={props.cinderellaGame}
          handleClick={handleClick}
          alt={'cinderella game option'}
          id={1}
        />
      </div>
    </div>
  );
}

export default App;
