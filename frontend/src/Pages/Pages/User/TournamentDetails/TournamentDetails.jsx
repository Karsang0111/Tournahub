import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, UploadCloud, Users, Trophy, Calendar, Info, X } from 'lucide-react';
import axios from "axios";

export default function TournamentDetails() {
    const { slug } = useParams();

    const [activeTab, setActiveTab] = useState('overview');
    const [showForm, setShowForm] = useState("register-close");
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tournaments/${slug}`);

                setTournament(response.data.data);
                setLoading(false);
            } catch (err) {
                console.log(err)
                setError(err.response?.data?.message || 'Failed to fetch tournament');
                setLoading(false);
            }
        };

        fetchTournament();
    }, [slug]);



    return (
        <div className="bg-white dark:bg-neutral-800 text-black dark:text-white min-h-screen pb-12">
            {/* Main content */}
            {tournament && <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left column */}
                    <div className="md:col-span-2">
                        {/* Hero image */}
                        <div className="relative overflow-hidden rounded-xl border border-zinc-800 shadow-lg">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 to-transparent z-10"></div>
                            <img src={tournament.image} className="w-full h-96 object-cover" alt={tournament.title} />
                            <div className="absolute top-4 left-4 z-20">
                                <div className="inline-flex items-center bg-zinc-900 dark:bg-zinc-700 rounded-full px-3 py-1 text-sm font-semibold border border-zinc-700">
                                    {tournament.status === 'Ongoing' ? (
                                        <>
                                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                            Live Now
                                        </>
                                    ) : tournament.status}
                                </div>
                            </div>
                        </div>

                        {/* Tournament title and basic info */}
                        <div className="mt-6">
                            <h1 className="text-3xl font-bold">{tournament.title}</h1>
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-zinc-900 dark:bg-zinc-700 rounded-lg p-4 border border-zinc-800">
                                    <div className="flex items-center">
                                        <Users size={20} className="text-zinc-400 dark:text-zinc-300 mr-2" />
                                        <span className="text-sm text-zinc-400 dark:text-zinc-300">Mode</span>
                                    </div>
                                    <div className="mt-1 font-medium">{tournament.mode}</div>
                                </div>
                                <div className="bg-zinc-900 dark:bg-zinc-700 rounded-lg p-4 border border-zinc-800">
                                    <div className="flex items-center">
                                        <Trophy size={20} className="text-zinc-400 dark:text-zinc-300 mr-2" />
                                        <span className="text-sm text-zinc-400 dark:text-zinc-300">Prize Pool</span>
                                    </div>
                                    <div className="mt-1 font-medium">{tournament.prize}</div>
                                </div>
                                <div className="bg-zinc-900 dark:bg-zinc-700 rounded-lg p-4 border border-zinc-800">
                                    <div className="flex items-center">
                                        <Clock size={20} className="text-zinc-400 dark:text-zinc-300 mr-2" />
                                        <span className="text-sm text-zinc-400 dark:text-zinc-300">Time</span>
                                    </div>
                                    <div className="mt-1 font-medium">{tournament.time}</div>
                                </div>
                                <div className="bg-zinc-900 dark:bg-zinc-700 rounded-lg p-4 border border-zinc-800">
                                    <div className="flex items-center">
                                        <Info size={20} className="text-zinc-400 dark:text-zinc-300 mr-2" />
                                        <span className="text-sm text-zinc-400 dark:text-zinc-300">Entry Fee</span>
                                    </div>
                                    <div className="mt-1 font-medium">{tournament.entry}</div>
                                </div>
                            </div>
                        </div>

                        {/* Tab navigation */}
                        <div className="mt-8 border-b border-zinc-800 dark:border-zinc-700">
                            <nav className="flex space-x-6">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`py-3 font-medium relative ${activeTab === 'overview' ? 'text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
                                >
                                    Overview
                                    {activeTab === 'overview' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white dark:bg-neutral-800"></span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('rules')}
                                    className={`py-3 font-medium relative ${activeTab === 'rules' ? 'text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
                                >
                                    Rules
                                    {activeTab === 'rules' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white dark:bg-neutral-800"></span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('schedule')}
                                    className={`py-3 font-medium relative ${activeTab === 'schedule' ? 'text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-white'}`}
                                >
                                    Schedule
                                    {activeTab === 'schedule' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white dark:bg-neutral-800"></span>
                                    )}
                                </button>
                            </nav>
                        </div>

                        {/* Tab content */}
                        <div className="mt-6">
                            {activeTab === 'overview' && (
                                <div>
                                    <p className="text-zinc-400 mb-6">{tournament.description}</p>
                                    <div className="grid grid-cols-1 gap-2">

                                        <div className="bg-zinc-900 w-full dark:bg-zinc-700 rounded-lg p-6 border border-zinc-800">
                                            <h3 className="font-bold text-lg mb-4 flex items-center">
                                                <Calendar size={20} className="mr-2" />
                                                Tournament Format
                                            </h3>
                                            <p className="text-zinc-400 dark:text-zinc-300">Single elimination knockout tournament with 4 rounds. Top performers advance to the next round.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'rules' && (
                                <div className="bg-zinc-900 dark:bg-zinc-700 rounded-lg p-6 border border-zinc-800">
                                    <h3 className="font-bold text-lg mb-4">Tournament Rules</h3>
                                    <ul className="space-y-3">
                                        {tournament.rules.map((rule, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black dark:bg-zinc-700 text-white text-xs mr-3 mt-0.5 border border-zinc-700">
                                                    {index + 1}
                                                </span>
                                                <span className="text-zinc-400 dark:text-zinc-300">{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'schedule' && (
                                <div className="bg-zinc-900 dark:bg-zinc-700 rounded-lg p-6 border border-zinc-800">
                                    <h3 className="font-bold text-lg mb-4">Tournament Schedule</h3>
                                    <div className="space-y-4">
                                        {tournament.schedule.map((item, index) => (
                                            <div key={index} className="flex items-center border-l-2 border-zinc-700 dark:border-zinc-500 pl-4">
                                                <div className="w-6 h-6 rounded-full bg-zinc-700 dark:bg-zinc-700 flex items-center justify-center absolute -ml-7 border border-zinc-700 dark:border-zinc-500">
                                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.round}</p>
                                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="md:col-span-1">
                        <div>
                            <div className="bg-zinc-900 dark:bg-zinc-700 rounded-xl p-6 border border-zinc-800">
                                <h3 className="font-bold text-lg mb-4">Quick Join</h3>
                                <p className="text-zinc-400 dark:text-zinc-300 mb-6">Secure your spot in this exciting tournament before it fills up!</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-zinc-400 dark:text-zinc-300">Entry Fee:</span>
                                    <span className="font-bold">{tournament.entry}</span>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-zinc-400 dark:text-zinc-300">Status:</span>
                                    <span className="text-green-500 font-medium flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                        Registrations Open
                                    </span>
                                </div>
                                <button onClick={() => setShowForm("register-open")} className="w-full bg-zinc-700 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 text-white py-3 px-4 rounded-lg font-medium transition-all border border-zinc-700 dark:border-zinc-600">
                                    Register Now
                                </button>
                                <button onClick={() => setShowForm("table-open")} className="w-full mt-3 border border-zinc-700 dark:border-zinc-600 text-zinc-400 dark:text-zinc-300 hover:bg-zinc-700 dark:hover:bg-zinc-700 py-3 px-4 rounded-lg font-medium transition-all">
                                    View Teams
                                </button>
                                {tournament.status === 'Ongoing' && <button className="w-full mt-3 border border-zinc-700 dark:border-zinc-600 text-zinc-400 dark:text-zinc-300 hover:bg-zinc-700 dark:hover:bg-zinc-700 py-3 px-4 rounded-lg font-medium transition-all">
                                    Watch
                                </button>}
                            </div>

                            <div className="mt-6 bg-zinc-900 dark:bg-zinc-700 rounded-xl p-6 border border-zinc-800">
                                <div className="flex items-center mb-4">
                                    <Trophy size={24} className="text-zinc-400 dark:text-zinc-300 mr-2" />
                                    <h3 className="font-bold text-lg">Prize Details</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-zinc-700 dark:bg-zinc-700 flex items-center justify-center text-white font-bold mr-3 border border-zinc-700 dark:border-zinc-500">1</div>
                                            <span>Winner</span>
                                        </div>
                                        <span className="font-bold">{tournament.prize}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-zinc-700 dark:bg-zinc-700 flex items-center justify-center text-white font-bold mr-3 border border-zinc-700 dark:border-zinc-500">2</div>
                                            <span>Runner-up</span>
                                        </div>
                                        <span className="font-bold">{tournament.runnerup}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {showForm == "register-open" && <RegisterForm maxPlayerCount={tournament.maxPlayerCount} onClose={() => setShowForm("register-close")} />}
            {showForm == "table-open" && <ViewTeams onClose={() => setShowForm("table-close")} />}
        </div>
    );
}


function RegisterForm({ maxPlayerCount, onClose }) {
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState(Array(parseInt(maxPlayerCount)).fill(''));
    const [teamLogo, setTeamLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const { slug: tournamentId } = useParams();

    // Handle team name change
    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    // Handle player name change
    const handlePlayerChange = (index, value) => {
        const newPlayers = [...players];
        newPlayers[index] = value;
        setPlayers(newPlayers);
    };

    // Handle logo file selection
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // File validation
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            setError('Logo file size must be less than 2MB');
            return;
        }

        setTeamLogo(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
            setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!teamName.trim()) {
            setError('Team name is required');
            return;
        }

        // Filter out empty player names
        const filledPlayers = players.filter(player => player.trim());
        if (filledPlayers.length === 0) {
            setError('At least one player is required');
            return;
        }

        try {
            setIsLoading(true);

            // Handle file upload if there's a logo
            let logoUrl = null;
            if (teamLogo) {
                // In a real app, you would upload the file to your server or a service like S3
                // For this example, we'll just convert to base64 to simulate uploading
                const reader = new FileReader();
                logoUrl = await new Promise((resolve) => {
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(teamLogo);
                });
            }

            // Format players array to match the schema structure
            const playersArray = filledPlayers.map(name => ({ name }));

            // Send data to backend
            const response = await axios.post('http://localhost:5000/api/teams/', {
                name: teamName,
                logo: logoUrl,
                players: playersArray,
                tournament: tournamentId
            });

            // Handle successful registration
            console.log('Team registered successfully:', response.data);
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to register team');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-xl w-full p-6 shadow-2xl border border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Team Registration
                    </h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='overflow-auto'>
                    {/* Team Logo Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Team Logo</label>
                        <div className="flex items-center gap-4">
                            <label className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-dashed ${logoPreview ? 'border-blue-500' : 'border-zinc-300 dark:border-zinc-700'} cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors overflow-hidden`}>
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Team logo preview" className="w-full h-full object-cover" />
                                ) : (
                                    <UploadCloud className="w-5 h-5 text-zinc-500" />
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleLogoChange}
                                />
                            </label>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                PNG/JPG (max 2MB)
                            </span>
                        </div>
                    </div>

                    {/* Team Name */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Team Name *</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your team name"
                            value={teamName}
                            onChange={handleTeamNameChange}
                            required
                        />
                    </div>

                    {/* Player Names */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Team Members *
                        </label>
                        <div className="space-y-3 max-h-60 overflow-auto">
                            {Array.from({ length: parseInt(maxPlayerCount) }).map((_, i) => (
                                <div key={i} className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Player ${i + 1} name`}
                                        value={players[i]}
                                        onChange={(e) => handlePlayerChange(i, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Registering...</span>
                            </>
                        ) : (
                            <>
                                <Trophy className="w-4 h-4" />
                                Register Team
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

function ViewTeams({ onClose }) {
    const [teams, setTeams] = useState([]);
    const { slug: tournamentId } = useParams();

    useEffect(async () => {
        await axios.get(`http://localhost:5000/api/teams/${tournamentId}`)
            .then(res => {
                setTeams(res.data.data);
            })
            .catch(err => {
                console.error("Error fetching teams:", err);
            });
    }, []);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-xl w-full p-6 shadow-2xl border border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Registered Teams
                    </h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Team Name</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Players</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        {teams.length > 0 ? (
                                            teams.map((team, index) => (
                                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                        {team.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                        {Array.isArray(team.players) && team.players.length > 0 ? (
                                                            <ul className="list-disc pl-4 space-y-1">
                                                                {team.players.map((player) => (
                                                                    <li key={player._id}>{player.name}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <span className="italic text-gray-400">No players</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center py-4 text-gray-500 dark:text-gray-400 italic">
                                                    No teams to show
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}