import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import TitleExtractor from '../../../../Components/TitleExtractor/TitleExtractor';
import axios from 'axios';

const TableData = {
    Head: ["Team Name", "Players", "Actions"],
};

export default function RegisteredTeams() {
    const [teams, setTeams] = useState();
    const [selectedTournament, setSelectedTournament] = useState();
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tournaments');
                console.log(response.data.data);
                setTournaments(response.data.data);

                axios.get(`http://localhost:5000/api/teams`)
                    .then(res => {
                        console.log(res.data.data)
                        setTeams(res.data.data);
                    })
                    .catch(err => {
                        console.error("Error fetching teams:", err);
                    });
            } catch (error) {
                console.error('Error fetching tournaments:', error.message || error);
            } finally {
                setLoading(false);
            }
        };

        fetchTournaments();
    }, []);

    useEffect(() => {
        console.log(selectedTournament)
        if (selectedTournament) {

            axios.get(`http://localhost:5000/api/teams${selectedTournament ? "/" + selectedTournament : ""}`)
                .then(res => {
                    console.log(res.data.data)
                    setTeams(res.data.data);
                })
                .catch(err => {
                    console.error("Error fetching teams:", err);
                });
        } else {
            axios.get(`http://localhost:5000/api/teams`)
                .then(res => {
                    console.log(res.data.data)
                    setTeams(res.data.data);
                })
                .catch(err => {
                    console.error("Error fetching teams:", err);
                });
        }
    }, [selectedTournament]);

    return (
        <div>
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
            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <TitleExtractor />

                                    <div className='py-2'>
                                        <label htmlFor="mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Tournament*</label>
                                        <select
                                            id="mode"
                                            name="mode"
                                            required
                                            onChange={(el) => setSelectedTournament(el.target.value === "clear" ? null : el.target.value)}
                                            className="mt-1 p-2 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                        >
                                            <option value="clear">All Tournament Players</option>
                                            {tournaments && tournaments.map((tournament, i) => (
                                                <option key={i} value={tournament._id}>{tournament.title}</option>
                                            ))}
                                            {/* <option value="Duo">Duo</option>
                                            <option value="Squad">Squad</option>
                                            <option value="Team">Team</option> */}
                                        </select>
                                    </div>

                                    <Table Head={TableData.Head} Body={teams} />

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
        alert(id);
    }

    return (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
            <thead className="bg-gray-50 dark:bg-zinc-800">
                <tr>
                    {Head && Head.map((header, index) => (
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
                    Body.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-zinc-100">
                                {row.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-zinc-300">
                                {Array.isArray(row.players) && row.players.length > 0 ? (
                                    <ul className="list-disc pl-4 space-y-1">
                                        {row.players.map((player, index) => (
                                            <li key={index}>{player.name}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="italic text-gray-400 dark:text-zinc-500">
                                        No players
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <button
                                    onClick={() => handleDelete(row._id)} // make sure to define this handler
                                    className="bg-red-600 text-white py-2 px-4 rounded hover:text-red-800 font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={2}
                            className="px-6 py-4 text-center text-sm text-gray-500 dark:text-zinc-400 italic"
                        >
                            No teams available
                        </td>
                    </tr>
                )}
            </tbody>
        </table >
    )
}