import React from "react";

export default function Modal({ title, content, isOpen, onClose }) {
    if (!isOpen) return null;

    const renderContent = () => {
        if (Array.isArray(content)) {
            return (
                <ul className="list-disc pl-5 space-y-1">
                    {content.map((item, index) => (
                        <li key={index}>
                            {typeof item === "object" ? (
                                <div className="space-y-1">
                                    {Object.entries(item)
                                        .filter(([k]) => k !== "_id")
                                        .map(([k, v], i) => (
                                            <div key={i}>
                                                <span className="font-medium">{k}:</span>{" "}
                                                {k.toLowerCase().includes("date") || k.toLowerCase().includes("time")
                                                    ? new Date(v).toLocaleString()
                                                    : String(v)}
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                item
                            )}
                        </li>
                    ))}
                </ul>
            );
        }

        if (typeof content === "string") {
            // Image URL
            if (content.startsWith("http") || content.startsWith("uploads\\")) {
                return (
                    <img
                        src={content.replace("uploads\\", "/")} // Adjust if needed for backend path
                        alt="Preview"
                        className="w-full rounded-md"
                    />
                );
            }

            // Description or plain string
            return <p>{content}</p>;
        }

        // Fallback: show JSON or value
        return <pre>{JSON.stringify(content, null, 2)}</pre>;
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 max-w-lg w-full shadow-lg max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">×</button>
                </div>
                <div className="text-sm text-zinc-700 dark:text-zinc-200 space-y-2">{renderContent()}</div>
            </div>
        </div>
    );
}
