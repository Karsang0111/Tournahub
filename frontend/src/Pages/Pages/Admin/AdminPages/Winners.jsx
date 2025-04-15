import React, { useState, useEffect } from 'react'
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import TitleExtractor from '../../../../Components/TitleExtractor/TitleExtractor';
import axios from 'axios';

const TableData = {
    Head: ["Title", "Team Name", "Players", "Position", "Year", "Action"],
};

export default function Winners() {
    const [tournaments, setTournament] = useState(null);
    const [selectedTournament, setSelectedTournament] = useState();
    const [winners, setWinners] = useState();

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";

        if (user.role == "admin") {


            async function fetch() {
                const fetchData = await axios.get(`http://localhost:5000/api/tournaments/tournament`);

                if (fetchData.data.status == "success") {
                    setTournament(fetchData.data.data);
                    console.log(fetchData.data.data)
                }
            }
            fetch();
        }

    }, []);

    useEffect(() => {
        if (!selectedTournament) return;

        async function fetch() {
            try {
                const fetchData = await axios.get(`http://localhost:5000/api/winners/tournament-winner/${selectedTournament}`);

                if (fetchData.data.status === "success") {
                    setWinners(fetchData.data.data);
                    console.log(fetchData.data);
                }
            } catch (err) {
                setWinners([]);
            }
        }

        fetch();
    }, [selectedTournament]);




    return (
        <div className=''>
            <div className="-mt-px">
                <div className="sticky top-0 inset-x-0 z-20 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 lg:hidden">
                    <div className="flex items-center py-2">
                        <button type="button" className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
                            <span className="sr-only">Toggle Navigation</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m8 9 3 3-3 3" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <Sidebar />
            <div className="w-full lg:ps-64 h-full ">
                <div className="p-4 sm:p-6 space-y-4 h-full  sm:space-y-6">
                    <div className="flex flex-col h-full ">
                        <div className="-m-1.5 overflow-x-auto h-full ">
                            <div className="p-1.5 min-w-full h-full  inline-block align-middle">
                                <div className="overflow-hidden h-full w-full">
                                    <TitleExtractor />


                                    <div className='py-2 w-1/4'>
                                        <label htmlFor="mode" className="block w-full text-sm font-medium text-gray-700 dark:text-gray-300">Select Tournament*</label>
                                        <select
                                            id="mode"
                                            name="mode"
                                            required
                                            onChange={(el) => setSelectedTournament(el.target.value)}
                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                        >
                                            <option value="">Select Tournament</option>
                                            {tournaments && tournaments.map((tournament, i) => (
                                                <option key={i} value={tournament._id}>{tournament.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Table Head={TableData.Head} Body={winners} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


function Table({ Head, Body }) {
    const handleDelete = (id) => {
        alert(`Delete ID: ${id}`);
    };

    return (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
            <thead className="bg-gray-50 dark:bg-zinc-800">
                <tr>
                    {Head.map((header, index) => (
                        <th
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-300 uppercase tracking-wider"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-700">
                {Body && Body.length > 0 ? (
                    Body.map((row, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-zinc-300">
                                {row.tournamentTitle}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-zinc-100">
                                {row.team?.name || "N/A"}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-zinc-300">
                                {Array.isArray(row.team?.players) && row.team.players.length > 0 ? (
                                    <ul className="list-disc pl-4 space-y-1">
                                        {row.team.players.map((player) => (
                                            <li key={player._id}>{player.name}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="italic text-gray-400 dark:text-zinc-500">
                                        No players
                                    </span>
                                )}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-zinc-300">
                                {row.position}
                            </td>



                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-zinc-300">
                                {new Date(row.awardedAt).toLocaleString()}
                            </td>

                            <td className="px-6 py-4 text-sm">
                                <button
                                    onClick={() => handleDelete(row.team?.id)}
                                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={6}
                            className="px-6 py-4 text-center text-sm text-gray-500 dark:text-zinc-400 italic"
                        >
                            No Winners Available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
