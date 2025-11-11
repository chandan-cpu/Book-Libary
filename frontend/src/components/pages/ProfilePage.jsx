import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import { BookOpen, Calendar, Edit2, Mail, MapPin, Phone, User } from "lucide-react";

export const ProfilePage = () => {
  const { user, updateUser, borrowedBooks } = useLibrary();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
         
          <div className="lg:col-span-2">
            <div className="rounded-xl shadow-lg p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Profile Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <ProfileEditForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  onCancel={() => {
                    setIsEditing(false);
                    setFormData(user);
                  }}
                />
              ) : (
                <ProfileDisplay user={user} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <ProfileStatsCard user={user} borrowedBooks={borrowedBooks} />
            <ProfileBorrowedBooksList borrowedBooks={borrowedBooks} />
          </div>

        </div>
      </div>
    </div>
  );
};

export const ProfileDisplay = ({ user }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-100">
        <User size={40} className="text-blue-600" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">
          {user.name}
        </h3>
        <p className="text-sm text-gray-600">
          Member since {user.memberSince}
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <ProfileDetailItem icon={Mail} label="Email" value={user.email} />
      <ProfileDetailItem icon={Phone} label="Phone" value={user.phone} />
      <ProfileDetailItem icon={MapPin} label="Address" value={user.address} isFullWidth={true} />
    </div>
  </div>
);


export const ProfileDetailItem = ({ icon: Icon, label, value, isFullWidth = false }) => (
  <div className={`flex items-start gap-3 p-3 rounded-lg bg-gray-50 ${isFullWidth ? 'md:col-span-2' : ''}`}>
    <Icon className="text-blue-600" size={20} />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">
        {value}
      </p>
    </div>
  </div>
);


export const ProfileEditForm = ({ formData, handleChange, handleSubmit, onCancel }) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <FormInput
      label="Full Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
    </div>
    <FormTextarea
      label="Address"
      name="address"
      value={formData.address}
      onChange={handleChange}
    />
    <div className="flex gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2"
      >
        Save Changes
      </button>
    </div>
  </form>
);

// Input Component
export const FormInput = ({ label, name, type = "text", value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
    />
  </div>
);

// Textarea Component
export const FormTextarea = ({ label, name, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={3}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
    />
  </div>
);


export const ProfileStatsCard = ({ user, borrowedBooks }) =>{
  console.log("borrowedBooks length:", borrowedBooks.length);
  
  return(
  <div className="rounded-xl shadow-lg p-6 bg-white">
    <h3 className="text-lg font-bold mb-4 text-gray-900">
      Library Stats
    </h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
        <BookOpen size={24} className="text-blue-600" />
        <div className="text-right">
          <span className="text-sm text-gray-700">
            Books Borrowed
          </span>
          <p className="text-2xl font-bold text-blue-600">{borrowedBooks.length}</p>
        </div>
      </div>
    </div>
  </div>
);
}


export const ProfileBorrowedBooksList = ({ borrowedBooks }) => (
  <div className="rounded-xl shadow-lg p-6 bg-white">
    <h3 className="text-lg font-bold mb-4 text-gray-900">
      Currently Borrowed
    </h3>
    {borrowedBooks.length === 0 ? (
      <p className="text-sm text-gray-600">No books borrowed yet</p>
    ) : (
      <div className="space-y-3">
        {borrowedBooks.map((book) => (
          <div key={book._id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <BookOpen size={20} className="text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <Calendar size={12} />
                {book.borrowDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ProfilePage;
