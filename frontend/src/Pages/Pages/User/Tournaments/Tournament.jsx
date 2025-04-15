import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Tournament() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tournaments');
                console.log(response);
                setTournaments(response.data.data);
            } catch (error) {
                console.error('Error fetching tournaments:', error.message || error);
            } finally {
                setLoading(false);
            }
        };

        fetchTournaments();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500 dark:text-gray-400 py-10">Loading tournaments...</div>;
    }

    return (
        <div className="bg-white dark:bg-neutral-800">
            <div className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tournaments.map(tournament => (
                            <div
                                key={tournament._id}
                                className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
                            >
                                <div className="relative">
                                    <img
                                        className="w-full h-40 sm:h-48 object-cover"
                                        src={tournament.image}
                                        alt={tournament.title}
                                    />
                                    <span
                                        className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow ${tournament.status === 'Ongoing'
                                            ? 'bg-green-600'
                                            : tournament.status === 'Upcoming'
                                                ? 'bg-yellow-500'
                                                : 'bg-gray-500'
                                            }`}
                                    >
                                        {tournament.status}
                                    </span>
                                </div>

                                <div className="p-4 space-y-1">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        {tournament.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {tournament.mode} | Entry {tournament.entry} | Prize {tournament.prize}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Starts at: {tournament.time}</p>
                                    <Link to={`/tournament/${tournament._id}`}>
                                        <button className="mt-3 w-full bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 text-white py-2 px-4 rounded-lg font-medium transition-all border border-zinc-700 dark:border-zinc-600">
                                            Register Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
