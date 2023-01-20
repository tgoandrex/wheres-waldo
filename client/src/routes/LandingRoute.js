import { useState } from 'react';
import LevelThumbnail from '../components/LevelThumbnail';

import waldo1 from '../images/level1.jpg';
import waldo2 from '../images/level2.jpg';

function LandingRoute() {
    const [username, setUsername] = useState(sessionStorage.getItem('username') || 'Guest');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const allLevels = [waldo1, waldo2];

    const postUsername = () => {
        const validUserName = new RegExp('^[a-zA-Z0-9_.-]*$');
        if(validUserName.test(username)) {
            setInvalidUsername(false);
            sessionStorage.setItem('username', username);
        } else {
            setInvalidUsername(true);
        }
    }

    return (
        <div>
            <h3 className='center'>Where's Waldo?</h3>
            <div className='center'>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' defaultValue={username} onChange={e => {setUsername(e.target.value);}} />
                <button onClick={postUsername}>Submit</button><br />
                {!invalidUsername && username !== 'Guest' ? <span>Welcome back, {username}</span>
                : 'Please use only alphanumeric characters for the username'}
            </div>
            <div id='thumbnails'>
                {allLevels.map((level, id) => {
                    return <LevelThumbnail key={id} level={level} id={id} />
                })}
            </div>
        </div>
    )
}

export default LandingRoute;