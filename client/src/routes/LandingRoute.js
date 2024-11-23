import { useState } from 'react';
import LevelThumbnail from '../components/LevelThumbnail';

import waldo1 from '../images/level1.jpg';
import waldo2 from '../images/level2.jpg';
import waldo3 from '../images/level3.jpg';

function LandingRoute() {
    const [username, setUsername] = useState(sessionStorage.getItem('username') || 'Guest');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const allLevels = [waldo1, waldo2, waldo3];

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
        <>
            <h1 className='center'>Where's Waldo?</h1>
            <div className='center'>
                {window.innerWidth < 600 &&
                    <p>
                        Notice: Although you can play this game on mobile, it is highly recommended to play on desktop 
                        or a device with a large screen, due to needing to see as much of the picture as possible.
                    </p>
                }
                <label htmlFor='username'>Username: </label>
                <input id="username-form" type='text' name='username' defaultValue={username} onChange={e => {setUsername(e.target.value);}} />
                <button class="button" onClick={postUsername}>Submit</button><br />
                {!invalidUsername && username !== 'Guest' ? <span>Welcome back, {username}</span>
                : 'Please use only alphanumeric characters for the username'}
            </div>
            <div id='thumbnails'>
                {allLevels.map((level, id) => {
                    return <LevelThumbnail key={id} level={level} id={id} />
                })}
            </div>
        </>
    )
}

export default LandingRoute;