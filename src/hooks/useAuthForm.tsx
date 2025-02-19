
import { useState } from 'react';
import { useUserContext } from './UserContext'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser } from './LoggedinUserContext';
const useAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    imageUrl: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [active, setActive] = useState(true);
  const { addUser, authenticateUser } = useUserContext();
  const {login}= useLoggedInUser();
  let navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleToggleMode = () => {
    setActive(prev => !prev); 
     setTimeout(() => {
        setIsSignUp(prev => !prev);
   
        setActive(prev => !prev); 
    }, 1000);
    
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

      try {
        const userData = {
          email: formData.email,
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          password: formData.password,
          role: 'patient',
          gender: formData.gender,
          imageUrl: formData.imageUrl || 'https://t4.ftcdn.net/jpg/09/64/89/19/360_F_964891988_aeRrD7Ee7IhmKQhYkCrkrfE6UHtILfPp.jpg',
        };

        await addUser(userData);
        toast.success('User signed up successfully');
        handleToggleMode();
        setFormData({
          email: '',
          password: '',
          name: '',
          dateOfBirth: '',
          gender: '',
          imageUrl: '',
        });
      } catch (error) {
        toast.error('Sign-up failed');
      }
    } else {
      try {
        const userProfile = await authenticateUser(formData.email, formData.password);
        if (!userProfile) {
          throw new Error('Invalid email or password');
        }
       login(userProfile);
        toast.success('User logged in successfully');
        navigate('/dashboard');
        setFormData({
          email: '',
          password: '',
          name: '',
          dateOfBirth: '',
          gender: '',
          imageUrl: '',
        });
     
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return {
    formData,
    isSignUp,
    active,
    handleChange,
    handleSubmit,
    handleToggleMode,
  };
};

export default useAuth;
