'use client'

import React, { useState } from 'react'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Table from '../../../../Components/Table/Table'
import TitleExtractor from '../../../../Components/TitleExtractor/TitleExtractor'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

const TableData = {
    Head: ["Match", "Teams", "Date", "Time", "Action"],
    Body: [
        {
            match: "Qualifier Round 1",
            teams: ["Tamang Warriors", "Himalayan Eagles"],
            date: "2025-04-20",
            time: "14:00"
        },
        {
            match: "Qualifier Round 2",
            teams: ["Everest Titans", "Pokhara Kings"],
            date: "2025-04-22",
            time: "16:30"
        },
        {
            match: "Semi Final",
            teams: ["Himalayan Eagles", "Everest Titans"],
            date: "2025-04-25",
            time: "18:00"
        }
    ]
}

export default function UpcommingMatches() {
    return (
        <div>
            {/* Mobile Top Bar */}
            <div className="-mt-px">
                <div className="sticky top-0 inset-x-0 z-20 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 lg:hidden">
                    <div className="flex items-center py-2">
                        <button
                            type="button"
                            className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="hs-application-sidebar"
                            aria-label="Toggle navigation"
                            data-hs-overlay="#hs-application-sidebar"
                        >
                            <span className="sr-only">Toggle Navigation</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M15 3v18" />
                                <path d="m8 9 3 3-3 3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <Sidebar />
            <TitleExtractor />

            <FramerMotionModal />

            <Table data={TableData} />
        </div>
    )
}

function FramerMotionModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [tournamentData, setTournamentData] = useState({
        title: '',
        mode: '',
        entry: '',
        prize: '',
        runnerup: '',
        status: '',
        time: '',
        image: '',
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
        const { name, value } = e.target;
        setTournamentData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleScheduleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSchedule = [...tournamentData.schedule];
        updatedSchedule[index][name] = value;
        setTournamentData({ ...tournamentData, schedule: updatedSchedule });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/tournaments", tournamentData);
            console.log("Tournament created:", response.data);
            setIsOpen(false); // Close the modal after successful submission
            // Reset form state
            setCurrentStep(1);
            // Add success notification here
        } catch (error) {
            console.error("Error creating tournament:", error);
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

    // Close modal and reset state
    const handleCloseModal = () => {
        setIsOpen(false);
        setCurrentStep(1);
    };

    return (
        <div className="w-full lg:ps-64 h-fit">
            <div className="p-4 sm:p-6 h-fit space-y-4 sm:space-y-6">
                <div className="flex flex-col h-fit">
                    {/* Trigger Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Tournament
                        </button>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={handleCloseModal}
                                />

                                {/* Modal Panel */}
                                <motion.div
                                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="w-full max-w-3xl rounded-xl bg-white dark:bg-neutral-800 shadow-xl">
                                        {/* Modal Header */}
                                        <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Create Tournament</h2>
                                            <button
                                                onClick={handleCloseModal}
                                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Progress Indicator */}
                                        <div className="px-6 pt-4">
                                            <div className="flex justify-between mb-2">
                                                <span className={`text-sm font-medium ${currentStep === 1 ? 'text-blue-600' : 'text-gray-500'}`}>Basic Info</span>
                                                <span className={`text-sm font-medium ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>Prize & Schedule</span>
                                                <span className={`text-sm font-medium ${currentStep === 3 ? 'text-blue-600' : 'text-gray-500'}`}>Rules & Details</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
                                            </div>
                                        </div>

                                        {/* Form Content */}
                                        <div className="p-6">
                                            <form onSubmit={handleSubmit}>
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
                                                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tournament Image URL</label>
                                                            <input
                                                                id="image"
                                                                name="image"
                                                                type="url"
                                                                value={tournamentData.image}
                                                                onChange={handleChange}
                                                                placeholder="Enter image URL"
                                                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                                            />
                                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Optional: Provide a URL to an image for the tournament</p>
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
                                                            <div>
                                                                <label htmlFor="payment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method*</label>
                                                                <button className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-md hover:shadow-lg">
                                                                    Khalti
                                                                </button>

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
                                                            className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-500"
                                                        >
                                                            Create Tournament
                                                        </button>
                                                    )}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

