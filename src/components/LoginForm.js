import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const [loginUser, setLoginUser] = useState({});

  const navigate = useNavigate();

  const { setIsLoggedIn, isLoggedIn, setLoggedInToken, localStorageKey } =
    useContext(AuthContext);

  const handleChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/friends-list");
    }
  }, []);

  const myLogin = () => {
    axios
      .post("http://localhost:9000/api/login", loginUser)
      .then(function (response) {
        console.log(response);
        setIsLoggedIn(true);
        setLoggedInToken(response.data.token);
        localStorage.setItem(localStorageKey, response.data.token);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoggedIn(false);
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
            <input
              name="username"
              //   value={loginUser.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <h2>PASSWORD</h2>
            <input
              type="password"
              name="password"
              //   value={loginUser.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
