const express = require("express");
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
require('dotenv').config({path: './config/.env'})
require('./config/db')
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const app = express();
const cors = require('cors');
const {checkUser, requireAuth} = require('./middleware/authMiddleware');

app.use(express.json())
const corsOptions ={
    origin: `${process.env.FRONT_URL}`, 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
})

// routes
app.use('/user', userRoutes);
app.use('/workout', workoutRoutes);


// server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})