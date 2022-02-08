import Levels from './Levels';

function Leaderboard(props) {
  return (
    <div className="leaderboard">
      <div className="games">
        <Levels
          characters={props.games[0].characters}
          game={'sleeping beauty'}
          image={props.beautyGame}
          alt={'sleeping beauty game option'}
          id={0}
        />
        <Levels
          characters={props.games[1].characters}
          game={'cinderella'}
          image={props.cinderellaGame}
          alt={'cinderella game option'}
          id={1}
        />
      </div>

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
        <tbody>
          <tr>
            <td>Alex</td>
            <td>101.01</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
