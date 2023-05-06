import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { isLoggedIn, localStorageKey, setisLoggedIn, setloggedInToken } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem(localStorageKey);
    setisLoggedIn(false);
    setloggedInToken(null);
    navigate("/");
    console.log("logOut Completed");
  };

  return (
    <div>
      <div className="loginFormHeaderDiv">
        <div>
          <h1>FRIENDS DATABASE</h1>
        </div>
        <div className="loginFormHeaderButtonDiv">
          {!isLoggedIn && (
            <button onClick={() => navigate("/login")}>LOGIN</button>
          )}

          {isLoggedIn && (
            <>
              <button onClick={() => navigate("/friends-list/")}>
                FRIENDLIST
              </button>
              <button onClick={() => navigate("/friends/add")}>
                ADDFRIEND
              </button>
              <button onClick={logOut}>LOGOUT</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
