const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const userRoute = require('./routes/user_route');
const taskRoute = require('./routes/task_route');

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(bodyparser.json());
connectdb();

app.use('/api/user', userRoute);
app.use('/api/task', taskRoute);

// static files serve
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`server runnig on ${PORT}`);
})


