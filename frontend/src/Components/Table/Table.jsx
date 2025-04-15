import React from 'react'

export default function Table({ Head, Body }) {
    console.log(Body)
    return (
        <div className="w-full lg:ps-64">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
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
                                                            {/* Array of objects (e.g. schedule) */}
                                                            {Array.isArray(value) && typeof value[0] === "object" ? (
                                                                <ul className="list-disc pl-4 space-y-1">
                                                                    {value.map((item, i) => (
                                                                        <li key={i}>
                                                                            {Object.entries(item)
                                                                                .filter(([k]) => k !== "_id")
                                                                                .map(([k, v]) => `${k}: ${v}`)
                                                                                .join(" | ")}
                                                                        </li>
                                                                    ))}
                                                                </ul>

                                                                // Simple array (e.g. rules)
                                                            ) : Array.isArray(value) ? (
                                                                <ul className="list-disc pl-4 space-y-1">
                                                                    {value.map((item, i) => (
                                                                        <li key={i}>{item}</li>
                                                                    ))}
                                                                </ul>

                                                                // Null fallback
                                                            ) : value === null || value === undefined ? (
                                                                <span className="italic text-gray-400">N/A</span>

                                                                // Dates
                                                            ) : key.toLowerCase().includes("date") || key.toLowerCase().includes("time") ? (
                                                                new Date(value).toLocaleString()

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

