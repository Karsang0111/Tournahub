import { useState } from 'react';
import { Upload, Users, X, Trophy } from 'lucide-react';

const TeamRegistrationForm = ({ onClose }) => {
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState(['', '', '', '', '']); // Default for 5 players
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const handlePlayerChange = (index, value) => {
        const newPlayers = [...players];
        newPlayers[index] = value;
        setPlayers(newPlayers);
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const removeLogo = () => {
        setLogo(null);
        setLogoPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log({
            teamName,
            players,
            logo
        });
        // You would typically send this data to your backend
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-md w-full p-6 shadow-2xl border border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Team Registration
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Team Logo Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Team Logo</label>
                        <div className="flex items-center gap-4">
                            {logoPreview ? (
                                <div className="relative">
                                    <img
                                        src={logoPreview}
                                        alt="Team logo preview"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-zinc-300 dark:border-zinc-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeLogo}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                    <Upload className="w-5 h-5 text-zinc-500" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                    />
                                </label>
                            )}
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                {logo ? logo.name : 'PNG/JPG (max 2MB)'}
                            </span>
                        </div>
                    </div>

                    {/* Team Name */}
                    <div className="mb-6">
                        <label htmlFor="teamName" className="block text-sm font-medium mb-2">
                            Team Name *
                        </label>
                        <input
                            type="text"
                            id="teamName"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your team name"
                            required
                        />
                    </div>

                    {/* Player Names */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Team Members *
                        </label>
                        <div className="space-y-3">
                            {players.map((player, index) => (
                                <div key={index} className="relative">
                                    <input
                                        type="text"
                                        value={player}
                                        onChange={(e) => handlePlayerChange(index, e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Player ${index + 1} name`}
                                        required
                                    />
                                    {index === 0 && (
                                        <span className="absolute right-3 top-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                            Captain
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                        <Trophy className="w-4 h-4" />
                        Register Team
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeamRegistrationForm;