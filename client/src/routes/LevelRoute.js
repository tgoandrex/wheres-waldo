import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import LevelImage from '../components/LevelImage';

function LevelRoute() {
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimmerRunning] = useState(true);
    const [waldoFound, setWaldoFound] = useState(false);

    const rootUri = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : 'http://localhost:10000';

    const param = useParams();

    const stopTimer = () => {
        setTimmerRunning(false);
    }
    
    useEffect(() => {
        if (timerRunning) {
            if(waldoFound) {
                fetch(`${rootUri}/scoreboard/${param.level}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({time: timer, username: sessionStorage.getItem('username') || 'Guest'})
                })
                stopTimer();
            }
            
            const interval = setInterval(() => {
                setTimer((timer) => {
                    return timer + 1;
                });
            }, 1000);

            return () => {
                clearInterval(interval);
                setTimer(0);
            };
        }
    // The below line is needed because adding 'timer' to the dependancy array would always submit the time as '0'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param.level, timerRunning, waldoFound, rootUri])

    return (
        <>
            <div id='timer'>
                Time: {timer}
            </div>
            <LevelImage level={param.level} setWaldoFound={setWaldoFound} />
            {waldoFound && (
                <Navigate to='./scoreboard' replace={true} />
            )}
        </>
    )
}

export default LevelRoute;