const express=require('express');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const borrowRoutes = require('./routes/borrowBook.routes');
const cors = require('cors');


require('dotenv').config();
const app=express();
const PORT=process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://book-libary-frontend1.onrender.com",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use('/api/auth',authRoutes);

app.use('/api/books',bookRoutes);
app.use('/api/borrow',borrowRoutes);

app.listen(PORT,()=>{
    connectDb();
    console.log('Server is running on port '+PORT);
})


