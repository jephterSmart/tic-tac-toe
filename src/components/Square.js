
const style = {
    boxSizing: 'border-box',
    color: '#120287',
    backgroundColor: '#f2f2f2',
    width: '80px',
    height: '80px',
    border: '10px solid lightblue',
    cursor: 'pointer',
    padding: '10px',
    margin: '5px',
    display: 'block',
    float: 'left',
    fontSize: 24,

}

function Square({onClick,value}){
   
    return(
        <button style={{...style,}} onClick={onClick}>
            {value}
        </button>
    )
}

export default Square;