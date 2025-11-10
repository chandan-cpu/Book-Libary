const express=require('express');
const { addBook, getBooks, updateBooks, deletBook } = require('../controllers/book.Controller');

const routes=express.Router();


routes.post('/add-book',addBook);
routes.get('/get-books', getBooks);
routes.put('/update-book/:id', updateBooks);
routes.delete('/delete-book/:id', deletBook);

    



module.exports=routes;