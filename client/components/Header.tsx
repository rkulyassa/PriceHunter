import React from 'react';
import './Header.css';

// @todo send manifest.json from server
const name: string = 'PriceHunter';
const version: string = 'v0.1.5';

const Header: React.FC = () => {
  return (
    <>
      <h1>{name}</h1>
      <h3>{version}</h3>
    </>
  )
}

export default Header;