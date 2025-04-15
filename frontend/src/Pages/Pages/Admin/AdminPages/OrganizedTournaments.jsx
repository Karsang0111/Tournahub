import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../Components/Sidebar/Sidebar';
// import Table from '../../../../Components/Table/Table';
import TitleExtractor from '../../../../Components/TitleExtractor/TitleExtractor';
import axios from 'axios';


const TableData = {
    Head: ["title", "mode", "entry", "prize", "runnerup", "status", "rules", "scheduleDate", "startDate", "endDate", "prizeMoney", "payment", "schedule", "time", "image", "description", "maxPlayerCount", "participants"],
};




export default function OrganizedTournaments() {
    const [tournament, setTournament] = useState(null);
    const [modalData, setModalData] = useState({ title: "", content: null });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (title, content) => {
        setModalData({ title, content });
        setIsModalOpen(true);
    };


    useEffect(() => {

        async function fetch() {
            const fetchData = await axios.get("http://localhost:5000/api/tournaments");
            console.log(fetchData)

            if (fetchData.data.success === true) {
                setTournament(fetchData.data.data);
            }
        }
        fetch();
    }, []);

    if (tournament) {
        console.log(tournament)
    }

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

                                    <Table Head={TableData.Head} Body={tournament} />
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
    console.log(Body)
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
                {Body && Body.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Head.map((key, colIndex) => {
                            const value = row[key];

                            return (
                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-zinc-100"
                                >
                                    {/* Array of objects */}
                                    {Array.isArray(value) && typeof value[0] === "object" ? (
                                        <ul className="list-disc pl-4 space-y-1">
                                            {value.map((item, i) => (
                                                <li key={i}>
                                                    {Object.entries(item)
                                                        .filter(([k]) => k !== "_id")
                                                        .map(([k, v]) =>
                                                            k.toLowerCase().includes("time") || k.toLowerCase().includes("date")
                                                                ? `${k}: ${new Date(v).toLocaleString()}`
                                                                : `${k}: ${v}`
                                                        )
                                                        .join(" | ")}
                                                </li>
                                            ))}
                                        </ul>

                                        // Array of primitives
                                    ) : typeof value === "object" && value !== null ? (
                                        <div className="space-y-1">
                                            {Object.entries(value).map(([k, v], i) => (
                                                <div key={i}>{v}</div>
                                            ))}
                                        </div>

                                        // Null or undefined
                                    ) : Array.isArray(value) ? (
                                        <ul className="list-disc pl-4 space-y-1">
                                            {value.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>

                                        // Object (e.g., organizer)
                                    ) : value === null || value === undefined ? (
                                        <span className="italic text-gray-400">N/A</span>

                                        // Date/time string
                                    ) : key.toLowerCase().includes("date") || key.toLowerCase().includes("time") ? (
                                        new Date(value).toString() !== "Invalid Date"
                                            ? new Date(value).toLocaleString()
                                            : value

                                        // Default
                                    ) : (
                                        value
                                    )}
                                </td>
                            );
                        })}

                        {/* Optional Action column */}
                        {Head.includes("Action") && (
                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900">
                                    View
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>


        </table>
    );
}
