const express = require('express');
const app = express();
const port = 4000;

const userRouter = require("./routes/user");
const boardRouter = require("./routes/board");

app.listen(port, () => {
    console.log(`
    ##############################
            ${port} port
           server running
    ##############################`);
});

app.use(express.json());
app.use("/api", [boardRouter, userRouter]);

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});