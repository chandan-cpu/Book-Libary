import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BookModalAdmin({ editingBook, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    ISBN: "",
    genre: "",
    totalCopies: "",
    availableCopies: "",
    description: "",
    coverUrl: "",
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        ...editingBook,
        authors: Array.isArray(editingBook.authors)
          ? editingBook.authors.join(", ")
          : editingBook.authors,
      });
    }
  }, [editingBook]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.title || !formData.authors || !formData.ISBN)
      return alert("Please fill in all required fields");
    const authorsArray = formData.authors.split(",").map((a) => a.trim());
    onSave({ ...formData, authors: authorsArray });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">
            {editingBook ? "Edit Book" : "Add Book"}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <input
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <input
            name="authors"
            placeholder="Authors (comma-separated)"
            value={formData.authors}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <input
            name="ISBN"
            placeholder="ISBN"
            value={formData.ISBN}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <input
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <input
            name="totalCopies"
            type="number"
            placeholder="Total Copies"
            value={formData.totalCopies}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700"
            >
              {editingBook ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
