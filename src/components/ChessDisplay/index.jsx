import React, { useState } from 'react';
import Chessboard from "chessboardjsx";
import EmailForm from '../EmailForm';

import './style.css';

const maxFENsStored = 50;

function ChessDisplay({ fens: initialFens = [], email: initialEmail = '' }) {
  const [fens, setFens] = useState(initialFens);
  const [email, setEmail] = useState(initialEmail);

  const handleFenChange = (index) => (event) => {
    const newFens = [...fens];
    newFens[index] = event.target.value;
    setFens(newFens);
  
    if (index === fens.length - 1 && event.target.value && fens.length < maxFENsStored) {
      setFens([...newFens, '']);
    }
  };  

  const handleAddPosition = () => {
    if (fens.length < maxFENsStored) {
      setFens([...fens, '']);
    }
  };

  const handleDeletePosition = (index) => () => {
    const newFens = [...fens];
    newFens.splice(index, 1);
    setFens(newFens);
  };

  const handleEmailSuccess = () => {
    // Save state of ChessDisplay component
    // Redirect user to success page
  };

  return (
    <div className='chessDisplayStyle'>
      <div>
        <EmailForm email={email} fens={fens} onSuccess={handleEmailSuccess} />
      </div>
      <br />
      <div className='chessboardsContainer'>
        {fens.map((fen, index) => (
          <div key={index} className='chessboardContainer'>
            <input
              type="text"
              value={fen}
              onChange={handleFenChange(index)}
              className='fenInput'
            />
            <button onClick={handleDeletePosition(index)}>X</button>
            <Chessboard position={fen} width={200} />
          </div>
        ))}
        <button onClick={handleAddPosition} className='plusButton'>+</button>
      </div>
    </div>
  );
}

export default ChessDisplay;
