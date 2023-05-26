import styles from './Registration.module.css'
import { HiLockClosed } from 'react-icons/hi'
import TextField from '@mui/material/TextField'
import { RiAdminFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Box from '@mui/material/Box'

export default function Registration() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    age: 0,
  })
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  console.log(values)
  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:3020/register', values)
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/login')
        } else {
          alert('Error !')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src="/image/icons/3094352.jpg" className={styles.mainImg} />
        </div>
        <div className={styles.loginContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <img src="/image/icons/login.svg" alt="Image" />
            <h2 className={styles.title}>Registration</h2>
            <div className={styles.textFieldContainer}>
              <TextField
                name="name"
                onChange={handleChange}
                id="outlined-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
                sx={{ width: '400px' }}
              />
            </div>
            <div className={styles.textFieldContainer}>
              <TextField
                name="email"
                onChange={handleChange}
                id="outlined-multiline-flexible"
                label="E-Mail"
                multiline
                maxRows={4}
                sx={{ width: '400px' }}
              />
            </div>
            <div className={styles.textFieldContainer}>
              <TextField
                name="password"
                onChange={handleChange}
                id="outlined-multiline-flexible"
                label="Password"
                multiline
                maxRows={4}
                sx={{ width: '400px' }}
              />
            </div>
            <div className={styles.textFieldContainer}>
              <TextField
                onChange={handleChange}
                id="outlined-helperText"
                label="Age"
                name="age"
              />
            </div>
            <input type="submit" className={styles.btn} value="Registration" />
            <div className={styles.linkToLogin}>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
