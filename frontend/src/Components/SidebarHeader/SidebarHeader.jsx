import React from 'react';
import { SiYoutubegaming } from 'react-icons/si'
import { Link } from 'react-router-dom';


export default function SidebarHeader() {
    return (
        <header className="dark:bg-neutral-800 sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[99999] w-full border-b border-gray-200 text-sm py-2.5 lg:ps-65  dark:border-neutral-700">
            <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
                <div className="me-5 lg:me-0 lg:hidden">
                    {/* Logo */}
                    <Link to="/" className="w-full">
                        <div className='flex gap-2 items-center'>
                            <p className="flex-none rounded-xl text-3xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="#" aria-label="Preline">
                                <SiYoutubegaming className="text-4xl text-white" />
                            </p>
                            <p className='text-white text-4xl font-extrabold'>Hub</p>
                        </div>

                    </Link>
                </div>

                <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">

                    <div className="flex flex-row w-full items-end justify-end gap-1">

                        <button id="hs-dropdown-account" type="button" className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:text-white" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                            <img className="shrink-0 size-9.5 rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

