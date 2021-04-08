const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//Routes
const authRoutes = require('./routes/auth');  
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');

//environment variable
env.config();

//mongodb connection 
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.sel2q.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false, 
    }
).then(() => {
    console.log('Database Connected');
});


//add middleware
app.use(cors())  //allow all the api calls
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));      //expose static files in the browser
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});