import React, { useState, useEffect } from "react";
import { Book, Plus } from "lucide-react";
import api from "../../axios";
import BookCardAdmin from "./BookCardAdmin";
import BookModalAdmin from "./BookModelAdmin";
import SearchBar from "./SearchBar";
import BookStats from "./BookStats";


export default function BookAdminPanel() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooksFromAPI = async () => {
    try {
      const response = await api.get("/books/get-books");
      setBooks(response.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooksFromAPI();
  }, []);

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks((prev) => prev.filter((book) => book.id !== bookId));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleSave = (newBook) => {
    if (editingBook) {
      setBooks((prev) =>
        prev.map((book) => (book.id === newBook.id ? newBook : book))
      );
    } else {
      setBooks((prev) => [...prev, { ...newBook, id: Date.now().toString() }]);
    }
    handleModalClose();
  };

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      (Array.isArray(book.authors)
        ? book.authors.join(", ").toLowerCase()
        : book.authors.toLowerCase()
      ).includes(searchLower) ||
      book.genre.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Library Admin Panel
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md"
          >
            <Plus className="w-5 h-5" /> Add New Book
          </button>
        </div>

        <BookStats books={books} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCardAdmin
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {isModalOpen && (
          <BookModalAdmin
            editingBook={editingBook}
            onClose={handleModalClose}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}
