import React from 'react';
import './App.css';

const createCell = (num) => 
  Array(num**2).fill('').map((_, i) => {
    let row = Math.floor(i / num);
    let cell =  i % num;
    let color = (row + cell) % 2 === 0 
    ? 'white' : 'black';
    let target = String(row) + String(cell)

    return {color, target} 
  })

const shift = (x, y) => [-10 * x - y, -10 * x + y, 10 * x - y, 10 * x + y, 
          -10 * y - x, -10 * y + x, 10 * y - x, 10 * y + x]

const stepHorse = (num) => shift(2, 1).map(index => index + num)

function App() {

  const [green, setGreen] = React.useState('');
  const [horse, setHorse] = React.useState([])
  const fieldWidth = 320;
  const cell = 8;

  const handleClick = e => {
    let target = e.target.getAttribute('target');
    setGreen(target)
    setHorse(stepHorse(+target))
  }

  const context = createCell(cell).map( (index, i) => 
    <div key={i} 
      {...index} 
      style={{width: fieldWidth/cell, height: fieldWidth/cell }}
      className={index.target === green ? 
        "cell green " + index.color :
        "cell " + index.color  }>
        {horse.includes(+index.target) ? 'h' : ''}
    </div>) 

  return (
    <main className="App">
      <div className="App-header">
       <h1>Chess</h1>
       <div className="field" onClick={handleClick}>
        {context} 
       </div>
       </div>
    </main>
  );
}

export default App;
