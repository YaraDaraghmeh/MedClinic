import React, { useState } from 'react';
import './login.css';  // Import the CSS

const SignInComponent = () => {
  const [active, setActive] = useState(true);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className={`container ${active ? 'active' : ''}`} onClick={handleClick}>
      <div className="top"></div>
      <div className="bottom"></div>
      {/* Prevent event bubbling */}
      <div className="center" onClick={(e) => e.stopPropagation()}>
        <h2 className='!text-black'>Please Sign In</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <div className="button-group">
          <button className="btn login">Login</button>
          <button className="btn signup">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
