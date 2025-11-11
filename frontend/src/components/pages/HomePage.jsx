import React from "react";
import { BookOpen, Library } from "lucide-react";
import { useLibrary } from "../context/LibraryContext";
import AnimatedStatCard from "../AnimatedStatCard";

const HomePage = ({ setCurrentPage }) => {
 
  const { books, borrowedBooks, user } = useLibrary();
  
  console.log("User Data from Context:", user);
 
  const availableBooks = books.reduce((sum, book) => sum + book.availableCopies, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 text-gray-900">
          <h1 className="text-5xl font-bold mb-4">
            Welcome back, {user?.name || 'Guest'}!
          </h1>
          <p className="text-xl text-gray-600">
            Your digital gateway to knowledge and imagination
          </p>
          {user?.email && (
            <p className="text-sm mt-2 text-gray-500">
              {user.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <AnimatedStatCard
            value={books.length}
            title="Total Books"
            icon={<Library />}
            colorClass="text-blue-500"
          />
          <AnimatedStatCard
            value={availableBooks}
            title="Available Copies"
            icon={<BookOpen />}
            colorClass="text-green-500"
          />
          <AnimatedStatCard
            value={borrowedBooks.length}
            title="Books Borrowed"
            icon={<BookOpen />}
            colorClass="text-purple-500"
          />
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentPage('catalog')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors text-lg"
          >
            Browse Catalog
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;