import React, { FC, useState, useContext } from 'react'
import { BsBag, BsSearch, BsPerson, BsHeart, BsList } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';
import NavLinks from './NavLinks';
import { CartContext, WishlistContext } from '../../Context/Context';

type P = {}
const Nav: FC<P> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();
    const { CartTotal } = useContext(CartContext);
    const { wishlistCount } = useContext(WishlistContext);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 leading-tight">PrintCraft</span>
                            <span className="text-xs text-gray-500 font-medium">Premium Printing Solutions</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <NavLinks />
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">

                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className="relative p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                        >
                            <BsHeart size={20} />
                            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                {wishlistCount || 0}
                            </span>
                        </Link>

                        {/* Cart */}
                        <Link
                            to="/component/Cart/Cart"
                            className="relative p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                        >
                            <BsBag size={20} />
                            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                {CartTotal || 0}
                            </span>

                        </Link>

                        {/* Account */}
                        <Link
                            to="/component/validation/SignIn"
                            className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                        >
                            <BsPerson size={20} />
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                        >
                            <BsList size={24} />
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {isSearchOpen && (
                    <div className="py-4 border-t border-gray-200">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500">
                                <BsSearch size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:text-red-500'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                HOME
                            </Link>
                            <Link
                                to="/AllProducts"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/AllProducts' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:text-red-500'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ALL PRODUCTS
                            </Link>
                            <Link
                                to="/About"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/About' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:text-red-500'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ABOUT
                            </Link>
                            <Link
                                to="/Contact"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === '/Contact' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:text-red-500'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                CONTACT
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
export default Nav;