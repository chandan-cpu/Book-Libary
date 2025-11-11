import React, { createContext, useState, useContext } from "react";
import Toast from "../Toast";
import { useEffect } from "react";
import api from "../../axios";


const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState({});

  const fetchBooksFromAPI = async () => {
    try {
      const response = await api.get("/books/get-books");
      const data = response.data;
      console.log("Fetched Books:", data);
      setBooks(data || [] );
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("No token found, using default user");
      return;
    }
    
    try {
      const response = await api.get("/auth/profile");
      console.log("Fetched User Profile:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
  
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
      }
    }
  };

  const fetchBorrowedBooks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      const response = await api.get("/borrow/user-borrowed-books");
      console.log("Fetched Borrowed Books:", response.data);
      setBorrowedBooks(response.data || []);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    }
  };

  useEffect(() => {
    fetchBooksFromAPI();
    fetchUserProfile(); 
    fetchBorrowedBooks();
  }, []);

  const showToast = (message, type) => setToast({ message, type });

  const borrowBook = async (bookId) => {
    try {
      console.log("Attempting to borrow book with ID:", bookId);
      
   
      const alreadyBorrowed = borrowedBooks.some((b) => b._id === bookId);
      if (alreadyBorrowed) {
        return showToast("You have already borrowed this book!", "error");
      }

  
      const book = books.find((b) => b._id === bookId);
      if (!book) {
        return showToast("Book not found!", "error");
      }

      if (book.availableCopies <= 0) {
        return showToast("No copies available!", "error");
      }

      const res = await api.put(`/borrow/${bookId}`);
      console.log("Borrow response:", res.data);
      
  
      setBooks(books.map((b) => 
        b._id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b
      ));
      
   
      await fetchBorrowedBooks();
      
      showToast(res.data.msg || `Successfully borrowed "${book.title}"!`, "success");
    } catch (err) {
      console.error("Borrow error:", err);
      showToast(err.response?.data?.msg || "Failed to borrow book!", "error");
    }
  };



  const returnBook = async (bookId) => {
    try {
      console.log("Attempting to return book with ID:", bookId);
      

      const book = books.find((b) => b._id === bookId);
      if (!book) {
        return showToast("Book not found!", "error");
      }

   
      const res = await api.put(`/borrow/return/${bookId}`);
      console.log("Return response:", res.data);
      
    
      setBooks(books.map((b) => 
        b._id === bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b
      ));
      
   
      await fetchBorrowedBooks();
      
      showToast(res.data.msg || `Returned "${book.title}" successfully!`, "success");
    } catch (err) {
      console.error("Return error:", err);
      showToast(err.response?.data?.msg || "Failed to return book!", "error");
    }
  };

  const updateUser = (data) => {
    setUser({ ...user, ...data });
    showToast("Profile updated!", "success");
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        borrowedBooks,
        borrowBook,
        returnBook,
        user,
        updateUser,
      }}
    >
      <div>
        {children}
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </LibraryContext.Provider>
  );
};
