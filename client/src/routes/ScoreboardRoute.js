import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ScoreboardRoute(props) {
    const [scores, setScores] = useState([]);
    const param = useParams();

    useEffect(() => {
        fetch(`//${window.location.hostname}:10000/scoreboard/${param.level}`)
        .then(res => res.json())
        .then(data => {
            setScores(data);
        })
    }, [param.level])

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
                    {scores.map((score, id) => {
                        return (
                            <tr key={id}>
                                <td>{score.username}</td>
                                <td>{score.time}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ScoreboardRoute;