import { useEffect, useState } from 'react';

function Nav() {
  const [centiseconds, setCentiseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [centiSpanse, setCentiSpanse] = useState(0);
  const [secSpanse, setSecSpanse] = useState(0);
  const [minSpanse, setMinSpanse] = useState(0);


  const handleStart = () => {
    const centiInterval = setInterval(() => {
      setCentiseconds((centiseconds) => {
        if (centiseconds < 100) {
          return centiseconds + 1;
        } else {
          return 0;
        }
      });
    }, 10);
    setCentiSpanse(centiInterval);

    const secInterval = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds < 60) {
          return seconds + 1;
        } else {
          return 0;
        }
      });
    }, 1000);
    setSecSpanse(secInterval);

    const minInterval = setInterval(() => {
      setMinutes((minutes) => minutes + 1);
    }, 60000);
    setMinSpanse(minInterval);
  };

  const handleStop = () => {
    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    console.log(`${minutes}:${seconds}:${centiseconds}`);
    let total = (parseInt(minutes) * 60) + parseInt(seconds);
    let totalSeconds = total + "." + centiseconds
    console.log(totalSeconds);
    // console.log(centiSpanse)
    clearInterval(centiSpanse);
    clearInterval(secSpanse);
    clearInterval(minSpanse);
  };

  return (
    <nav className="nav">
      <div className="logo">logo</div>
      <div className="characters-container">
        <div className="character">character</div>
        <div className="character">character</div>
        <div className="character">character</div>
      </div>
      <div className="stopwatch" onClick={handleStart}>
        <span>{minutes < 10 ? `0${minutes}` : minutes}:</span>
        <span>{seconds < 10 ? `0${seconds}` : seconds}:</span>
        <span>{centiseconds < 10 ? `0${centiseconds}` : centiseconds} </span>
      </div>
    </nav>
  );
}

export default Nav;
