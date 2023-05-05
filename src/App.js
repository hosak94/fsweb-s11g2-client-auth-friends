import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { AuthContext } from "./context/AuthContext";

const localStorageKey = "s11g20223";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInToken, setLoggedInToken] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem(localStorageKey);
    if (token) {
      setIsLoggedIn(true);
      setLoggedInToken(token);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        loggedInToken,
        setIsLoggedIn,
        isLoggedIn,
        setLoggedInToken,
        localStorageKey,
      }}
    >
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* <Route
          render={() =>
            isLoggedIn ? <FriendsList /> : <Redirect to="/login" />
          }
          exact
          path="/friends-list"
        />

        <Route path="/friends/add" element={<AddFriend />} />

        <Route path="/friends/:id" element={<Friend />} /> */}
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
