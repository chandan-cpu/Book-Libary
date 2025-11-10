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

const getBooks=async(req,res)=>{
    try {
        const books=await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

const updateBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, authors, genre, totalCopies, description, coverUrl } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Adjust availableCopies if totalCopies changes
    if (totalCopies !== undefined && totalCopies !== book.totalCopies) {
      const diff = totalCopies - book.totalCopies;
      book.availableCopies += diff;
      if (book.availableCopies < 0) book.availableCopies = 0;
      book.totalCopies = totalCopies;
    }

    // Update other fields safely
    if (title) book.title = title;
    if (authors) book.authors = authors;
    if (genre) book.genre = genre;
    if (description) book.description = description;
    if (coverUrl) book.coverUrl = coverUrl;

    await book.save();
    res.status(200).json({ msg: "Book updated successfully", book });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const deletBook=async(req,res)=>{
    const {id}=req.params;
    try{
        const book=await Book.findByIdAndDelete(id);
        if(!book)
        {
            return res.status(404).json({msg:'Book not found'});
        }
        res.status(200).json({msg:'Book deleted successfully'});
    } catch (error) {
        res.status(500).json({msg:'Server error'});
    }
}


module.exports = { addBook, getBooks, updateBooks, deletBook };