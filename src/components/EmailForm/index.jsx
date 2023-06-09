import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { useNavigate } from 'react-router-dom';

function isValidFen(fen) {
  try {
    new Chess(fen);
    return true;
  } catch (e) {
    return false;
  }
}

function EmailForm({ fens, email: initialEmail = '', onSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(initialEmail);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validFens = fens.filter(isValidFen);
    fetch('/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, fens: validFens })
    }).then(() => {
      console.log('Data saved!');
      onSuccess();
      navigate('/success');
    });
  };  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:&nbsp;
        <input type="email" value={email} onChange={handleEmailChange} style={{ marginRight: "0.5em" }}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default EmailForm;
