function LevelThumbnail(props) {
    return (
        <div className='center'>
            <h3>Level {props.id + 1}</h3>
            <a href={props.id + 1}>
                <img src={props.level} alt='Level Thumbnail' height='250px' width='250px' />
            </a>
            <form action={`${props.id + 1}/scoreboard`}>
                <input type='submit' value='Scoreboard' />
            </form>
        </div>
    );
}
  
export default LevelThumbnail;