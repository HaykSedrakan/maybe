import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt, {
    verify
} from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const salt = 10

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000", "https://6bf6-2a00-cc47-232c-1101-00-11aa.ngrok-free.app"],
    methods: ["PUT", "POST", "GET", "DELETE"],
    credentials: true
}));

app.use(cookieParser())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hayk2007",
    database: "aca",
});

app.post('/register', (req, res) => {
    const q = 'INSERT INTO users (`name`, `email`, `password`, `phoneNumber`) VALUES (?)'
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({
            Error: 'Error for hassing password'
        })
        const values = [req.body.name, req.body.email, hash, req.body.phoneNumber]

        db.query(q, [values], (err, data) => {
            if (err) return res.json({
                Error: 'Inserting data Error in server'
            })

            return res.json({
                Status: 'Success'
            })
        })
    })
})

app.post('/login', (req, res) => {
    const q = 'SELECT * FROM users WHERE email = ?'

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json({
            Error: 'Login error in server'
        })
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.json({
                        Error: 'Login error in server'
                    })
                }
                if (response) {
                    const name = data[0].name
                    const token = jwt.sign({
                        name
                    }, "aca-project-jwt-token", {
                        expiresIn: '10d'
                    })
                    res.cookie('token', token, {
                        sameSite: 'none',
                        secure: true
                    });

                    return res.json({
                        Status: "Success"
                    })
                } else {
                    return res.json({
                        Error: 'Password not matched'
                    })
                }
            })
        } else {
            return res.json({
                Error: 'Login error in server'
            })
        }
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.json({
            Error: 'You are not authenticated'
        })
    } else {
        jwt.verify(token, "aca-project-jwt-token", (err, decoded) => {
            if (err) {
                return res.json({
                    Error: 'Token is not okey'
                })
            } else {
                req.name = decoded.name
                next()
            }
        })
    }
}
app.get('/isAuth', verifyUser, (req, res) => {
    const q = 'SELECT * FROM users WHERE name = ?';

    db.query(q, [req.name], (err, data) => {
        if (err) {
            return res.json({
                Error: 'Failed to retrieve user data'
            });
        }

        if (data.length === 0) {
            return res.json({
                Error: 'User not found'
            });
        }

        const user = data[0];
        return res.json({
            Status: 'Success',
            user: user
        });
    });
});


app.post('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({
        Status: 'Success'
    })
})

app.post('/addcategory', (req, res) => {
    const q = 'INSERT INTO categories (`category`,`disabled`) VALUES (?)'

    const values = [req.body.category, req.body.disabled]

    db.query(q, [values], (err, data) => {
        return err ? res.send(err) : res.send('Category has been created')
    })
})

app.get('/categories', (req, res) => {
    const q = 'SELECT * FROM categories'

    db.query(q, (err, data) => {
        return err ? res.send(err) : res.send(data)
    })
})

app.put('/editCategory', (req, res) => {
    const q = 'UPDATE categories SET `disabled` = ? WHERE id = ?'

    db.query(q, [req.body.isChecked, req.body.id], (err, data) => {
        return err ? res.send(err) : res.send('Category has been edit success')
    })
})

app.delete('/deleteCategory/:id', (req, res) => {
    const q = "DELETE FROM categories WHERE id = ?"

    const categoryId = req.params.id

    db.query(q, [categoryId], (err, data) => {
        return err ? res.send(err) : res.send("Category has been delete success")
    })
})

app.get('/products', (req, res) => {
    const q = 'SELECT * FROM items'

    db.query(q, (err, data) => {
        return err ? res.send(err) : res.send(data)
    })
})


app.listen(process.env.PORT || 3030, () => {
    console.log(`Server has been connect success ${process.env.PORT || 3030}`)
})