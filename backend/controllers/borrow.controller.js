const Book = require('../models/Book.model');
const User = require('../models/user.model');

const borrowBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;


        const book = await Book.findById(bookId);

        if (book.availableCopies <= 0) {
            return res.status(400).json({ msg: "No copies available!" });
        }

        const user = await User.findById(userId);
        const alreadyBorrowed = user.borrowedBooks.some(
            (b) => b.bookId.toString() === bookId
        );

        if (alreadyBorrowed) {
            return res.status(400).json({ msg: "You have already borrowed this book!" });
        }

        book.availableCopies -= 1;
        await book.save();

        user.borrowedBooks.push({
            bookId: book._id,
            title: book.title,
            borrowDate: new Date(),
        });
        await user.save();

        res.status(200).json({ msg: `Successfully borrowed "${book.title}"!` });
    } catch (err) {
        console.error("Borrow error:", err);
        res.status(500).json({ msg: "Server error" });
    }
}

const returnBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;
        console.log("Return request for book ID:", bookId, "by user ID:", userId);
        const book = await Book.findById(bookId);
        const user = await User.findById(userId);

        const borrowedIndex = user.borrowedBooks.findIndex(
            (b) => b.bookId.toString() === bookId
        );
        if (borrowedIndex === -1)
            return res.status(400).json({ msg: "You did not borrow this book!" });

        user.borrowedBooks.splice(borrowedIndex, 1);
        await user.save();
        book.availableCopies += 1;
        await book.save();

        res.status(200).json({ msg: `Returned "${book.title}" successfully!` });
    } catch (err) {
        console.error("Return error:", err);
        res.status(500).json({ msg: "Server error" });
    }
}

const getBorrowedBooks = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId);

        const borrowedBooks = user.borrowedBooks.map((b) => ({
            _id: b.bookId,
            title: b.title,
            borrowDate: b.borrowDate.toLocaleDateString(),
        }));

        res.status(200).json(borrowedBooks);
    } catch (err) {
        console.error("Error fetching borrowed books:", err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { borrowBook, returnBook, getBorrowedBooks };