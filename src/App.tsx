import Main from './components/main/main'
import './App.css'
import Preloader from './components/loader/Preloader'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Correct import
import 'antd/dist/reset.css'; // Import Ant Design styles
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
      <Router>
        {loading ? <Preloader /> : <Main />}
      </Router>
    </>
  );
}

export default App;
