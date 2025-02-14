import React, { useState, useEffect } from 'react';
import './login.css';
import { authenticateUser, addUser } from '../../services/userService';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';  // For redirecting

const SignInComponent = () => {
  const [active, setActive] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    imageUrl: '',
  });
  const navigate = useNavigate();  // For redirecting
 
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
     
      navigate('/error');  
    }
  }, [navigate]);

  const handleClick = () => {
    setActive(prev => !prev);
  };

  const handleToggleMode = () => {
    handleClick();
    setTimeout(() => {
      setIsSignUp(prev => !prev);
      handleClick(); 
    }, 1000); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss(); // Clear previous errors
  
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required');
      return;
    }
  
    if (isSignUp) {
      if (!formData.name) {
        toast.error('Name is required');
        return;
      }
      if (!formData.dateOfBirth) {
        toast.error('Date of Birth is required');
        return;
      }
      if (!formData.gender) {
        toast.error('Gender is required');
        return;
      }
    }
  
    try {
      if (isSignUp) {
        // Sign-up logic
        const userData = {
          email: formData.email,
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          password: formData.password,
          role: 'patient', // Default role for new users
          gender: formData.gender,
          imageUrl: formData.imageUrl || undefined,
        };
  
        await addUser(userData);
        toast.success('User signed up successfully');
        handleToggleMode();
  
        // Clear form fields after successful signup
        setFormData({
          email: '',
          password: '',
          name: '',
          dateOfBirth: '',
          gender: '',
          imageUrl: '',
        });
      } else {
        // Sign-in logic
        const userProfile = await authenticateUser(formData.email, formData.password);
  
        if (!userProfile) {
          throw new Error('Invalid email or password');
        }
  
        // Store user data in session
        sessionStorage.setItem('user', JSON.stringify(userProfile));
        toast.success('User logged in successfully');
  
        // Clear form fields after successful login
        setFormData({
          email: '',
          password: '',
          name: '',
          dateOfBirth: '',
          gender: '',
          imageUrl: '',
        });
  
        // Navigate based on user role
        const role = userProfile.role;
        console.log(userProfile.email)  ;
        navigate('/');
        
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  

  const defaultImage = 'https://t4.ftcdn.net/jpg/09/64/89/19/360_F_964891988_aeRrD7Ee7IhmKQhYkCrkrfE6UHtILfPp.jpg';

  return (
    <div className={`container ${active ? 'active' : ''}`} >
      <div className="top"></div>
      <div className="bottom"></div>
      <div className={`center ${isSignUp ? 'signup' : 'signin'}`} onClick={(e) => e.stopPropagation()}>
        <h2 className='!text-black'>{isSignUp ? 'Please Sign Up' : 'Please Sign In'}</h2>
       
        <form onSubmit={handleSubmit}>
         {isSignUp && <div className="image-circle-container">
            <img 
              src={formData.imageUrl || defaultImage} 
              alt="User Avatar" 
              className="user-image" 
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
      <ToastContainer position='bottom-left'/> {/* Toast container to display the toasts */}
    </div>
  );
};

export default SignInComponent;
