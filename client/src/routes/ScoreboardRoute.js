import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ScoreboardRoute(props) {
    const [scores, setScores] = useState([]);
    const param = useParams();

    const rootUri = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : 'http://localhost:10000';

    useEffect(() => {
        fetch(`${rootUri}/scoreboard/${param.level}`)
        .then(res => res.json())
        .then(data => {
            setScores(data);
        })
    }, [param.level, rootUri])

    return (
        <div className='center'>
            <h3>Level {param.level} High Scores</h3>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Time (Seconds)</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.length > 0 ?
                    scores.map((score, id) => {
                        return (
                            <tr key={id}>
                                <td>{score.username}</td>
                                <td>{score.time}</td>
                            </tr>
                        )
                    }) :
                        <tr>
                            <td>No scores yet!</td>
                            <td>Find Waldo on this level to set a score!</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ScoreboardRoute;