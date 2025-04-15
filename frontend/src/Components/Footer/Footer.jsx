import React from 'react'

export default function Footer() {
    return (
        <div className='dark:bg-neutral-800 bg-white'>
            <footer className="w-full  max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                        <div>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                © 2025 TournamentHub.
                            </p>
                        </div>
                        <ul className="flex flex-wrap items-center">
                            <li className="inline-block relative pe-4 text-xs last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-1.5 before:-translate-y-1/2 before:size-[3px] before:rounded-full before:bg-gray-400 dark:before:bg-gray-500">
                                <a className="text-xs text-gray-500 dark:text-gray-400 underline hover:text-gray-800 dark:hover:text-white hover:decoration-2 focus:outline-hidden focus:decoration-2" href="#">
                                    Facebook (Facebook)
                                </a>
                            </li>
                            <li className="inline-block relative pe-4 text-xs last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-1.5 before:-translate-y-1/2 before:size-[3px] before:rounded-full before:bg-gray-400 dark:before:bg-gray-500">
                                <a className="text-xs text-gray-500 dark:text-gray-400 underline hover:text-gray-800 dark:hover:text-white hover:decoration-2 focus:outline-hidden focus:decoration-2" href="#">
                                    Twitch
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>

        </div>
    )
}
