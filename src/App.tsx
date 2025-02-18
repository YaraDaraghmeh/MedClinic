import Main from './components/main/main'
import './App.css'
import Preloader from './components/loader/Preloader'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Correct import
import { UserProvider } from './hooks/UserContext';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => {
      setLoading(false); 
    }, 3000);
  }, []);
  
  return (
    <>
      <UserProvider>
      <Router>
        {loading ? <Preloader /> : <Main />}
      </Router></UserProvider>
    </>
  );
}

export default App;
