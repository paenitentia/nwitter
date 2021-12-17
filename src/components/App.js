import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {

  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);


  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        //setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  
  const refreshUser = () => {
    //const user = authService.currentUser;
    setUserObj({
      uid: authService.currentUser.uid,
      displayName: authService.currentUser.displayName,
    });
    //setUserObj(user);
  }
  
  return (
      <div>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> : "Initializing..."}
      <footer className="footer">&copy; {new Date().getFullYear()} Nwitter</footer> 
      </div>
    );
}

export default App;
