import React, { useState } from "react";
import { Home, Library, User, BookOpen, LogOut, Menu, X } from "lucide-react";
import { useLibrary } from "./context/LibraryContext";
import { useNavigate } from "react-router-dom";
import api from "../axios"


const Navbar = ({ currentPage, setCurrentPage }) => {
  const { borrowedBooks, user } = useLibrary();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
    
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
     
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

 
  const NavButton = ({ page, label, icon: Icon }) => {
    const isActive = currentPage === page;
    return (
      <button
        onClick={() => setCurrentPage(page)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative ${isActive
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-100'
          }`}
      >
        <Icon size={20} />
        {label}
        {page === 'profile' && borrowedBooks.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {borrowedBooks.length}
          </span>
        )}
      </button>
    );
  };

  const MobileMenuItem = ({ page, label, icon: Icon }) => {
    const isActive = currentPage === page;
    return (
      <button
        onClick={() => {
          setCurrentPage(page);
          setIsMobileMenuOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-100'
          }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
        {page === 'profile' && borrowedBooks.length > 0 && (
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {borrowedBooks.length}
          </span>
        )}
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              <img
                src="https://res.cloudinary.com/dl9o5oenm/image/upload/v1762849518/freepik__talk__71148_qgzglq.png"
                alt="LibraryHub Logo"
                className="inline-block h-12 w-12 sm:h-12 sm:w-12 md:h-14 md:w-16 lg:h-16 rounded-full lg:w-16 mr-1 align-middle object-contain"
              />
            </span>
          </div>


        
          <div className="hidden md:flex items-center gap-6">
            <NavButton page="home" label="Home" icon={Home} />
            <NavButton page="catalog" label="Catalog" icon={Library} />
            <NavButton page="profile" label="Profile" icon={User} />

           
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-red-600 hover:bg-red-50"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

         
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white shadow-lg border-t border-gray-200 px-4 py-4 space-y-2">
            <MobileMenuItem page="home" label="Home" icon={Home} />
            <MobileMenuItem page="catalog" label="Catalog" icon={Library} />
            <MobileMenuItem page="profile" label="Profile" icon={User} />

           
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




