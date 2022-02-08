function Levels(props) {
  return (
    <div className="game-container">
      <img src={props.image} alt={props.alt} id={props.id} />
      <h4>{props.game}</h4>
    </div>
  );
}

export default Levels;
