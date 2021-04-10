import { useEffect, useState } from 'react';
import Board from './Board'

const style = {
    root:{
        textAlign:'center'
    },
    player:{
        fontWeight: 700,
        fontSize: 18,
        margin: '1em 0',
    }
}

function TicTac(){
    const [count, setCount] =useState(1);
    const [player, setPlayer] = useState('X')
    const [draw, setDraw] = useState(false)
    useEffect(()=>{
        if(count === 10) setDraw(true);
    },[count]);
    const restartHandler =() => {
        setCount(1);
        setPlayer('X');
    }
    const incrementCount = () => {
        if(count % 2 === 0) setPlayer('X');
        else setPlayer('O');
        setCount(prevCount => prevCount + 1);

    }
    
    return(
        <div style={style.root}>
            <p>This is tictac game, it is a game played by two individuals, there is a winner if we have 
                either of the player fill a row or column with his own Avatar. The game is a draw when 
                after filling all the available space or box. Select your opponent and have fun!
            </p>
            <div style={style.player}>It is player <span style={{color:'blue',fontSize:'larger'}}>{player}</span> turn to play.</div>
            <Board onClick={incrementCount} player={player} draw={draw} restart={restartHandler} setDraw={setDraw}/>
        </div>
    )
   

}
export default TicTac;