import { useState } from "react";
import { useLibrary } from "./context/LibraryContext";
import { BookOpen, Loader2 } from "lucide-react";

const BookCard = ({ book, isBorrowed }) => {
  const { borrowBook, returnBook } = useLibrary();
  const [isLoading, setIsLoading] = useState(false);

 
  const handleBorrow = () => {
    setIsLoading(true);
    setTimeout(() => {
      borrowBook(book._id);
      setIsLoading(false);
    }, 300);
  };

 
  const handleReturn = () => {
    setIsLoading(true);
    setTimeout(() => {
      returnBook(book._id);
      setIsLoading(false);
    }, 300);
  };

  const buttonDisabled = isLoading;
  const copies = book.availableCopies;
  const availabilityColor = copies === 0
    ? 'text-red-500'
    : copies <= 2
      ? 'text-yellow-500'
      : 'text-green-500';
  
  const getAuthorsText = () => {
    if (!book.authors) return 'Unknown Author';
    if (Array.isArray(book.authors)) {
      return book.authors.map((author) => author.name || author).join(', ');
    }
    return book.authors;
  };

  console.log("books data:", book);

  return (
    <div className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white">
      <div
        className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center bg-gray-200 rounded-xl overflow-hidden"
      >
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-700 to-gray-900">
            <BookOpen size={64} className="text-white opacity-80" />
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 truncate text-gray-900" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm mb-1 truncate text-gray-600">
          by {getAuthorsText()}
        </p>
        <p className="text-xs mb-4 text-gray-500">
          Genre: {book.genre}
        </p>

        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <span>Total: {book.totalCopies}</span>
          <span className={`font-semibold ${availabilityColor}`}>
            Available: {book.availableCopies}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="h-[44px]">
          {isBorrowed ? (
            <button
              onClick={handleReturn}
              disabled={buttonDisabled}
              className="w-full h-full flex items-center justify-center py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Return Book'}
            </button>
          ) : book.availableCopies > 0 ? (
            <button
              onClick={handleBorrow}
              disabled={buttonDisabled}
              className="w-full h-full flex items-center justify-center py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Borrow Book'}
            </button>
          ) : (
            <button
              disabled
              className="w-full h-full py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed opacity-60"
            >
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;