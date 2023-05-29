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
    origin: ["http://localhost:3000", "https://7ae6-2a00-cc47-232c-1101-00-b70a.ngrok-free.app"],
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
    const q = 'INSERT INTO users (`name`, `email`, `password`, `phoneNumber`, `date`) VALUES (?)'
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({
            Error: 'Error for hassing password'
        })
        const values = [req.body.name, req.body.email, hash, req.body.phoneNumber, req.body.date]

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
    res.clearCookie('token', {
        sameSite: 'none',
        secure: true
    })
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


app.post('/addbaner', (req, res) => {
    const q = 'INSERT INTO baners (`img`) VALUES (?)'

    db.query(q, [req.body.img], (err, data) => {
        return err ? res.send(err) : res.send('Baner has been created success')
    })
})

app.get('/baners', (req, res) => {
    const q = "SELECT * FROM baners"

    db.query(q, (err, data) => {
        return err ? res.send(err) : res.send(data)
    })
})

app.delete('/deletebaner/:id', (req, res) => {
    const q = 'DELETE FROM baners WHERE id = ?'
    const banerid = req.params.id

    db.query(q, [banerid], (err, data) => {
        return err ? res.send(err) : res.send('Baner has been delete success')
    })
})

app.get('/products', (req, res) => {
    const q = 'SELECT * FROM items'

    db.query(q, (err, data) => {
        return err ? res.send(err) : res.send(data)
    })
})


app.get('/users', (req, res) => {
    const q = 'SELECT * FROM users'

    db.query(q, (err, data) => {
        return err ? res.send(err) : res.send(data)
    })
})

app.put('/edituser/:id', (req, res) => {
    const userId = req.params.id;

    const values = [];
    const params = [];

    if (req.body.name) {
        values.push(`name = ?`);
        params.push(req.body.name);
    }

    if (req.body.avatar) {
        values.push(`avatar = ?`);
        params.push(req.body.avatar);
    }
    if (req.body.phoneNumber) {
        values.push(`phoneNumber = ?`);
        params.push(req.body.phoneNumber);
    }
    if (req.body.bio) {
        values.push(`bio = ?`);
        params.push(req.body.bio);
    }
    if (req.body.email) {
        values.push(`email = ?`);
        params.push(req.body.email);
    }

    if (values.length === 0) {
        return res.send('No fields to update');
    }

    params.push(userId);

    const q = `UPDATE users SET ${values.join(', ')} WHERE id = ?`;

    db.query(q, params, (err, data) => {
        if (err) {
            return res.send(err);
        }

        // Обновление JWT с новым именем пользователя
        const name = req.body.name;
        const token = jwt.sign({
            name
        }, "aca-project-jwt-token", {
            expiresIn: '10d'
        });
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true
        });

        return res.send('User has been updated successfully!');
    });
});

app.post('/addFavourite/user/:id', (req, res) => {
    const userId = req.params.id;
    const favourite = req.body.favourite;

    if (!favourite) {
        return res.send('No fields to update');
    }

    const q = `UPDATE users SET favourite = ? WHERE id = ?`;

    db.query(q, [favourite, userId], (err, data) => {
        if (err) {
            return res.send(err);
        }

        return res.send('User favorites added successfully');
    });
});




app.listen(process.env.PORT || 3030, () => {
    console.log(`Server has been connect success ${process.env.PORT || 3030}`)
})