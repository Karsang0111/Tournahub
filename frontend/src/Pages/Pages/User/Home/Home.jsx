import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://khalti.com/static/khalti-checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleKhaltiPayment = () => {
        console.log("PAYMENT INITIATED")
        const khaltiConfig = {
            publicKey: 'test_public_key_88cbd8f5f3b24c74a4bc49946998c66a', // ✅ Test public key
            productIdentity: 'startup_plan',
            productName: 'Startup Plan',
            productUrl: window.location.href,
            eventHandler: {
                onSuccess(payload) {
                    console.log("Payment success", payload);
                    fetch('http://localhost:5000/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            token: payload.token,
                            amount: payload.amount,
                        }),
                    })
                        .then(res => res.json())
                        .then(data => console.log('Verification result:', data))
                        .catch(err => console.error('Verification error:', err));
                },
                onError(error) {
                    console.error("Payment error", error);
                },
                onClose() {
                    console.log("Payment widget closed");
                },
            },
        };
    
        const checkout = new window.KhaltiCheckout(khaltiConfig);
        checkout.show({ amount: 3900 }); // Rs. 39
    };
    

    return (
        <div className='dark:bg-neutral-800'>
            <div className='w-full flex flex-col items-center '>
                <div className="py-4 max-w-[85rem] px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                        <div>
                            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
                                Dominate the Arena with <span className="text-blue-600">Tournaments Hub</span>
                            </h1>
                            <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
                                The ultimate hub for competitive gamers. Join thrilling tournaments, win real cash, and rise through the ranks — one battle at a time.
                            </p>

                            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                                <Link to="/tournament" className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                    Browse Tournaments
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </Link>
                            </div>
                        </div>

                        <div className="relative ms-4">
                            <img className="w-full rounded-md" src="https://images.unsplash.com/photo-1665686377065-08ba896d16fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=800&q=80" alt="Hero" />
                            <div className="absolute inset-0 -z-1 bg-linear-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                        Find the right plan for your team
                    </h2>
                    <p className="mt-1 text-gray-600 dark:text-neutral-400">
                        Pay as you go service, cancel anytime.
                    </p>
                </div>

                <div className="relative before:absolute before:inset-0 before:-z-1 before:bg-[radial-gradient(closest-side,var(--color-gray-300),transparent)] dark:before:bg-[radial-gradient(closest-side,var(--color-neutral-600),transparent)] mt-12">
                    <div className="grid max-w-4xl mx-auto gap-6 sm:grid-cols-2 items-stretch">

                        {/* Free Plan */}
                        <div className="rounded-2xl overflow-clip flex flex-col h-full text-center">
                            <div className="bg-white pt-8 pb-5 px-8 dark:bg-neutral-900">
                                <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
                                    Free
                                </h4>
                            </div>
                            <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-neutral-900">
                                <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-neutral-200">
                                    Free
                                </span>
                            </div>
                            <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-neutral-900">
                                <ul className="space-y-2.5 text-center text-sm">
                                    <li className="text-gray-800 dark:text-neutral-400">1 user</li>
                                    <li className="text-gray-800 dark:text-neutral-400">Plan features</li>
                                    <li className="text-gray-800 dark:text-neutral-400">Product support</li>
                                </ul>
                            </div>
                            <div className="bg-white py-8 px-8 dark:bg-neutral-900">
                                {
                                    localStorage.getItem("user") ? (
                                        <a
                                            className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500"
                                            href="#"
                                        >
                                            Subscribe
                                        </a>
                                    ) : (
                                        <a
                                            className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500"
                                            href="#"
                                        >
                                            Sign up
                                        </a>
                                    )
                                }
                            </div>
                        </div>

                        {/* Startup Plan */}
                        <div className="rounded-2xl overflow-clip flex flex-col h-full text-center">
                            <div className="bg-white pt-8 pb-5 px-8 dark:bg-neutral-900">
                                <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
                                    Startup
                                </h4>
                            </div>
                            <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-neutral-900">
                                <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-neutral-200">
                                    <span className="font-bold text-2xl -me-2">$</span>39
                                </span>
                            </div>
                            <div className="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-neutral-900">
                                <ul className="space-y-2.5 text-center text-sm">
                                    <li className="text-gray-800 dark:text-neutral-400">2 users</li>
                                    <li className="text-gray-800 dark:text-neutral-400">Plan features</li>
                                    <li className="text-gray-800 dark:text-neutral-400">Product support</li>
                                </ul>
                            </div>
                            <div className="bg-white py-8 px-8 dark:bg-neutral-900">
                                {
                                    localStorage.getItem("user") ? (
                                        <button
                                            onClick={handleKhaltiPayment}
                                            className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500"
                                        >
                                            Subscribe
                                        </button>
                                    ) : (
                                        <a
                                            className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500"
                                            href="#"
                                        >
                                            Sign up
                                        </a>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
