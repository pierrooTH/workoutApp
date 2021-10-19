const mongoose = require('mongoose');

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER_PASS}@sportapp.py0we.mongodb.net/db_sport_app`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }
)
.then(() => console.log('Database mongoDB connected'))
.catch((err) => console.log(`Connection database error : ${err}`))