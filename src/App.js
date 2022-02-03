import { useNavigate } from 'react-router-dom';
import Options from './components/Options';

function App(props) {
  let navigate = useNavigate();
  const handleClick = async (e) => {
    let game = e.target;
    console.log(game);
    props.setGameId(game.id)
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="App">
      <div className="games">
        <Options
          image={props.beautyGame}
          handleClick={handleClick}
          alt={'sleeping beauty game option'}
          id={1}
        />
        <Options
          image={props.cinderellaGame}
          handleClick={handleClick}
          alt={'cinderella game option'}
          id={2}
        />
      </div>
    </div>
  );
}

export default App;
