import React, { useState } from 'react';
import { Home, UserPlus, LogIn, Menu, X, Building, LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.tsx"; // Adjust this path if needed
import { signOut } from "firebase/auth";
import { auth } from "../Data/firebase"; // Adjust path to your Firebase config

interface NavbarProps {
    userType: 'student' | 'landlord';
    setUserType: (type: 'student' | 'landlord') => void;
}

const Navbar: React.FC<NavbarProps> = ({ userType, setUserType }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleUserTypeChange = (type: 'student' | 'landlord') => {
        setUserType(type);
        navigate("/");
        setMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <Home className="h-6 w-6 text-blue-600" />
                        <span className="text-xl font-bold text-blue-600">StudentNest</span>
                    </Link>

                    <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
                        <button
                            onClick={() => handleUserTypeChange('student')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                userType === 'student' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => handleUserTypeChange('landlord')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                userType === 'landlord' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Landlord
                        </button>
                    </div>

                    <div className="hidden md:flex items-center justify-between space-x-2">
                        <Link to="/properties" className="px-4 py-2 text-gray-700 hover:text-blue-600 flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>All Properties</span>
                        </Link>

                        {currentUser ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center space-x-1 transition"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 flex items-center space-x-1">
                                    <LogIn className="h-4 w-4" />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>

                    <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-3">
                            <div className="flex flex-col space-y-2 mb-2">
                                <button
                                    onClick={() => handleUserTypeChange('student')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                        userType === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    Student
                                </button>
                                <button
                                    onClick={() => handleUserTypeChange('landlord')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                        userType === 'landlord' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    Landlord
                                </button>
                            </div>

                            <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600">
                                <Building className="h-4 w-4" />
                                <span>All Properties</span>
                            </Link>

                            {currentUser ? (
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        <span>Login</span>
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                        <span>Sign Up</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
