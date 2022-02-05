import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { useParams } from 'react-router-dom';

function Game(props) {
  const feedbackStatus = document.querySelector('.feedback');
  const [gameOver, setGameOver] = useState(false);
  //exhaustive dependency
  useEffect(() => {
    props.wrapperSetGameOver(gameOver);
  }, [props.wrapperSetGameOver, gameOver]);
  
  //This ensures that the page does not redirect to different route when page is refreshed
  const params = useParams();
  useEffect(() => {
    props.setGameId(params.gameId);
    return () => {
      props.wrapperSetGameOver(true);
    };
  }, []);

  const [isBeautyFound, setBeautyFound] = useState(false);
  useEffect(() => {
    if (isBeautyFound) {
      makeTransparent(0);
    } else {
      makeVisible(0);
    }
  }, [isBeautyFound]);

  const [isKindFairyFound, setKindFairyFound] = useState(false);
  useEffect(() => {
    if (isKindFairyFound) {
      makeTransparent(1);
    } else {
      makeVisible(1);
    }
  }, [isKindFairyFound]);

  const [isWickedFairyFound, setWickedFairyFound] = useState(false);
  useEffect(() => {
    if (isWickedFairyFound) {
      makeTransparent(2);
    } else {
      makeVisible(2);
    }
  }, [isWickedFairyFound]);

  const [isCinderellaFound, setCinderellaFound] = useState(false);
  useEffect(() => {
    if (isCinderellaFound) {
      makeTransparent(0);
    } else {
      makeVisible(0);
    }
  }, [isCinderellaFound]);

  const [isPrinceFound, setPrinceFound] = useState(false);
  useEffect(() => {
    if (isPrinceFound) {
      makeTransparent(1);
    } else {
      makeVisible(1);
    }
  }, [isPrinceFound]);

  const [isWickedStepMotherFound, setWickedStepMotherFound] = useState(false);
  useEffect(() => {
    if (isWickedStepMotherFound) {
      makeTransparent(2);
    } else {
      makeVisible(2);
    }
  }, [isWickedStepMotherFound]);

  useEffect(() => {
    if (
      (isBeautyFound && isKindFairyFound && isWickedFairyFound) ||
      (isCinderellaFound && isPrinceFound && isWickedStepMotherFound)
    ) {
      setGameOver(true);
      feedbackStatus.textContent = 'Game Over! you found all the characters!';
    }
  }, [
    feedbackStatus,
    isBeautyFound,
    isKindFairyFound,
    isWickedFairyFound,
    isCinderellaFound,
    isPrinceFound,
    isWickedStepMotherFound,
  ]);

  const [clickLocation, setClickLocation] = useState(0);

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
    setClickLocation([xPos, yPos]);
  };

  const isFound = (character) => {
    if (!gameOver) {
      checkCoords(character, clickLocation[0], clickLocation[1]);
    }
    hideMenu();
    // dropdownMenu.classList.remove('dropdown-menu-visible');

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
      withinRange(charPosition.coordinate, 'x', x) &&
      withinRange(charPosition.coordinate, 'y', y)
    ) {
      switch (charPosition.name) {
        case 'sleeping beauty':
          setBeautyFound(true);
          break;
        case 'kind fairy':
          setKindFairyFound(true);
          break;
        case 'wicked fairy':
          setWickedFairyFound(true);
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
    <div className="character" id={character.id} key={character.id}>
      <img
        src={character.src}
        alt={character.name}
        className="character-image"
      />
      <span className="character-name">{character.name}</span>
    </div>
  ));

  const dropDownItem = props.characters.map((character) => (
    <li
      className="dropdown-item"
      onClick={() => isFound(character)}
      id={character.id}
      key={character.id}
    >
      <img
        className="dropdown-item-img"
        src={character.src}
        alt={character.name}
      />
      <span className="dropdown-item-name">{character.name}</span>
    </li>
  ));

  const hideMenu = () => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('dropdown-menu-visible');
  };

  function makeTransparent(id) {
    const dropdownImage = document.querySelectorAll('.dropdown-item-img');
    const dropdownName = document.querySelectorAll('.dropdown-item-name');
    const characterImage = document.querySelectorAll('.character-image');
    const characterName = document.querySelectorAll('.character-name');

    characterImage[id].style.opacity = 0.5;
    characterName[id].style.opacity = 0.5;
    dropdownImage[id].style.opacity = 0.5;
    dropdownName[id].style.color = 'lime';
  }

  function makeVisible(id) {
    const dropdownImage = document.querySelectorAll('.dropdown-item-img');
    const dropdownName = document.querySelectorAll('.dropdown-item-name');
    const characterImage = document.querySelectorAll('.character-image');
    const characterName = document.querySelectorAll('.character-name');

    characterImage[id].style.opacity = 1;
    characterName[id].style.opacity = 1;
    dropdownImage[id].style.opacity = 1;
    dropdownName[id].style.color = 'white';
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
          {dropDownItem}
        </ul>
      </div>
      <p className="feedback">find the characters!</p>
      <button
        onClick={() => {
          props.handleReset();
          setBeautyFound(false);
          setKindFairyFound(false);
          setWickedFairyFound(false);
          setCinderellaFound(false);
          setPrinceFound(false);
          setWickedStepMotherFound(false);
          setGameOver(false);
          feedbackStatus.textContent = 'Find the characters!';
        }}
      >
        reset
      </button>
      <div className="characters-container">{characters}</div>
    </div>
  );
}

export default Game;
