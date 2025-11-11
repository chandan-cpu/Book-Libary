import { useMemo, useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import SearchInput from "../SearchInput";
import EmptyState from "../EmptyState";
import BookCard from "../BookCard";

const CatalogPage = () => {
  const { books, borrowedBooks } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');

  console.log("All Books:", books);

  const filteredBooks = useMemo(() => {
    if (!searchTerm) {
      return books;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(lowerSearchTerm) ||
      (Array.isArray(book.authors) && book.authors.some(author => 
        author.toLowerCase().includes(lowerSearchTerm)
      )) ||
      book.genre.toLowerCase().includes(lowerSearchTerm)
    );
  }, [books, searchTerm]);

  console.log("Filtered Books:", filteredBooks);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Book Catalog
        </h1>

        <div className="mb-8">
          <SearchInput
            onSearch={setSearchTerm}
            placeholder="Search by title, author, or genre..."
          />
        </div>

        {filteredBooks.length === 0 ? (
          <EmptyState message="No books found matching your search." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => (
              <BookCard
                key={book._id}
                book={book}
                isBorrowed={borrowedBooks.some(b => b._id === book._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;