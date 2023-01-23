import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function LevelImage(props) {
    const [xCoord, setXCoord] = useState();
    const [yCoord, setYCoord] = useState();
    const param = useParams();

    useEffect(() => {
        fetch(`https://${window.location.hostname}:10000/coordinates/${param.level}`)
        .then(res => res.json())
        .then(data => {
            setXCoord(data.x_coord);
            setYCoord(data.y_coord);
        })
    }, [param.level]);

    const getCoords = (e) => {
        const clickedXCoord = e.pageX;
        const clickedYCoord = e.pageY;

        if(clickedXCoord >= xCoord - 15 && clickedXCoord <= xCoord + 15) {
            if(clickedYCoord >= yCoord - 15 && clickedYCoord <= yCoord + 15 ) {
                props.setWaldoFound(true);
            }
        }   
    }

    return (
        <div>
            <img alt='Wheres Waldo' src={require(`../images/level${props.level}.jpg`)} onClick={(e) => getCoords(e)} />
        </div>
    );
}
  
export default LevelImage;