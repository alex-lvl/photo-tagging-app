import { useNavigate } from "react-router-dom";
import './App.css';
import Options from './components/Options';
import beautyGame from './images/princess-beauty.png';
import cinderellaGame from './images/princess-cinderella.png';

function App() {
  let navigate = useNavigate();

  const handleClick = async (e) => {
      let game = e.target
      console.log(game);
      navigate(`/game/${game.id}`);
  };

  return (
    <div className="App">
      <div className="games">
        <Options
          image={beautyGame}
          handleClick={handleClick}
          alt={'sleeping beauty game option'}
          id={1}
        />
        <Options
          image={cinderellaGame}
          handleClick={handleClick}
          alt={'cinderella game option'}
          id={2}
        />
      </div>
    </div>
  );
}

export default App;
