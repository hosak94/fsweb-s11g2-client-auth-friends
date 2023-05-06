import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Friend(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoggedIn, loggedInToken } = useContext(AuthContext);

  const [friend, setFriend] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem(props.localStorageKey);
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:9000/api/friends/${id}`, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => setFriend(res.data))
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  return (
    <div className="friendListDiv">
      <h1>FRIENDS LIST</h1>

      <div className="friendList">
        -{friend.name}-{friend.email}
      </div>
    </div>
  );
}
