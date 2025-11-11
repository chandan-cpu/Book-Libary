
import React from 'react';
import { BookOpen } from 'lucide-react';

const EmptyState = ({ message }) => {
  return (
    <div className="text-center py-12 text-gray-600">
      <BookOpen size={64} className="mx-auto mb-4 opacity-50" />
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default EmptyState;