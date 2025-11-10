import React from "react";

export default function BookStats({ books }) {
  const totalBooks = books.length;
  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const available = books.reduce((sum, b) => sum + b.availableCopies, 0);
  const borrowed = totalCopies - available;

  const stats = [
    { label: "Total Books", value: totalBooks, color: "text-indigo-600" },
    { label: "Total Copies", value: totalCopies, color: "text-green-600" },
    { label: "Available", value: available, color: "text-blue-600" },
    { label: "Borrowed", value: borrowed, color: "text-orange-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-gray-600 text-sm">{s.label}</div>
          <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}
