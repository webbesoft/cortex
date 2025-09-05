import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Brain } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 text-slate-900">
                {/* Header Navigation */}
                <header className="absolute top-0 w-full max-w-6xl pt-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-slate-900">Cortex</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <a
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
                                >
                                    Dashboard
                                </a>
                            ) : (
                                <>
                                    <a
                                        href="/login"
                                        className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                                    >
                                        Log in
                                    </a>
                                    <a
                                        href="/register"
                                        className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        Sign up
                                    </a>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
                    {/* Logo */}
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 shadow-2xl">
                        <Brain className="h-12 w-12 text-white" />
                    </div>

                    {/* Heading */}
                    <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                        Master anything with
                        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">spaced repetition</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mb-12 max-w-2xl text-lg text-slate-600 sm:text-xl">
                        Cortex uses scientifically-proven spaced repetition algorithms to help you learn faster and remember longer. Transform your
                        study sessions into powerful learning experiences.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        {auth.user ? (
                            <a
                                href="/dashboard"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-slate-800 hover:shadow-2xl"
                            >
                                Continue Learning
                            </a>
                        ) : (
                            <>
                                <a
                                    href="/register"
                                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-slate-800 hover:shadow-2xl"
                                >
                                    Start Grinding
                                </a>
                                <a
                                    href="/login"
                                    className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-lg transition-all duration-200 hover:scale-105 hover:border-slate-300 hover:bg-slate-50"
                                >
                                    Sign In
                                </a>
                            </>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
                        <div className="group flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200">
                                <Brain className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="mb-2 font-semibold text-slate-900">Smart Algorithm</h3>
                            <p className="text-sm text-slate-600">Adaptive spacing based on your performance and memory retention patterns</p>
                        </div>

                        <div className="group flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 transition-colors group-hover:bg-purple-200">
                                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 font-semibold text-slate-900">Track Progress</h3>
                            <p className="text-sm text-slate-600">Detailed analytics and insights into your learning journey and retention rates</p>
                        </div>

                        <div className="group flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-200">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 font-semibold text-slate-900">Learn Faster</h3>
                            <p className="text-sm text-slate-600">Optimize your study time and achieve better results in less time</p>
                        </div>
                    </div>
                </main>

                {/* Subtle Footer */}
                <footer className="absolute bottom-6 text-xs text-slate-400">Built for serious learners who want results</footer>
            </div>
        </>
    );
}
