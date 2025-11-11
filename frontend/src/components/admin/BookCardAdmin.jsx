import React from "react";
import { Edit2, Trash2, BookOpen } from "lucide-react";

export default function BookCardAdmin({ book, onEdit, onDelete }) {
  const borrowed = book.totalCopies - book.availableCopies;
  const authors = Array.isArray(book.authors)
    ? book.authors.join(", ")
    : book.authors;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-400 to-purple-500">
            <BookOpen className="w-20 h-20 text-white opacity-50" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              book.availableCopies > 0
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {book.availableCopies > 0 ? "Available" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {authors}</p>
        <p className="text-xs text-gray-500 mb-3">Genre: {book.genre}</p>

        <div className="grid grid-cols-3 text-center border-t pt-2">
          <div>
            <div className="text-xs text-gray-500">Total</div>
            <div className="font-bold">{book.totalCopies}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Borrowed</div>
            <div className="font-bold text-orange-600">{borrowed}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Available</div>
            <div className="font-bold text-green-600">{book.availableCopies}</div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 cursor-pointer px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-1"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="flex-1 cursor-pointer px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
