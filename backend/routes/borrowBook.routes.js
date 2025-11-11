const express=require('express');
const { borrowBook, returnBook, getBorrowedBooks } = require('../controllers/borrow.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const routes=express.Router();

routes.put('/:id',authMiddleware,borrowBook)
routes.put('/return/:id',authMiddleware,returnBook)
routes.get('/user-borrowed-books', authMiddleware, getBorrowedBooks);

module.exports=routes;