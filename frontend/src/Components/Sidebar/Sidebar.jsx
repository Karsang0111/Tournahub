import React, { useEffect, useState } from 'react'
import { SiYoutubegaming } from "react-icons/si";
import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Users2,
    ShieldCheck,
    Trophy,
    ClipboardList,
    LogOut
} from "lucide-react";
import { GiPodiumWinner } from "react-icons/gi";

import {
    Home,
    Users,
    CalendarCheck,
    Settings,
} from 'lucide-react'

// const role = "organizer";
export default function Sidebar() {
    const [role, setRole] = useState();

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";

        if(user){
            console.log(user.role)
            setRole(user.role);
        }

    }, []);

    return (
        <>

            <div id="hs-application-sidebar" className="hs-overlay z-[999999]  [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-65 h-full hidden fixed inset-y-0 start-0  border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabindex="-1" aria-label="Sidebar">
                <div className="relative flex flex-col h-full max-h-full">
                    <div className="px-6 pt-4 flex items-center w-full">
                        <div className='flex gap-2 items-center'>
                            <p className="flex-none rounded-xl text-3xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="#" aria-label="Preline">
                                <SiYoutubegaming className="text-4xl text-white" />
                            </p>
                            <p className='text-white text-4xl font-extrabold'>Hub</p>
                        </div>


                        <div className="hidden lg:block ms-2">

                        </div>
                    </div>

                    {/* Content */}
                    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                            {role == "organizer" &&
                                <ul className="flex flex-col space-y-1">
                                    <li>
                                        <Link to="/"
                                            className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white"
                                        >
                                            <Home className="shrink-0 size-4" />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/organizer/registered-teams"
                                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-white dark:bg-transparent"
                                        >
                                            <Users className="shrink-0 size-4" />
                                            Registered Teams
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/organizer/organized-tournaments"
                                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-white dark:bg-transparent"
                                        >
                                            <ClipboardList className="shrink-0 size-4" />
                                            Organized Tournaments
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/organizer/register-tournament"
                                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-white dark:bg-transparent"
                                        >
                                            <ClipboardList className="shrink-0 size-4" />
                                            Register Tournament
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/organizer/winners"
                                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-white dark:bg-transparent"
                                        >
                                            <Trophy className="shrink-0 size-4" />
                                            Winners
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/organizer/add-winners"
                                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-white dark:bg-transparent"
                                        >
                                            <GiPodiumWinner className="shrink-0 size-4" />
                                            Add Winners
                                        </Link>
                                    </li>
                                </ul>
                            }

                            {role == "admin" &&
                                <ul className="flex flex-col space-y-1">
                                    <li>
                                        <Link to="/admin/dashboard" className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white">
                                            <LayoutDashboard className="shrink-0 size-4" />
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/registered-teams" className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white">
                                            <Users2 className="shrink-0 size-4" />
                                            Registered Teams
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/organized-tournaments" className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white">
                                            <ClipboardList className="shrink-0 size-4" />
                                            Organized Tournaments
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/winners" className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white">
                                            <Trophy className="shrink-0 size-4" />
                                            Winners
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/match-schedule" className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white">
                                            <CalendarCheck className="shrink-0 size-4" />
                                            Match Schedules
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/logout" className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white">
                                            <LogOut className="shrink-0 size-4" />
                                            Logout
                                        </Link>
                                    </li>
                                </ul>

                            }
                        </nav>
                    </div>
                </div>
            </div>



        </>
    )
}
