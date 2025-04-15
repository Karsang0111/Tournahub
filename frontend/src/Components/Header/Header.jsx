import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { SiYoutubegaming } from 'react-icons/si'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear localStorage
        navigate("/auth"); // Redirect to login
    };

    return (
        <div>
            <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-gray-700">
                <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center gap-x-1">
                        <Link to="/" className="w-full">
                            <div className='flex gap-2 items-center'>
                                <p className="flex-none rounded-xl text-3xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="#" aria-label="Preline">
                                    <SiYoutubegaming className="text-4xl text-white" />
                                </p>
                                <p className='text-white text-4xl font-extrabold'>Hub</p>
                            </div>

                        </Link>

                        <button type="button" className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-sm rounded-lg border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" id="hs-header-base-collapse" aria-expanded="false" aria-controls="hs-header-base" aria-label="Toggle navigation" data-hs-collapse="#hs-header-base">
                            <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <line x1="3" x2="21" y1="12" y2="12" />
                                <line x1="3" x2="21" y1="18" y2="18" />
                            </svg>
                            <svg className="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>

                    <div id="hs-header-base" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-header-base-collapse">
                        <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                                <div className="grow">
                                    <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                                        <NavLink
                                            to="/"
                                            className={({ isActive }) =>
                                                `p-2 flex items-center text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
                                            }
                                            aria-current="page"
                                        >
                                            <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            </svg>
                                            Landing
                                        </NavLink>

                                        <NavLink
                                            to="/tournament"
                                            className={({ isActive }) =>
                                                `p-2 flex items-center text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
                                            }
                                        >
                                            <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            Tournaments
                                        </NavLink>

                                        {(() => {
                                            const user = JSON.parse(localStorage.getItem("user"));
                                            const role = user?.role;

                                            if (role === "admin") {
                                                return (
                                                    <NavLink
                                                        to="/admin/dashboard"
                                                        className={({ isActive }) =>
                                                            `p-2 flex items-center text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
                                                        }
                                                    >
                                                        <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                            <circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                        Dashboard
                                                    </NavLink>
                                                );
                                            } else if (role === "organizer") {
                                                return (
                                                    <NavLink
                                                        to="/organizer/dashboard"
                                                        className={({ isActive }) =>
                                                            `p-2 flex items-center text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`
                                                        }
                                                    >
                                                        <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                            <circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                        Dashboard
                                                    </NavLink>
                                                );
                                            }

                                            return null;
                                        })()}

                                    </div>
                                </div>

                                <div className="my-2 md:my-0 md:mx-2">
                                    <div className="w-full h-px md:w-px md:h-4 bg-gray-100 dark:bg-gray-700"></div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-1.5">
                                    {user ? (
                                        <button
                                            onClick={handleLogout}
                                            className="py-[7px] cursor-pointer px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-red-200 bg-white text-red-600 dark:bg-neutral-800 dark:text-white dark:border-gray-700 shadow-2xs hover:bg-red-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-red-100 dark:focus:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    ) : (
                                        <Link to="/auth">
                                            <div className="py-[7px] cursor-pointer px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 dark:bg-neutral-800 dark:text-white dark:border-gray-700 shadow-2xs hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700">
                                                Sign in
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        </div>
    )
}
