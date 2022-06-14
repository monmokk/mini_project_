const express = require('express');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');
const kakaoLogin = require("./middlewares/social-login-middle");

const app = express();
const port = 4000;


app.listen(port, () => {
    console.log(`
    ##############################
            ${port} port
           server running
    ##############################`);
});

kakaoLogin()
app.use(express.json());
app.use("/api", [boardRouter, userRouter]);

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});