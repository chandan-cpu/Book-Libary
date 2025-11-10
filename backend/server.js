const express=require('express');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const roleRoutes=require('./routes/role.routes')
const cors = require('cors');


require('dotenv').config();
const app=express();
const PORT=process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL - must be specific when using credentials
    credentials: true, // allow cookies/credentials
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use('/api/auth',authRoutes);

app.use("/api/roles", roleRoutes);

app.use('/api/books',bookRoutes);

app.listen(PORT,()=>{
    connectDb();
    console.log('Server is running on port '+PORT);
})

