import { useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import TitleExtractor from '../../../../Components/TitleExtractor/TitleExtractor';

export default function RegisterTournament() {
    const [currentStep, setCurrentStep] = useState(1);
    const [tournamentData, setTournamentData] = useState({
        title: '',
        mode: '',
        entry: '',
        prize: '',
        runnerup: '',
        status: '',
        time: '',
        image: null, // Changed to null for file object
        description: '',
        maxPlayerCount: '',
        participants: '',
        prizeMoney: '',
        payment: '',
        startDate: '',
        endDate: '',
        scheduleDate: '',
        schedule: [{ round: '', time: '' }],
        rules: '',
    });
    const [imagePreview, setImagePreview] = useState(null); // For showing preview

    // Add a new schedule item
    const addScheduleItem = () => {
        setTournamentData({
            ...tournamentData,
            schedule: [...tournamentData.schedule, { round: '', time: '' }]
        });
    };

    // Remove a schedule item
    const removeScheduleItem = (index) => {
        const updatedSchedule = [...tournamentData.schedule];
        updatedSchedule.splice(index, 1);
        setTournamentData({ ...tournamentData, schedule: updatedSchedule });
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        console.log(name, value, type, files)

        if (type === 'file') {
            const file = files[0];
            if (file) {
                // Create preview URL
                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);

                setTournamentData(prevState => ({
                    ...prevState,
                    [name]: file
                }));
            }
        } else {
            setTournamentData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleScheduleChange = (e, index) => {
        const { name, value } = e.target;
        console.log(name, value)
        const updatedSchedule = [...tournamentData.schedule];
        updatedSchedule[index][name] = value;
        setTournamentData({ ...tournamentData, schedule: updatedSchedule });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
    
            // Get user from localStorage and extract _id properly
            const userRaw = localStorage.getItem('user');
            const user = userRaw ? JSON.parse(userRaw) : null;
    
            if (user && user._id) {
                tournamentData.organizer = user._id;
            } else {
                console.error("No user found in localStorage or user._id missing");
                return;
            }
    
            // Make sure scheduleDate exists - if not, use tomorrow's date as default
            if (!tournamentData.scheduleDate) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tournamentData.scheduleDate = tomorrow.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                console.log("Added default scheduleDate:", tournamentData.scheduleDate);
            }
    
            // Handle schedule data properly
            const scheduleData = tournamentData.schedule || [];
            // Make sure schedule is in proper format
            const validSchedule = scheduleData.map(item => ({
                round: item.round || '',
                time: item.time || ''
            }));
    
            // Append all fields to formData
            Object.keys(tournamentData).forEach(key => {
                if (key === 'schedule') {
                    formData.append(key, JSON.stringify(validSchedule));
                } else if (key === 'rules') {
                    // Handle rules as a comma-separated string if it's an array
                    const rulesValue = Array.isArray(tournamentData[key]) 
                        ? tournamentData[key].join(',') 
                        : tournamentData[key];
                    formData.append(key, rulesValue);
                } else if (key === 'startDate' || key === 'endDate' || key === 'scheduleDate') {
                    // Make sure we have valid dates
                    if (tournamentData[key] && tournamentData[key] !== '') {
                        try {
                            const date = new Date(tournamentData[key]);
                            if (!isNaN(date.getTime())) {
                                formData.append(key, date.toISOString());
                            }
                        } catch (err) {
                            console.error(`Error parsing date for ${key}:`, err);
                        }
                    } else if (key === 'scheduleDate') {
                        // If scheduleDate is still missing, use tomorrow
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        formData.append(key, tomorrow.toISOString());
                        console.log("Added default scheduleDate in formData");
                    }
                } else if (key === 'image') {
                    // Only append image if it's a File object
                    if (tournamentData[key] instanceof File) {
                        formData.append(key, tournamentData[key]);
                    }
                } else if (key === 'prizeMoney' || key === 'payment') {
                    // Ensure numeric fields are valid numbers
                    if (tournamentData[key] !== null && tournamentData[key] !== '') {
                        const numValue = Number(tournamentData[key]);
                        formData.append(key, isNaN(numValue) ? 0 : numValue);
                    } else {
                        formData.append(key, 0); // Default to 0 if empty
                    }
                } else if (tournamentData[key] !== null && tournamentData[key] !== '') {
                    formData.append(key, tournamentData[key]);
                }
            });
    
            // Log form data for debugging
            console.log("Form data being sent to server:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }
    
            // Send the request
            const response = await axios.post("http://localhost:5000/api/tournaments", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log("Tournament created successfully:", response.data);
            
            // Add success notification or redirect here
    
        } catch (error) {
            console.error("Error creating tournament:", error);
            if (error.response) {
                console.error("Server response data:", error.response.data);
            }
            // Add error notification here
        }
    };


    // Next step handler
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    // Previous step handler
    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="w-full lg:ps-64 h-fit">
            <Sidebar />
            <div className="p-4 sm:p-6 h-fit space-y-4 sm:space-y-6">
                <div className="flex flex-col h-fit">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Create Tournament</h2>
                    </div>

                    {/* Progress Indicator */}


                    {/* Form Content */}
                    <div className="p-6">
                        <div >
                            {/* Step 1: Basic Information */}
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tournament Title*</label>
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                value={tournamentData.title}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter tournament title"
                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Game Mode*</label>
                                            <select
                                                id="mode"
                                                name="mode"
                                                value={tournamentData.mode}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            >
                                                <option value="">Select mode</option>
                                                <option value="Solo">Solo</option>
                                                <option value="Duo">Duo</option>
                                                <option value="Squad">Squad</option>
                                                <option value="Team">Team</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status*</label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={tournamentData.status}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            >
                                                <option value="">Select status</option>
                                                <option value="Upcoming">Upcoming</option>
                                                <option value="Ongoing">Ongoing</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="maxPlayerCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Players*</label>
                                            <input
                                                id="maxPlayerCount"
                                                name="maxPlayerCount"
                                                type="number"
                                                value={tournamentData.maxPlayerCount}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter maximum player count"
                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date*</label>
                                            <input
                                                id="startDate"
                                                name="startDate"
                                                type="date"
                                                value={tournamentData.startDate}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date*</label>
                                            <input
                                                id="endDate"
                                                name="endDate"
                                                type="date"
                                                value={tournamentData.endDate}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time*</label>
                                        <input
                                            id="time"
                                            name="time"
                                            type="time"
                                            value={tournamentData.time}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tournament Image</label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                        />
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-32 object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Optional: Upload an image for the tournament</p>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Prize Information and Schedule */}
                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="entry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Entry Fee*</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                                                </div>
                                                <input
                                                    id="entry"
                                                    name="entry"
                                                    type="text"
                                                    value={tournamentData.entry}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="0.00"
                                                    className="pl-7 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="prize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Place Prize*</label>
                                            <input
                                                id="prize"
                                                name="prize"
                                                type="text"
                                                value={tournamentData.prize}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter prize details"
                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="runnerup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Runner-up Prize</label>
                                            <input
                                                id="runnerup"
                                                name="runnerup"
                                                type="text"
                                                value={tournamentData.runnerup}
                                                onChange={handleChange}
                                                placeholder="Enter runner-up prize details"
                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="prizeMoney" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Prize Pool</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                id="prizeMoney"
                                                name="prizeMoney"
                                                type="text"
                                                value={tournamentData.prizeMoney}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                className="pl-7 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Schedule Section */}
                                    <div className="mt-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tournament Schedule*</label>
                                            <button
                                                type="button"
                                                onClick={addScheduleItem}
                                                className="flex items-center text-sm text-blue-600 hover:text-blue-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                Add Round
                                            </button>
                                        </div>

                                        {tournamentData.schedule.map((item, index) => (
                                            <div key={index} className="mb-3 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="text-sm font-medium">Round {index + 1}</h4>
                                                    {tournamentData.schedule.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeScheduleItem(index)}
                                                            className="text-red-600 hover:text-red-500"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label htmlFor={`round-${index}`} className="block text-xs font-medium text-gray-500 dark:text-gray-400">Round Name</label>
                                                        <input
                                                            id={`round-${index}`}
                                                            name="round"
                                                            type="text"
                                                            value={item.round}
                                                            onChange={(e) => handleScheduleChange(e, index)}
                                                            placeholder="e.g. Quarterfinals"
                                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor={`time-${index}`} className="block text-xs font-medium text-gray-500 dark:text-gray-400">Date & Time</label>
                                                        <input
                                                            id={`time-${index}`}
                                                            name="time"
                                                            type="datetime-local"
                                                            value={item.time}
                                                            onChange={(e) => handleScheduleChange(e, index)}
                                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Rules and Description */}
                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tournament Description*</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="4"
                                            value={tournamentData.description}
                                            onChange={handleChange}
                                            required
                                            placeholder="Provide a detailed description of the tournament..."
                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="rules" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tournament Rules*</label>
                                        <textarea
                                            id="rules"
                                            name="rules"
                                            rows="6"
                                            value={tournamentData.rules}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter tournament rules (one rule per line or comma-separated)"
                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                        />
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Add each rule on a new line or separate them with commas</p>
                                    </div>

                                    <div>
                                        <label htmlFor="participants" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Participants</label>
                                        <input
                                            id="participants"
                                            name="participants"
                                            type="number"
                                            value={tournamentData.participants}
                                            onChange={handleChange}
                                            placeholder="0"
                                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                        />
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Optional: Number of participants already registered</p>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex justify-between">
                                {currentStep > 1 ? (
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-600"
                                    >
                                        Previous
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-500"
                                    >
                                        Create Tournament
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}