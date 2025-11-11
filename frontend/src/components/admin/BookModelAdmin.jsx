import React, { useState } from "react";
import { X } from "lucide-react";
import api from "../../axios";

export default function BookModalAdmin({ editingBook, onClose, fetchFunction }) {
  const [formData, setFormData] = useState(() => {

    if (editingBook) {
      return {
        ...editingBook,
        authors: Array.isArray(editingBook.authors)
          ? editingBook.authors.join(", ")
          : editingBook.authors || "",
        totalCopies: editingBook.totalCopies || "",
        availableCopies: editingBook.availableCopies || "",
        description: editingBook.description || "",
        coverUrl: editingBook.coverUrl || "",
        genre: editingBook.genre || "",
      };
    }

    return {
      title: "",
      authors: "",
      ISBN: "",
      genre: "",
      totalCopies: "",
      availableCopies: "",
      description: "",
      coverUrl: "",
    };
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    // basic validation
    if (!formData.title || !formData.authors || !formData.ISBN) {
      return alert("Please fill in Title, Authors, and ISBN.");
    }

    // normalize payload
    const payload = {
      title: formData.title,
      authors: typeof formData.authors === "string"
        ? formData.authors.split(",").map((a) => a.trim()).filter(Boolean)
        : formData.authors,
      ISBN: formData.ISBN,
      genre: formData.genre,
      totalCopies: formData.totalCopies ? Number(formData.totalCopies) : 0,
      description: formData.description,
      coverUrl: formData.coverUrl,
    };

    try {
      if (editingBook && (editingBook._id || editingBook.id)) {
        const id = editingBook._id || editingBook.id;
        await api.put(`/books/update-book/${id}`, payload);
        alert("Book updated successfully.");
      } else {
        await api.post("/books/add-book", payload);
        alert("Book added successfully.");
      }
      if (typeof fetchFunction === "function") fetchFunction();
      onClose();
    } catch (error) {
      console.error("Save book error:", error);
      const msg = error?.response?.data?.msg || error?.message || "Failed to save book.";
      alert(msg);
    }

  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-2xl flex items-center justify-center p-4 z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col ">

        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white rounded-t-lg">
          <h2 className="text-xl font-bold">
            {editingBook ? "Edit Book" : "Add New Book"}
          </h2>
          <button onClick={onClose} aria-label="Close modal">
            <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          {/* Title (Full Width) */}
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 md:col-span-2"
          />

          {/* Authors (Full Width) */}
          <input
            type="text"
            name="authors"
            placeholder="Authors (comma-separated)"
            value={formData.authors}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 md:col-span-2"
          />

          {/* ISBN */}
          <input
            type="text"
            name="ISBN"
            placeholder="ISBN"
            value={formData.ISBN}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          {/* Genre */}
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          {/* Total Copies */}
          <input
            type="number"
            name="totalCopies"
            placeholder="Total Copies"
            value={formData.totalCopies}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          {/* Available Copies (NEWLY ADDED) */}
          <input
            name="availableCopies"
            type="number"
            placeholder="Available Copies"
            value={formData.availableCopies}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          {/* Cover URL (Full Width - NEWLY ADDED) */}
          <input
            type="text"
            name="coverUrl"
            placeholder="Cover Image URL"
            value={formData.coverUrl}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 md:col-span-2"
          />

          {/* Description (Full Width) */}
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 md:col-span-2"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex gap-4 p-6 border-t sticky bottom-0 bg-white rounded-b-lg">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 cursor-pointer"
          >
            {editingBook ? "Update Book" : "Add Book"}
          </button>
        </div>

      </div>
    </div>
  );
}