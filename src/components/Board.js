import React,{useState} from 'react';
import Square from './Square';

const style={
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
    },
    board:{
        width: '270px',
        height: '270px',
    },
    message:{
        textAlign: 'center',
        margin: '1em',
        border: '1px solid rgb(200,0,0)',
        borderRadius: 16,
        color: 'rgb(200,0,0)',
        backgroundColor:'transparent',
        padding:'8px 16px',
    },
    modal:{
        position:'absolute',
        backgroundColor: 'rgba(0,0,20,0.8)',
        width: '100%',
        height: '100%',
        textAlign:'center'
    },
    modalContent:{
        position: 'absolute',
        top:'10%',
        left: '10%',
        width: 560,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: '16px 8px',

    },
    btn:{
        margin: '16px 8px',
        color: 'white',
        backgroundColor: 'lightgreen',
        padding:'16px 24px',
        borderRadius: 8,
        outline: 'none',
        border: 'none',
        cursor: 'pointer',

    },
    btnDanger:{
        backgroundColor: 'rgb(200,0,0)'
    },
    btnCon:{
        margin: '53px 0 0 0'
    }
    
}
const initialBoardState = new Array(9).fill('');

function isWinner(player,board){
    let rows = [board.slice(0,3),board.slice(3,6),board.slice(6)];
    for(let i=0; i<3; i++){
        //for rows
        if((rows[i][0] === rows[i][1]) && (rows[i][0]===rows[i][2]) && (rows[i][0] === player) )
        return true;
        //for columns
        if((player===rows[0][i]) && (rows[0][i] === rows[1][i]) && (rows[0][i] === rows[2][i]) )
        return true;
    }
    return false;
}
function canPlay(board,ind){
    return !board[ind]
}
function Board({player,onClick,draw,restart,setDraw}){
    const [board,setBoard] = useState(initialBoardState);
    const [message,setMessage] = useState('');
    const [winner,setWinner] = useState('');
    const restartHandler = () =>{
        restart();
        setBoard(initialBoardState);
        setWinner('');
        setDraw(false);

    }
    const handleClick = (ind) => {
        setMessage('');
        if(winner || draw) return;
        if(!canPlay(board,ind)) {
            setMessage(`${ board[ind]} already occupy that space, click another box`)
            return;
        }
        
        let newBoard = [...board];
        newBoard[ind]=player ;
        setBoard(newBoard);
        if(isWinner(player,newBoard)){
            setWinner(player);
            return;
        }
        onClick();
    }

    return(
        <div style={{...style.root}}>
        <div style={style.board}>
            {board.map((square,ind) => {
                
            return (<Square value={square}
                key={ind} onClick={() => handleClick(ind)}/>)
            })}
            
        </div>
        <div style={style.btnCon}><button style={style.btn} onClick={restartHandler} >Restart</button></div>
            {message &&<div style={style.message}>{message}</div>}
            {(winner || draw) &&(<div style={style.modal}>
                    <div style={style.modalContent}>
                        {winner ? `Player ${winner} won the game.` : `The game was Draw`}
                        <div style={style.btnCon}>
                            <button style={style.btn}onClick={restartHandler}>Restart</button>
                            <button style={{...style.btn,...style.btnDanger}}onClick={() =>{setWinner('') ;setDraw(false);}}>Close</button>
                        </div>
                    </div>
                 </div>)}
            </div>
    )

}
export default Board;