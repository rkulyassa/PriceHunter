import React from 'react';
import * as Callbacks from '../models/callbacks.model';

type InputProps = {
  onEnter: Callbacks.OnEnter;
};

const Input: React.FC<InputProps> = ({ onEnter }) => {
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