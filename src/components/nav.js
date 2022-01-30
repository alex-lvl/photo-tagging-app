import { useEffect, useState } from 'react';

function Nav() {
  const [centiseconds, setCentiseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [centiSpanse, setCentiSpanse] = useState(0);
  const [secSpanse, setSecSpanse] = useState(0);
  const [minSpanse, setMinSpanse] = useState(0);

  const handleStart = () => {
    let startTime = Date.now();

    let milliInterval = setInterval(function () {
      let elapsedTime = Date.now() - startTime;
      let milli = ((elapsedTime / 1000) % 1).toFixed(2);
      let parsedMilli = milli.toString().split('.')[1];
      setCentiseconds(parsedMilli);
    }, 10);
    setCentiSpanse(milliInterval);

    const secInterval = setInterval(() => {
      let elapsedTime = Date.now() - startTime;
      setSeconds((seconds) => {
        if (seconds <= 60) {
          return Math.floor((elapsedTime / 1000 / 1) % 60);
        } else {
          return 0;
        }
      });
    }, 1000);
    setSecSpanse(secInterval);

    const minInterval = setInterval(() => {
      let elapsedTime = Date.now() - startTime;
      setMinutes(Math.floor((elapsedTime / 1000 / 60) % 60));
    }, 60000);
    setMinSpanse(minInterval);

  };

  const handleStop = () => {
    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    console.log(`${minutes}:${seconds}:${centiseconds}`);
    let total = parseInt(minutes) * 60 + parseInt(seconds);
    let totalSeconds = total + '.' + parseInt(centiseconds);
    console.log(totalSeconds);
    clearInterval(centiSpanse);
    clearInterval(secSpanse);
    clearInterval(minSpanse);
  };

  return (
    <nav className="nav">
      <div className="logo" onClick={handleStop}>logo</div>
      <div className="stopwatch" onClick={handleStart}>
        <span>{minutes < 10 ? `0${minutes}` : minutes}:</span>
        <span>{seconds < 10 ? `0${seconds}` : seconds}:</span>
        <span>{centiseconds === 0 ? `0${centiseconds}` : centiseconds}</span>
      </div>
    </nav>
  );
}

export default Nav;
