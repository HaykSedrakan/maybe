import { useState, useEffect } from 'react'
import axios from 'axios'

const useUser = () => {
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/isAuth`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true)
          setUser({
            ...res.data.user,
            avatar: JSON.parse(res.data.user.avatar),
            favourite: JSON.parse(res.data.user.favourite),
          })
        } else {
          setAuth(false)
          setMessage(res.data.Error)
        }
      })
      .catch((err) => setError(err.message))
  }, [])

  return { isAuth, user, message, error }
}

export default useUser
