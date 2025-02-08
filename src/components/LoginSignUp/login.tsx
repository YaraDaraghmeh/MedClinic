import React, { useState } from 'react';
import './login.css'; // Import the CSS

const SignInComponent = () => {
  const [active, setActive] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false); // Track if it's in sign-up mode
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    imageUrl: '',
  });

  const handleClick = () => {
    setActive(!active);
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp); // Toggle between Sign In and Sign Up
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Sign Up Data:', formData);
      // Handle sign-up logic (e.g., send to Firebase or an API)
    } else {
      console.log('Sign In Data:', formData);
      // Handle sign-in logic (e.g., send to Firebase or an API)
    }
  };

  return (
    <div className={`container ${active ? 'active' : ''}`} onClick={handleClick}>
      <div className="top"></div>
      <div className="bottom"></div>
      <div className={`center ${isSignUp ? 'signup' : 'signin'}`} onClick={(e) => e.stopPropagation()}>
        <h2 className='!text-black'>{isSignUp ? 'Please Sign Up' : 'Please Sign In'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="date"
                placeholder="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
             <select
  name="gender"
  value={formData.gender}
  onChange={handleChange}
>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="" className='bg-blue-100'>No other options, deal with it 😡</option>
</select>

              <input
                type="url"
                placeholder="Image URL (Optional)"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </>
          )}
          <button className={`btn ${isSignUp ? 'signup' : 'login'}`} type="submit">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
          <p className="toggle-link" onClick={handleToggleMode}>
            {isSignUp
              ? 'Already have an account? Login'
              : 'Don’t have an account? Sign Up'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInComponent;
