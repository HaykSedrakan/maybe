import { useState, useEffect } from "react";
import axios from "axios";
import { vars } from "../constants/variables";

const useUser = () => {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`${vars.API}/isAuth`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUser(res.data.user);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  return { isAuth, user, message, error };
};

export default useUser;
