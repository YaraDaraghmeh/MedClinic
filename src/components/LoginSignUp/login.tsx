import React, { useEffect } from 'react';
import './login.css';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';  
import useAuth from '../../hooks/useAuthForm';
import { useLoggedInUser } from '../../hooks/LoggedinUserContext';

const SignInComponent = () => {
  const { formData, isSignUp, active, handleChange, handleSubmit, handleToggleMode } = useAuth();
  const {loggedInUser}= useLoggedInUser();
    const navigate = useNavigate();  

  useEffect(() => {
    if (loggedInUser) {
        navigate('/dashboard');
    }
  },[loggedInUser,navigate]);
  const defaultImage = 'https://t4.ftcdn.net/jpg/09/64/89/19/360_F_964891988_aeRrD7Ee7IhmKQhYkCrkrfE6UHtILfPp.jpg';

  return (
    <div className={`container ${active ? 'active' : ''}`}>
      <div className="top"></div>
      <div className="bottom"></div>
      <div className={`center ${isSignUp ? 'signup' : 'signin'}`} onClick={(e) => e.stopPropagation()}>
        <h2 className='!text-black'>{isSignUp ? 'Please Sign Up' : 'Please Sign In'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && <div className="image-circle-container">
            <img 
              src={formData.imageUrl || defaultImage} 
              alt="User Avatar" 
              className="user-image-sign" 
            />
          </div>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
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
      <ToastContainer position='bottom-left' />
    </div>
  );
};

export default SignInComponent;
