import React from 'react';
import './App.css';

const createCell = (num) => 
  Array(num**2).fill('').map((_, i) => {
    let row = Math.floor(i / num);
    let cell =  i % num;
    let color = (row + cell) % 2 === 0 
    ? 'white' : 'black';
    let target = [row, cell]

    return {color, target} 
  })

const shift = (x, y) => [[-1 * x, -1 * y], [-1 * x, y], [x, y],
                        [x, -1 * y], [-1 * y, -1 * x], [y, x],
                         [-1 * y,  x], [y, -1 * x] ]

const stepsKnight = (num) => shift(2, 1).map(index => 
  [index[0] + num[0], index[1] + num[1]])

function App() {

  const [green, setGreen] = React.useState([]);
  const [knight, setKnight] = React.useState([])
  const fieldWidth = 320;
  const cell = 8;

  const handleClick = e => {
    let target = e.target.getAttribute('target').split(',').map(i => +i);
    setGreen(target)
    setKnight(stepsKnight(target))
  }

  const checkTarget = (arr, target) => 
    arr.map(index => 
      index[0] === target[0] && index[1] === target[1])
    .reduce((res, i) => res + i, 0)
  

  const context = createCell(cell).map( (index, i) => 
    <div key={i} 
      {...index} 
      style={{width: fieldWidth/cell, 
        height: fieldWidth/cell, 
        fontSize: fieldWidth/cell/1.5 }}
      className={(index.target[0] === green[0] && index.target[1] === green[1]) ? 
        "cell green " + index.color :
        "cell " + index.color  }>
        {checkTarget(knight, index.target) ? 'h' : ''}
    </div>) 

  return (
    <main className="App">
      <div className="App-header">
       <h1>Move of the knight</h1>
       <div className="field" onClick={handleClick}>
        {context} 
       </div>
       </div>
    </main>
  );
}

export default App;
