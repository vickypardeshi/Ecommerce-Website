const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');  //authentication routes
const adminRoutes = require('./routes/admin/auth');

//environment variable
env.config();

//mongodb connection 
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.sel2q.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
).then(() => {
    console.log('Database Connected');
});


//add middleware
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});