import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '20px 0', // Adjust padding as needed
        textAlign: 'center',
        width: '100%',
       
        bottom: 0, // Only relevant if position is 'fixed'
      }}
    >
      <p style={{ margin: 0, fontSize: '0.9em' }}>
        freekenyasignatures.com copyright 2025
      </p>
    </footer>
  );
};

export default Footer;