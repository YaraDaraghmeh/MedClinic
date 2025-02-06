import React, { useState } from 'react';
import '/src/style/login.css';  // Import the CSS

const SignInComponent = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className={`container ${active ? 'active' : ''}`} onClick={handleClick}>
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Please Sign In</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <div className="button-group">
          <button className="btn login">Login</button>
          <button className="btn signup">Sign Up</button>
        </div>
        <h2>&nbsp;</h2>
      </div>
    </div>
  );
};

export default SignInComponent;
