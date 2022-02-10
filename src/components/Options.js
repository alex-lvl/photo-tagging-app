function Options(props) {
  const characters = props.characters.map((character) => (
    <div className="character" id={character.id} key={character.id}>
      <img
        src={character.src}
        alt={character.name}
        className="character-image"
      />
      <span className="character-name">{character.name}</span>
    </div>
  ));

  return (
    <div className="game-container">
      <img src={props.image} alt={props.alt} id={props.id} />
      <h4>{props.game}</h4>
      <p>Find these characters:</p>
      {characters}
      <button className="start-btn" id={props.id} onClick={props.handleClick}>
        start game
      </button>
    </div>
  );
}

export default Options;
