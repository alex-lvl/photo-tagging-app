import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

function Game(props) {
  const [isBeautyFound, setBeautyFound] = useState(false);
  const [sleepingBeautyCoords, setSleepBeautyCoords] = useState({
    name: 'sleeping beauty',
    xCoord: 6.5,
    yCoord: 34,
  });

  const [isKindFairyFound, setKindFairyFound] = useState(false);
  const [kindFairyCoords, setKindFairyCoords] = useState({
    name: 'kind fairy',
    xCoord: 55,
    yCoord: 59,
  });

  const [isWickedWitchFound, setWickWitchFound] = useState(false);
  const [wickedWitchCoords, setWickedWitchCoords] = useState({
    name: 'wicked witch',
    xCoord: 27,
    yCoord: 55,
  });

  const [isCinderellaFound, setCinderellaFound] = useState(false);
  const [cinderellaCoords, setCinderellaCoords] = useState({
    name: 'cinderella',
    xCoord: 36,
    yCoord: 68,
  });

  const [isPrinceFound, setPrinceFound] = useState(false);
  const [princeCoords, setPrinceCoords] = useState({
    name: 'prince',
    xCoord: 28.5,
    yCoord: 33,
  });

  const [isWickedStepMotherFound, setWickedStepMotherFound] = useState(false);
  const [wickedStepMotherCoords, setWickedStepMotherCoords] = useState({
    name: 'wicked step mother',
    xCoord: 55,
    yCoord: 52,
  });
  const [clickLocation, setClickLocation] = useState(0);

  useEffect(() => {
    props.setGameOver(false);
  }, [props.gameOver]);
  useEffect(props.handleStart, [props.gameOver]);

  function highlight(e, className = 'dropdown-menu-visible') {
    const highlighter = document.getElementsByClassName('highlighter')[0];
    const dropdownMenu = document.querySelector('.dropdown-menu');

    highlighter.style.display = 'block';
    highlighter.style.top = e.pageY - 20 + 'px';
    highlighter.style.left = e.pageX - 20 + 'px';
    dropdownMenu.classList.toggle(className);
    dropdownMenu.style.top = e.pageY + 10 + 'px';
    dropdownMenu.style.left = e.pageX + 10 + 'px';

    findClickLocation(e);
    setTimeout(() => {
      highlighter.style.display = 'none';
    }, 750);
  }
  
  const findClickLocation = (e) => {
    const { width, height } = e.target.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;
    let xPos = Math.round((offsetX / width) * 100);
    let yPos = Math.round((offsetY / height) * 100);
    setClickLocation([xPos,yPos]);
  }

  const isFound = (e) => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    let characterPosition = [
      sleepingBeautyCoords.xCoord,
      sleepingBeautyCoords.yCoord,
    ];
    checkCoords(characterPosition, clickLocation[0], clickLocation[1]);
    dropdownMenu.classList.remove('dropdown-menu-visible');

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
    if (
      withinRange(charPosition, 'x', x) &&
      withinRange(charPosition, 'y', y)
    ) {
      switch (charPosition.name) {
        case 'sleeping beauty':
          setBeautyFound(true);
          break;
        case 'kind fairy':
          setKindFairyFound(true);
          break;
        case 'wicked witch':
          setWickWitchFound(true);
          break;
        case 'cinderella':
          setCinderellaFound(true);
          break;
        case 'prince':
          setPrinceFound(true);
          break;
        case 'wicked step mother':
          setWickedStepMotherFound(true);
          break;
        default:
      }
      console.log('found');
      return '√ FOUND!';
    } else {
      console.log('not within range');
      return false;
    }
  }

  function withinRange(charPosition, axis, clickPos) {
    let index = isItXorY(axis);
    if (axis === 'x') {
      if (
        clickPos > charPosition[index] - 2 &&
        clickPos < charPosition[index] + 2
      ) {
        return true;
      } else {
        return false;
      }
    } else if (axis === 'y') {
      if (
        clickPos > charPosition[index] - 6 &&
        clickPos < charPosition[index] + 6
      ) {
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

  const hideMenu = () => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('dropdown-menu-visible')
  }

  return (
    <div>
      <div className="game">
        <img
          src={props.image}
          alt={props.alt}
          id={props.id}
          onClick={highlight}
          className="game-image"
        />
        <div className="highlighter"></div>
          <ul className="dropdown-menu" onMouseLeave={hideMenu}>
            <li className="dropdown-item" onClick={isFound}>link 1</li>
            <li className="dropdown-item" onClick={isFound}>link 2</li>
            <li className="dropdown-item" onClick={isFound}>link 3</li>
          </ul>
      </div>
      <div className="characters-container">{characters}</div>
    </div>
  );
}

export default Game;
