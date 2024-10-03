import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// SVG 아이콘 컴포넌트들 (변경 없음)
const IconDashboard = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const IconForms = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const IconChevronDown = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
);

function BasicLayout({children}: {children: React.ReactNode}) {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

    const toggleProductDropdown = () => {
        setIsProductDropdownOpen(!isProductDropdownOpen);
    };

    return (
        <div className={`flex h-screen bg-gray-50 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>
            {/* Desktop sidebar */}
            <aside className="z-20 hidden w-64 overflow-y-auto bg-gradient-to-b from-purple-700 to-purple-900 md:block flex-shrink-0">
                <div className="py-4 text-white">
                    <Link to="/main" className="flex items-center justify-center mb-8 p-2">
                        <span className="text-2xl font-bold bg-white text-purple-700 px-4 py-2 rounded-lg shadow-lg">C-PAK</span>
                    </Link>
                    <ul className="mt-6 space-y-2">
                        <li className="relative px-6 py-3">
                            <button
                                onClick={toggleProductDropdown}
                                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                            >
                                <span className="inline-flex items-center">
                                    <IconDashboard/>
                                    <span className="ml-4">Product</span>
                                </span>
                                <span className={`transition-transform duration-200 ${isProductDropdownOpen ? 'transform rotate-180' : ''}`}>
                                    <IconChevronDown />
                                </span>
                            </button>
                            {isProductDropdownOpen && (
                                <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium rounded-md bg-purple-800 bg-opacity-50">
                                    <li className="px-2 py-1 transition-colors duration-150 hover:bg-purple-600 hover:text-white rounded">
                                        <Link className="w-full block" to="/product/register">Register</Link>
                                    </li>
                                    <li className="px-2 py-1 transition-colors duration-150 hover:bg-purple-600 hover:text-white rounded">
                                        <Link className="w-full block" to="/product/list">List</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className="relative px-6 py-3">
                            <Link
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                                to="/member">
                                <IconForms/>
                                <span className="ml-4">Member</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {isSideMenuOpen && (
                <div
                    className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
                    onClick={() => setIsSideMenuOpen(false)}></div>
            )}
            <aside
                className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white md:hidden ${isSideMenuOpen ? 'block' : 'hidden'}`}>
            </aside>

            <div className="flex flex-col flex-1 w-full">
                <header className="z-10 py-4 bg-white shadow-md">
                    <div className="w-full flex justify-end px-6">
                        <button
                            className="px-6 py-2 text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300">
                            Login
                        </button>
                    </div>
                </header>

                <main className="h-full overflow-y-auto">
                    <div className="container px-6 mx-auto grid m-3">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default BasicLayout;