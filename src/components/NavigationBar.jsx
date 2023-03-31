import React from 'react';
import logo from '../assets/idea_theorem_logo.png'

const NavigationBar = () => {
  return (
    <nav style={{ backgroundColor: '#252F3D', height: '56.83px', width: '100%', position: 'fixed', top: '0', left: '0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <img src={logo} alt="Logo" style={{ left: '166px', top: '12px', position: 'absolute', width: '294px', height: '32px' }} />
    </nav>
  );
};

export default NavigationBar;