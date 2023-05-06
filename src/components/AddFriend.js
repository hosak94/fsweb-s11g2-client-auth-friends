import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function AddFriend(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const { isLoggedIn, loggedInToken } = useContext(AuthContext);

  useEffect(() => {
    const token = window.localStorage.getItem(props.localStorageKey);
    if (!token) {
      navigate("/login");
    }
  }, []);

  const onSubmitLogin = (data) => {
    const config = {
      method: "post",
      url: "http://localhost:9000/api/friends",
      headers: {
        "Content-Type": "application/json",
        Authorization: loggedInToken,
      },
      data: JSON.stringify(data),
    };
    axios(config)
      .then(function (response) {
        navigate("/friends-list");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="loginFormMainDiv">
      <h1>Add Friend</h1>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: "Ama adın ne?" })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            {...register("email", {
              required: "Epostanı ver  ki spamlayalım.",
            })}
          />
        </div>
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
}
