import Main from "./components/main/main";
import "./App.css";
import Preloader from "./components/loader/Preloader";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Correct import
import { UserProvider } from "./hooks/UserContext";
import { AppointmentsProvider } from "./hooks/AppointmentContext";
import { FeedbackProvider } from "./hooks/FeedbackContext";

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
        <AppointmentsProvider>
          <FeedbackProvider>
            <Router>{loading ? <Preloader /> : <Main />}</Router>
          </FeedbackProvider>
        </AppointmentsProvider>
      </UserProvider>
    </>
  );
}

export default App;
