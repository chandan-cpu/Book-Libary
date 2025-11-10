const Book=require('../models/Book.model');

const addBook=async(req,res)=>{
    const {title,authors,ISBN,genre,totalCopies,description,coverUrl}=req.body;

    try{
        const exist=await Book.findOne({ISBN});
        if(exist)
        {
            return res.status(400).json({msg:'Book with this ISBN already exists'});
        }
        const newBook = new Book({
            title,
            authors,
            ISBN,
            genre,
            totalCopies,
            availableCopies: totalCopies,
            description,
            coverUrl
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

module.exports = { addBook };