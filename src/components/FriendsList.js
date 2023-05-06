import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function FriendsList(props) {
  const navigate = useNavigate();
  const { isLoggedIn, loggedInToken } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      console.log("loggedInToken", loggedInToken);
      axios
        .get("http://localhost:9000/api/friends", {
          headers: {
            authorization: loggedInToken,
          },
        })
        .then((res) => setFriends(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="friendListDiv">
      <h1>FRIENDS LIST</h1>
      {friends.map((friend, key) => (
        <div className="friendList" key={key}>
          -{friend.name}-{friend.email}
        </div>
      ))}
    </div>
  );
}
