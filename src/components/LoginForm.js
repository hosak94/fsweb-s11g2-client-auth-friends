import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const [loginUser, setLoginUser] = useState({});

  const navigate = useNavigate();
  const {
    setisLoggedIn,
    setloggedInToken,
    isLoggedIn,
    loggedInToken,
    localStorageKey,
  } = useContext(AuthContext);

  const handleChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/friends-list");
    }
  }, [isLoggedIn]);

  const myLogin = () => {
    axios
      .post("http://localhost:9000/api/login", loginUser)
      .then(function (response) {
        console.log(response);
        setisLoggedIn(true);
        setloggedInToken(response.data.token);
        localStorage.setItem(localStorageKey, response.data.token);
      })
      .catch(function (error) {
        console.log(error);
        setisLoggedIn(false);
        localStorage.clear();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    myLogin();
  };
  return (
    <div>
      <div className="loginFormMainDiv">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>USERNAME</h2>
            <input name="username" onChange={handleChange}></input>
          </div>
          <div>
            <h2>PASSWORD</h2>
            <input
              type="password"
              name="password"
              onChange={handleChange}
            ></input>
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
