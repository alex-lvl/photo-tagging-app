function Game(props) {
  return (
    <div className="game-container" onClick={props.handleClick}>
      <img src={props.image} alt={props.alt} id={props.id}/>
    </div>
  );
}

export default Game;