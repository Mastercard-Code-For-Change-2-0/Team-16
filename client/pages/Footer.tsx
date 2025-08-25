import React, { useEffect } from 'react';
import { Home, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* About Section */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                            <Home className="h-6 w-6 text-blue-400" />
                            <span className="text-xl font-bold">StudentNest</span>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Find your perfect student accommodation without broker fees.
                            Direct connections between students and landlords.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* For Students Section */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-4">For Students</h3>
                        <ul className="space-y-2">
                            <li><Link to="/properties" className="text-gray-300 hover:text-white">Find Accommodation</Link></li>
                            <li><Link to="/RoommateFinder" className="text-gray-300 hover:text-white">Roommate Finder</Link></li>
                            <li><Link to="/SafetyTips" className="text-gray-300 hover:text-white">Safety Tips</Link></li>
                            <li><Link to="/FAQ" className="text-gray-300 hover:text-white">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-center md:justify-start items-start space-x-3">
                                <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                                <span className="text-gray-300">support@studentnest.com</span>
                            </li>
                            <li className="flex justify-center md:justify-start items-start space-x-3">
                                <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                                <span className="text-gray-300">+91 9876543210</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} StudentNest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
