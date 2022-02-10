import {
  query,
  orderBy,
  collection,
  where,
  limit,
  getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import Levels from './Levels';

function Leaderboard(props) {
  const [leaders, setLeaders] = useState([]);
  const [title, setTitle] = useState('Click a game to display scores');
  useEffect(() => {
    const leaderboardTitle = document.querySelector('.leaderboard-title');
    leaderboardTitle.textContent = title;
  }, [title]);

  async function getLeaders(id, title) {
    let scoreQuery = query(
      collection(db, `scores${id}`),
      where('score', '>', 0),
      orderBy('score'),
      limit(100)
    );
    const querySnapshot = await getDocs(scoreQuery);
    const leaderboard = querySnapshot.docs.map((doc) => doc.data());
    console.log(leaderboard, 'firestore scores');
    setTitle(title);
    return setLeaders(leaderboard);
  }

  const displayLeaders = leaders.map((leader, i) => (
    <tr key={i}>
      <td>{leader.name}</td>
      <td>{leader.score}</td>
    </tr>
  ));

  return (
    <div className="leaderboard">
      <div className="games">
        <Levels
          characters={props.games[0].characters}
          game={'sleeping beauty'}
          image={props.beautyGame}
          alt={'sleeping beauty game option'}
          getLeaders={getLeaders}
          id={1}
        />
        <Levels
          characters={props.games[1].characters}
          game={'cinderella'}
          image={props.cinderellaGame}
          alt={'cinderella game option'}
          getLeaders={getLeaders}
          id={2}
        />
      </div>

      <h2 className="leaderboard-title">Click a game to display scores</h2>
      <table>
        <colgroup>
          <col span="1" style={{ width: '60%' }} />
          <col span="1" style={{ width: '30%' }} />
        </colgroup>

        <thead>
          <tr>
            <th colSpan="1">name</th>
            <th colSpan="1">time (seconds)</th>
          </tr>
        </thead>
        <tbody>{displayLeaders}</tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
