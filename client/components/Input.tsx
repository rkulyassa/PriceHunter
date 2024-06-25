import React from 'react';
import './Input.css';
import * as Callbacks from '../models/Callbacks.model';

const Input: React.FC<{onEnter: Callbacks.OnEnter}> = ({ onEnter }) => {
  const [input, setInput] = React.useState('');

  return (
    <input
      type="text"
      placeholder='Enter eBay listing id'
      value={input}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onEnter(input);
      }}
      onChange={(e) => setInput(e.target.value)}
    />
  )
}

export default Input;