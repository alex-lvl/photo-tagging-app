import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

function Game(props) {
  const [sleepingBeautyCoords, setSleepBeautyCoords] = useState({
    xCoord: 6.5,
    yCoord: 34,
  });
  const [kindFairyCoords, setKindFairyCoords] = useState({
    xCoord: 55,
    yCoord: 59,
  });
  const [wickedWitchCoords, setWickedWitchCoords] = useState({
    xCoord: 27,
    yCoord: 55,
  });

  const [cinderellaCoords, setCinderellaCoords] = useState({
    xCoord: 36,
    yCoord: 68,
  });
  const [princeCoords, setPrinceCoords] = useState({
    xCoord: 28.5,
    yCoord: 33,
  });
  const [wickedStepMotherCoords, setWickedStepMotherCoords] = useState({
    xCoord: 55,
    yCoord: 52,
  });
  useEffect(() => {
    props.setGameOver(false);
  }, [props.gameOver]);
  useEffect(props.handleStart, [props.gameOver]);

  function highlight(e) {
    const highlighter = document.getElementsByClassName('highlighter')[0];
    highlighter.style.display = 'block';
    highlighter.style.top = e.pageY - 20+ 'px';
    highlighter.style.left = e.pageX - 20 + 'px';

    setTimeout(() => {
      highlighter.style.display = 'none';
    }, 750);
  }

  const isFound = (e) => {
    const { width, height } = e.target.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;
    let xPos = Math.round((offsetX / width) * 100);
    let yPos = Math.round((offsetY / height) * 100);
    let characterPosition = [55, 52];

    checkCoords(characterPosition, xPos, yPos);
    highlight(e);

    //SAME AS ABOVE

    // let xCoord = Math.round(
    //   (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    // );
    // let yCoord = Math.round(
    //   (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    // );

    // 'SAME AS E.NATIVEEVENT.OFFSETS

    // let params = "xpos=" + (x - e.target.offsetLeft) + "&ypos=" + (y - e.target.offsetTop);
    
    // 'SAME AS E.NATIVEEVENT.OFFSETY
    // let x = e.pageX;
    // let y = e.pageY;
    // console.log(y - e.target.getBoundingClientRect().y');

    // // calculate percentage, subtract border/endzone percentage(10), map 80% to 100%, calculate yardage
    // console.log(
    //   Math.round((((offsetX / width) * 100 - 10) / 80) * 100),
    //   'offsetx'
    // );
    // // calculate percentage, subtract top-border percentage(5), map 90% to 100%, calculate yardage (53.3 yards total width)
    // console.log(
    //   Math.round((((offsetY / height) * 100 - 5) / 90) * 53.3),
    //   'offset y'
    // );
  };

  function checkCoords(charPosition, x, y) {
    if (withinRange(charPosition, 'x', x) && withinRange(charPosition, 'y', y)) {
      console.log('waldo found!');
      return '√ WALDO FOUND!';
    } else {
      console.log('not within range');
    }
  }

  function withinRange(charPosition, axis, clickPos) {
    let index = isItXorY(axis);
    if (axis === 'x') {
      if (clickPos > charPosition[index] - 2 && clickPos < charPosition[index] + 2) {
        return true;
      } else {
        return false;
      }
    } else if (axis === 'y') {
      if (clickPos > charPosition[index] - 6 && clickPos < charPosition[index] + 6) {
        return true;
      } else {
        return false;
      }
    }
  }

  function isItXorY(axis) {
    if (axis === 'x') {
      return 0;
    } else if (axis === 'y') {
      return 1;
    }
  }

  const characters = props.characters.map((character) => (
    <div className="character" key={character.id}>
      <img src={character.src} alt={character.name} />
      <span>{character.name}</span>
    </div>
  ));

  return (
    <div>
      <div className="game">
        <img
          src={props.image}
          alt={props.alt}
          id={props.id}
          onClick={isFound}
          className="game-image"
        />
        <div className="highlighter"></div>
      </div>
      <div className="characters-container">{characters}</div>
    </div>
  );
}

export default Game;
