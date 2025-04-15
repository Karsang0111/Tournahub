import React from 'react'
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import Table from '../../../../Components/Table/Table';
import TitleExtractor from '../../../../Components/TitleExtractor/TitleExtractor';

const TableData = {
    Head: ["Title","Team Name", "Players", "Year", "Action"],
    Body: [
        {
            "Title":"PCMO 2025",
            "Team Name": "Tamang Warriors",
            "Players": ["Kaji Tamang", "Suresh Lama", "Bikash Ghale", "Rajan Moktan"],
            "Year": "2025"
        },
        {
            "Title":"PCMO 2025",
            "Team Name": "Himalayan Eagles",
            "Players": ["Pratik Shrestha", "Anil Rai", "Sunil Gurung", "Nabin Sherpa"],
            "Year": "2025"
        }
    ]
};

export default function MatchSchedule() {
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
            
            <TitleExtractor />

            <Table data={TableData} />

        </div>
    )
}
