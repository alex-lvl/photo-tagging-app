function Nav(props) {
  return (
    <nav className="nav">
      <div className="logo">Where's The Princess</div>
      <div className="stopwatch">
        <span>{props.minutes < 10 ? `0${props.minutes}` : props.minutes}:</span>
        <span>{props.seconds < 10 ? `0${props.seconds}` : props.seconds}:</span>
        <span>
          {props.centiseconds === 0
            ? `0${props.centiseconds}`
            : props.centiseconds}
        </span>
      </div>
    </nav>
  );
}

export default Nav;
