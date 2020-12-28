import React, { useState } from 'react';
import './App.css';

const createCell = (num) => 
  Array(num**2).fill('').map((_, i) => {
    let row = Math.floor(i / num);
    let cell =  i % num;
    let color = (row + cell) % 2 === 0 
    ? 'cell bg-light' 
    : 'cell bg-dark text-white';
    let target = [row, cell]

    return {color, target} 
  })

const shift = (x, y) => [[-1 * x, -1 * y], [-1 * x, y], [x, y],
  [x, -1 * y], [-1 * y, -1 * x], [y, x], [-1 * y,  x], [y, -1 * x]]

const stepsKnight = (num) => shift(2, 1).map(index => 
  [index[0] + num[0], index[1] + num[1]])

function App() {

  const [green, setGreen] = useState([]);
  const [input, setInput] = useState('');
  const [size, setSize] = useState(8);
  const [knight, setKnight] = useState([]);
  const fieldWidth = 320;
  
  const handleClick = e => {
    let target = e.target.getAttribute('target').split(',').map(i => +i);
    setGreen(target)
    setKnight(stepsKnight(target))
  }

  const checkMoveOfTheKnight = (arr, target) => 
    arr.map(index => String(index) === String(target))
      .reduce((res, i) => res + i, 0)
  
  
  const hangleSubmit = (e) => {
    e.preventDefault()
    if (Number.isInteger(+input) && +input > 0 && +input <= 25) {
      setSize(input)
      setInput('')
   }
  }
  
  const icon = <svg xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    fill="currentColor" 
    className="bi bi-vinyl" 
    viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/>
    <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>
  
  const context = createCell(size).map( (index, i) => 
    <div key={i} 
      {...index} 
      style={{width: (fieldWidth - 4)/size, 
        height: (fieldWidth - 4)/size}}
      className={String(green) === String(index.target) ? 
        "cell bg-success" :
        index.color  }>
        {checkMoveOfTheKnight(knight, index.target) ? icon : ''}
    </div>) 

  return (
    <main className="App">
      <div className="App-main">
       <h1>Move of the knight</h1>
       <form onSubmit={hangleSubmit}>
        <input
          className="Input"
          type='text'
          value={input}
          placeholder="select a board size from 1 to 25"
          onChange={(e) => setInput(e.target.value)}
          />
        </form>
       <div className="field" onClick={handleClick}>
        {context} 
       </div>
       </div>
    </main>
  );
}

export default App;
