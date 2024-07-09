import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Set up Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Determine if Navbar should be shown
  const showNavbar = !["/login", "/signUp"].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar userState={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login LoginPage={true} />} />
        <Route path="/signUp" element={<Login LoginPage={false} />} />
      </Routes>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
