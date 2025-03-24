import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { mockUserArray } from './mockUsers.js';

const app = express();
const port = 3000;

app.use(cookieParser());

app.use(express.json()); // Add this line to parse JSON request body
app.use(session({
    secret: 'abef',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
})
);

app.post('/auth', (req, res) => {
    const {
        body: { username, password },
    } = req;
    const findUser = mockUserArray.find(user => user.username === username);

    if (!findUser) {
        return res.status(401).send('User not found');
    }
    if (findUser.password !== password) {
        return res.status(401).send('Password is incorrect');
    }
    req.session.user = findUser;
    res.status(200).send("User logged in as " + findUser.username);
});

app.get('/auth', (req, res) => {
    if (req.session.user) {
        return res.status(200).send(req.session.user);
    }
    res.status(401).send('User not logged in');
});

app.listen(port, () => {
    console.log(`Server online on port ${port}`)
});