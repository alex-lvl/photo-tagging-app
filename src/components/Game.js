import { useEffect } from 'react';

function Game(props) {
  useEffect(() => {
    props.setGameOver(false);
  }, [props.gameOver]);
  useEffect(props.handleStart, [props.gameOver]);

  const characters = props.characters.map((character) => (
    <div className="character" key={character.id}>
      <img src={character.src} alt={character.name} />
      <span>{character.name}</span>
    </div>
  ));

  return (
    <div>
      <div className="game">
        <img src={props.image} alt={props.alt} id={props.id} />
      </div>
      <div className="characters-container">{characters}</div>
    </div>
  );
}

export default Game;
