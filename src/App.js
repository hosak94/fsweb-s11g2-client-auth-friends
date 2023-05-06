import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { AuthContext } from "./context/AuthContext";
import FriendsList from "./components/FriendsList";
import Friend from "./components/Friend";
import AddFriend from "./components/AddFriend";
import Header from "./components/Header";
const localStorageKey = "S11G20223";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loggedInToken, setloggedInToken] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem(localStorageKey);

    if (token) {
      setisLoggedIn(true);
      setloggedInToken(token);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        setisLoggedIn,
        isLoggedIn,
        setloggedInToken,
        localStorageKey,
        loggedInToken,
      }}
    >
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/friends/:id"
            element={<Friend localStorageKey={localStorageKey} />}
          />
          <Route path="/friends-list" element={<FriendsList />} />
          <Route
            path="/friends/add"
            element={<AddFriend localStorageKey={localStorageKey} />}
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
